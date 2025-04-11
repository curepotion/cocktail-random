import React from 'react';

interface HeaderProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
}

export function Header({ 
  selectedCategory, 
  onCategoryChange,
  searchTerm,
  onSearchTermChange,
  onSearch
}: HeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  
  // List of available categories from the API
  const categories = [
    "Ordinary Drink",
    "Cocktail",
    "Shake",
    "Cocoa",
    "Shot",
    "Coffee / Tea",
    "Homemade Liqueur",
    "Punch / Party Drink",
    "Beer",
    "Soft Drink"
  ];
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };
  
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      onSearch();
    }
  };
  
  const handleSearchButtonClick = () => {
    if (searchTerm.trim()) {
      onSearch();
    }
    
    // Close mobile menu if open
    if (showMobileMenu) {
      setShowMobileMenu(false);
    }
  };
  
  return (
    <header className="w-full bg-[#0a0a0a] border-b border-[#9e8a55]/20">
      {/* Main Navigation Bar - FULL WIDTH */}
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="text-xl font-bold bg-gradient-to-r from-[#c6a964] to-[#e9d3a3] bg-clip-text text-transparent">
            Cocktail Generator
          </div>
          
          {/* Desktop Search Bar (hidden on mobile/tablet) */}
          <div className="hidden lg:flex relative flex-1 max-w-md mx-4">
            <div className="flex w-full bg-[#1a1a1a] border border-[#9e8a55]/30 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search cocktails..."
                className="bg-transparent flex-1 text-white placeholder-[#9e8a55]/70 focus:outline-none px-4 py-2"
                value={searchTerm}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchKeyDown}
              />
              <button 
                className="w-[50px] h-10 flex items-center justify-center bg-[#9e8a55] hover:bg-[#c6a964] text-black transition-colors"
                onClick={handleSearchButtonClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden ml-2 p-2 text-[#9e8a55] hover:text-[#c6a964]"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Category Navigation - Desktop - FULL WIDTH - Hidden on mobile/tablet */}
      <div className="hidden lg:block w-full bg-[#0a0a0a] mt-4 border-t border-[#9e8a55]/20">
        <div className="w-full overflow-x-auto py-3 px-4">
          <ul className="flex space-x-2 min-w-max">
            {categories.map(category => (
              <li key={category}>
                <button
                  onClick={() => onCategoryChange(category)}
                  className={`
                    px-6 py-2 rounded-full whitespace-nowrap transition-all duration-200
                    ${selectedCategory === category 
                      ? 'bg-[#9e8a55] text-black font-medium'
                      : 'text-[#9e8a55] hover:bg-[#9e8a55]/20 hover:text-[#c6a964]'
                    }
                    focus:outline-none focus:ring-2 focus:ring-[#9e8a55] focus:ring-opacity-50
                  `}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Mobile Search Bar - Full Width - Visible on mobile/tablet */}
      <div className="lg:hidden w-full bg-[#0a0a0a] py-3 px-6 border-t border-[#9e8a55]/20">
        <div className="flex w-full bg-[#1a1a1a] border border-[#9e8a55]/30 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search cocktails..."
            className="bg-transparent flex-1 text-white placeholder-[#9e8a55]/70 focus:outline-none px-4 py-2"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchKeyDown}
          />
          <button 
            className="w-[50px] h-10 flex items-center justify-center bg-[#9e8a55] hover:bg-[#c6a964] text-black transition-colors"
            onClick={handleSearchButtonClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Side Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-[#9e8a55]/20 z-50 transform translate-x-0 transition-transform duration-300 ease-in-out">
          {/* Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-[#9e8a55]/20">
            <div className="text-lg font-bold bg-gradient-to-r from-[#c6a964] to-[#e9d3a3] bg-clip-text text-transparent">
              Categories
            </div>
            <button 
              className="p-2 text-[#9e8a55] hover:text-[#c6a964]"
              onClick={() => setShowMobileMenu(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Category List */}
          <ul className="flex flex-col py-2">
            {categories.map(category => (
              <li key={category}>
                <button
                  onClick={() => {
                    onCategoryChange(category);
                    setShowMobileMenu(false);
                  }}
                  className={`
                    w-full text-left px-6 py-3 transition-all duration-200
                    ${selectedCategory === category 
                      ? 'bg-[#9e8a55]/20 text-[#c6a964] font-medium'
                      : 'text-[#9e8a55] hover:bg-[#1f1f1f] hover:text-[#c6a964]'
                    }
                  `}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Overlay when mobile menu is open */}
      {showMobileMenu && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </header>
  );
} 