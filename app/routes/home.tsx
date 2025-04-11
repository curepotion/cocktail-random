import type { Route } from "./+types/home";
import * as React from "react";

// Define the Cocktail interface
interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  strCategory: string;
  strInstructions: string;
  [key: string]: string | null; // For dynamic ingredient properties
}

// Simple translation functions that just return the original text
function translateTerm(term: string): string {
  return term;
}

function translateText(text: string): string {
  return text;
}

function translateSentence(text: string): string {
  return text;
}

function translateIngredient(ingredient: string, measure: string | null): string {
  return measure ? `${measure} ${ingredient}` : ingredient;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cocktail Generator" },
    { name: "description", content: "Discover delicious cocktail recipes" },
  ];
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Clear search term when category is selected
    setSearchTerm('');
    
    // Immediately trigger search with the selected category
    const searchEvent = new CustomEvent('cocktailSearch', { 
      detail: { 
        searchTerm: '',
        categories: [category]
      }
    });
    document.dispatchEvent(searchEvent);
  };
  
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    
    // Clear category selection when search is used
    if (selectedCategory) {
      setSelectedCategory(null);
    }
  };
  
  const handleSearch = () => {
    // Clear category selection when search is used
    setSelectedCategory(null);
    
    // Trigger search with term only
    const searchEvent = new CustomEvent('cocktailSearch', { 
      detail: { 
        searchTerm: searchTerm.trim(),
        categories: []
      }
    });
    document.dispatchEvent(searchEvent);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
      />
      <CocktailGenerator />
      <Footer />
    </div>
  );
}

function Header({ 
  selectedCategory, 
  onCategoryChange,
  searchTerm,
  onSearchTermChange,
  onSearch
}: { 
  selectedCategory: string | null, 
  onCategoryChange: (category: string) => void,
  searchTerm: string,
  onSearchTermChange: (term: string) => void,
  onSearch: () => void
}) {
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

function CocktailGenerator() {
  const [cocktails, setCocktails] = React.useState<Cocktail[]>([]);
  const [flippedCards, setFlippedCards] = React.useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(false);

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

  // Check if screen is mobile or tablet size
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 576); // Smaller threshold for true mobile
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Load initial random cocktails when component mounts
  React.useEffect(() => {
    console.log("Initial component mount - loading random cocktails");
    generateRandomCocktails();
  }, []);

  React.useEffect(() => {
    // Listen for search events from the header
    const handleSearch = (event: CustomEvent) => {
      const term = event.detail?.searchTerm;
      const categories = event.detail?.categories || [];
      
      setCocktails([]);
      setIsLoading(true);
      
      if (categories.length > 0) {
        fetchAllCocktailsByCategory(categories[0]);
      } else if (term) {
        searchAllCocktails(term);
      } else {
        generateRandomCocktails();
      }
    };
    
    // Add event listeners
    document.addEventListener('cocktailSearch', handleSearch as EventListener);
    
    return () => {
      // Remove event listeners
      document.removeEventListener('cocktailSearch', handleSearch as EventListener);
    };
  }, []);
  
  // Function to fetch ALL cocktails from a single category at once
  const fetchAllCocktailsByCategory = async (category: string) => {
    try {
      console.log(`Fetching drinks for category: ${category}`);
      setIsLoading(true);
      setCocktails([]); // Clear existing cocktails
      
      // Get all drinks from the selected category
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.drinks) {
        console.log('No drinks data returned from API');
        setIsLoading(false);
        return;
      }
      
      console.log(`Found ${data.drinks.length} drinks in category ${category}`);
      
      // No limit on number of drinks to fetch
      let loadedDrinks: Cocktail[] = [];
      
      // Load all drinks
      for (let i = 0; i < data.drinks.length; i++) {
        try {
          const drink = data.drinks[i];
          const detailUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`;
          console.log(`Fetching details for drink: ${drink.idDrink}`);
          
          const detailResponse = await fetch(detailUrl);
          
          if (!detailResponse.ok) {
            console.error(`Failed to fetch details for drink ${drink.idDrink}`);
            continue;
          }
          
          const detailData = await detailResponse.json();
          
          if (detailData.drinks && detailData.drinks[0]) {
            loadedDrinks.push(detailData.drinks[0]);
            
            // Sort by name alphabetically before updating state
            const sortedDrinks = [...loadedDrinks].sort((a, b) => 
              a.strDrink.localeCompare(b.strDrink)
            );
            
            // Update state after each drink to show progress
            setCocktails(sortedDrinks);
          }
        } catch (drinkError) {
          console.error(`Error processing drink at index ${i}:`, drinkError);
          // Continue with next drink
        }
      }
      
      console.log(`Successfully loaded ${loadedDrinks.length} drinks`);
    } catch (error) {
      console.error('Error fetching cocktails by category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (isLoading) return;
    setFlippedCards({});
    setIsButtonClicked(true);
    setCocktails([]);
    generateRandomCocktails();
    setTimeout(() => setIsButtonClicked(false), 800);
  };

  const generateRandomCocktails = async () => {
    try {
      setIsLoading(true);
      setCocktails([]);
      
      // No fixed limit - generate a large number of random cocktails
      const totalDrinks = 100; // Significantly increased for essentially no limit
      let loadedDrinks: Cocktail[] = [];
      
      for (let i = 0; i < totalDrinks; i++) {
        try {
          const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
          
          if (!response.ok) {
            console.error(`Failed to fetch random drink (attempt ${i+1})`);
            continue;
          }
          
          const data = await response.json();
          
          if (data.drinks && data.drinks[0]) {
            // Check for duplicates to avoid showing the same cocktail twice
            const isDuplicate = loadedDrinks.some(drink => drink.idDrink === data.drinks[0].idDrink);
            
            if (!isDuplicate) {
              loadedDrinks.push(data.drinks[0]);
              
              // Sort by name alphabetically
              const sortedDrinks = [...loadedDrinks].sort((a, b) => 
                a.strDrink.localeCompare(b.strDrink)
              );
              
              // Update state after each drink to show progress
              setCocktails(sortedDrinks);
            }
          }
        } catch (drinkError) {
          console.error(`Error fetching random drink (attempt ${i+1}):`, drinkError);
          // Continue with next attempt
        }
      }
      
      console.log(`Successfully loaded ${loadedDrinks.length} random drinks`);
    } catch (error) {
      console.error('Error generating random cocktails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchAllCocktails = async (term: string) => {
    try {
      console.log(`Searching for term: ${term}`);
      setIsLoading(true);
      setCocktails([]);
      
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(term)}`);
      
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.drinks && data.drinks.length > 0) {
        console.log(`Found ${data.drinks.length} drinks for search term "${term}"`);
        
        // Sort search results alphabetically by name
        const sortedDrinks = [...data.drinks].sort((a, b) => 
          a.strDrink.localeCompare(b.strDrink)
        );
        
        setCocktails(sortedDrinks);
      } else {
        console.log(`No drinks found for search term "${term}"`);
      }
    } catch (error) {
      console.error('Error searching cocktails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIngredients = (cocktail: Cocktail) => {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      
      if (ingredient) {
        ingredients.push(translateIngredient(ingredient, measure));
      }
    }
    return ingredients.join('，');
  };

  const toggleCardFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <main className="w-full px-4 py-8">
      {cocktails.length === 0 && isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-[#c6a964]">Loading cocktails...</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cocktails.map((cocktail, index) => {
            const cardId = cocktail.idDrink || `card-${index}`;
            const isFlipped = flippedCards[cardId] || false;
            
            return (
              <div 
                key={cardId} 
                className={`flip-card-container cursor-pointer hover:scale-105 transition-transform ${isFlipped && !isMobileOrTablet ? 'col-span-1' : isFlipped ? 'col-span-2' : 'col-span-1'}`}
                onClick={() => toggleCardFlip(cardId)}
                style={{ perspective: '1000px' }}
              >
                <div 
                  className={`flip-card-inner relative w-full transition-transform duration-700 ${isFlipped ? '' : 'aspect-square'}`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Card Front */}
                  <div 
                    className="flip-card-front absolute w-full h-full bg-[#121212] border border-[#9e8a55]/20 transition-colors"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="aspect-square w-full relative">
                      <img 
                        src={cocktail.strDrinkThumb} 
                        alt={cocktail.strDrink} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pb-5">
                        <h4 className="text-lg font-semibold text-[#e9d3a3] truncate">{cocktail.strDrink}</h4>
                        <p className="text-[#9e8a55] text-[18px] truncate">
                          {translateText(cocktail.strAlcoholic)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Back */}
                  <div 
                    className="flip-card-back bg-[#121212] border border-[#9e8a55]/20 w-full p-6"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      position: isFlipped ? 'relative' : 'absolute',
                      height: isFlipped ? 'auto' : '100%'
                    }}
                  >
                    <div className="flex justify-between items-center mb-4 border-b border-[#9e8a55] pb-2">
                      <h5 className="text-xl font-bold text-[#e9d3a3] break-words">{cocktail.strDrink}</h5>
                    </div>
                    <p className="mb-3 text-[18px] font-medium text-[#c6a964]">Category:
                      <span className="text-[#9e8a55]">
                        {translateText(cocktail.strCategory)}
                      </span>
                    </p>
                    <p className="mb-3 text-[18px] font-medium text-[#c6a964]">Type:
                      <span className="text-[#9e8a55]">
                        {translateText(cocktail.strAlcoholic)}
                      </span>
                    </p>
                    <p className="mb-2 text-[18px] font-medium text-[#c6a964]">Ingredients:</p>
                    <p className="mb-4 text-[18px] text-[#9e8a55] break-words">{getIngredients(cocktail)}</p>
                    <p className="mb-2 text-[18px] font-medium text-[#c6a964]">Instructions:</p>
                    <p className="text-[18px] text-[#9e8a55] break-words">
                      {translateText(cocktail.strInstructions)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {isLoading && cocktails.length > 0 && (
        <div className="flex justify-center items-center py-8 mt-4">
          <div className="text-xl text-[#c6a964]">Loading more cocktails...</div>
        </div>
      )}
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#9e8a55]/20 py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold bg-gradient-to-r from-[#c6a964] to-[#e9d3a3] bg-clip-text text-transparent mb-2">
              Cocktail Generator
            </div>
            <p className="text-[#9e8a55] text-sm">© {new Date().getFullYear()} Discover delicious cocktail recipes</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div>
              <h4 className="font-medium mb-2 text-[#c6a964]">聯絡我們</h4>
              <p className="text-[#9e8a55] text-sm">info@cocktailgen.com</p>
              <p className="text-[#9e8a55] text-sm">+886 123 456 789</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-[#c6a964]">關注我們</h4>
              <div className="flex gap-4">
                <a href="#" className="text-[#9e8a55] hover:text-[#c6a964]">FB</a>
                <a href="#" className="text-[#9e8a55] hover:text-[#c6a964]">IG</a>
                <a href="#" className="text-[#9e8a55] hover:text-[#c6a964]">TW</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
