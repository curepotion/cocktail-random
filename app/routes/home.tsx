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

// Dictionary approach for translations
// Comprehensive dictionary for reliable translations
const translationDictionary: Record<string, string> = {
  // Alcoholic types
  "Alcoholic": "含酒精",
  "Non alcoholic": "不含酒精",
  "Non-Alcoholic": "不含酒精",
  "Optional alcohol": "可選酒精",
  
  // Categories
  "Ordinary Drink": "普通飲料",
  "Cocktail": "雞尾酒",
  "Shake": "奶昔",
  "Other/Unknown": "其他/未知",
  "Cocoa": "可可飲料",
  "Shot": "烈酒",
  "Coffee / Tea": "咖啡/茶",
  "Homemade Liqueur": "自製利口酒",
  "Punch / Party Drink": "賓治/派對飲料",
  "Beer": "啤酒",
  "Soft Drink": "軟飲料",
  
  // Common ingredients
  "Vodka": "伏特加",
  "Gin": "琴酒",
  "Rum": "朗姆酒",
  "Dark rum": "黑朗姆酒",
  "Light rum": "淺色朗姆酒",
  "White rum": "白朗姆酒",
  "Tequila": "龍舌蘭酒",
  "Whiskey": "威士忌",
  "Whisky": "威士忌",
  "Bourbon": "波本威士忌",
  "Scotch": "蘇格蘭威士忌",
  "Irish whiskey": "愛爾蘭威士忌",
  "Orange": "橙子",
  "Lemon": "檸檬",
  "Lime": "青檸",
  "Lime juice": "青檸汁",
  "Lemon juice": "檸檬汁",
  "Orange juice": "橙汁",
  "Pineapple juice": "鳳梨汁",
  "Cranberry juice": "蔓越莓汁",
  "Apple juice": "蘋果汁",
  "Grapefruit juice": "葡萄柚汁",
  "Tomato juice": "番茄汁",
  "Soda": "蘇打水",
  "Soda water": "蘇打水",
  "Club soda": "蘇打水",
  "Water": "水",
  "Sugar": "糖",
  "Sugar syrup": "糖漿",
  "Simple syrup": "簡易糖漿",
  "Syrup": "糖漿",
  "Brown sugar": "紅糖",
  "Salt": "鹽",
  "Ice": "冰塊",
  "Crushed ice": "碎冰",
  "Mint": "薄荷",
  "Mint leaves": "薄荷葉",
  
  // Liqueurs and spirits
  "Brandy": "白蘭地",
  "Cognac": "干邑",
  "Kahlua": "卡魯哇",
  "Coffee liqueur": "咖啡力嬌酒",
  "Chocolate liqueur": "巧克力力嬌酒",
  "TripleSecLiqueur": "橙皮酒",
  "CointreauOrangeLiqueur": "君度香橙酒",
  "Amaretto": "杏仁利口酒",
  "Vermouth": "味美思酒",
  "Sweet Vermouth": "甜味美思酒",
  "Dry Vermouth": "幹味美思酒",
  "Grenadine": "石榴糖漿",
  "Bitters": "苦精",
  "Angostura bitters": "安格斯特拉苦精",
  "Champagne": "香檳",
  "Prosecco": "普羅賽克",
  "Wine": "葡萄酒",
  "Red wine": "紅酒",
  "White wine": "白葡萄酒",
  "Ginger": "生薑",
  "Ginger ale": "薑汁汽水",
  "Ginger beer": "薑啤",
  "Cinnamon": "肉桂",
  "Nutmeg": "肉豆蔻",
  "Honey": "蜂蜜",
  "Egg": "雞蛋",
  "Egg white": "蛋白",
  "Egg yolk": "蛋黃",
  "Cream": "奶油",
  "Heavy cream": "濃奶油",
  "Milk": "牛奶",
  "Coconut milk": "椰奶",
  "Sour mix": "酸味調和液",
  "Lemon peel": "檸檬皮",
  "Orange peel": "橙皮",
  "Lime peel": "青檸皮",
  "Cherry": "櫻桃",
  "Maraschino cherry": "馬拉希諾櫻桃",
  "Olive": "橄欖",
  "Cucumber": "黃瓜",
  "Strawberry": "草莓",
  "Pineapple": "鳳梨",
  "Banana": "香蕉",
  "Apple": "蘋果",
  "Peach": "桃子",
  "Lemonade": "檸檬水",
  "Cola": "可樂",
  "Sprite": "雪碧",
  "7-Up": "七喜",
  "Tonic water": "通寧水",
  
  // Measures
  "oz": "盎司",
  "shot": "份",
  "shots": "份",
  "cl": "厘升",
  "ml": "毫升",
  "dash": "少許",
  "dashes": "少許",
  "splash": "少量",
  "cup": "杯",
  "cups": "杯",
  "slice": "片",
  "slices": "片",
  "sprig": "枝",
  "sprigs": "枝",
  "tbsp": "湯匙",
  "tsp": "茶匙",
  "teaspoon": "茶匙",
  "tablespoon": "湯匙",
  "part": "份",
  "parts": "份",
  "pinch": "少許",
  "fill up": "填滿",
  "top up": "注滿",
  "to fill": "填滿",
  "to taste": "按口味",
  "to top": "注滿",
  
  // Instructions phrases and patterns
  "Shake": "搖勻",
  "Stir_action": "攪拌",
  "Pour": "倒入",
  "Mix": "混合",
  "Blend": "混合攪拌",
  "Add": "加入",
  "Garnish": "裝飾",
  "Serve": "上菜",
  "with ice": "加冰",
  "over ice": "冰上",
  "chilled": "冷藏",
  "glass": "杯",
  "highball glass": "高球杯",
  "cocktail glass": "雞尾酒杯",
  "old-fashioned glass": "古典杯",
  "collins glass": "柯林杯",
  "shot glass": "烈酒杯",
  "martini glass": "馬丁尼杯",
  "margarita glass": "瑪格麗塔杯",
  "wine glass": "酒杯",
  "ingredients": "材料",
  "Build": "調製",
  "Muddle": "搗碎",
  "Strain": "過濾",
  "Shake well": "充分搖勻",
  "Stir gently": "輕輕攪拌",
  "Double strain": "雙重過濾",
  "Rim": "杯緣",
  "Top with": "頂部加入",
  "Fill": "填滿",
  "Chill": "冷藏",
  "Combine": "結合",
  "Crush": "壓碎",
  "Blend until smooth": "攪拌至順滑",
  "Shake with ice": "加冰搖勻",
  "Stir with ice": "加冰攪拌",
  "Pour all ingredients": "倒入所有材料",
  "Mix all ingredients": "混合所有材料",
  "Combine all ingredients": "結合所有材料",
  "Shake all ingredients": "搖勻所有材料",
  "Stir all ingredients": "攪拌所有材料",
  "Blend all ingredients": "全部材料一起混合攪拌",
  "Pour into": "倒入",
  "Strain into": "過濾入",
  "Serve in": "裝在",
  "Garnish with": "裝飾以",
  "and garnish": "並裝飾",
  "and serve": "並上菜",
  "and stir": "並攪拌",
  "and strain": "並過濾",
  "then add": "然後加入",
  "then garnish": "然後裝飾",
  "with a slice of": "用一片",
  "with a wedge of": "用一角",
  "Fill glass with ice": "杯中加滿冰塊",
  "Pour ingredients into shaker": "將材料倒入雪克杯",
  
  // Common instruction sentences
  "Shake with ice and strain into a cocktail glass.": "加冰搖勻後過濾入雞尾酒杯。",
  "Pour all ingredients into a cocktail shaker with ice.": "將所有材料倒入裝有冰塊的雪克杯中。",
  "Shake well and strain into a chilled cocktail glass.": "充分搖勻後過濾入冰鎮雞尾酒杯中。",
  "Stir gently and strain into a cocktail glass.": "輕輕攪拌後過濾入雞尾酒杯。",
  "Build all ingredients in a highball glass filled with ice.": "在裝滿冰塊的高球杯中依序加入所有材料。",
  "Shake with ice, strain into a cocktail glass, and serve.": "加冰搖勻，過濾入雞尾酒杯中，即可上菜。",
  "Combine all ingredients with ice and shake well.": "將所有材料與冰塊一起充分搖勻。",
  "Mix all ingredients together and serve over ice.": "混合所有材料並倒在冰塊上飲用。",
  "Fill glass with ice and pour ingredients over it.": "杯中裝滿冰塊並在其上倒入所有材料。",
  "Muddle ingredients in the bottom of the glass.": "在杯底搗碎材料。",
  "Rim the glass with salt or sugar.": "在杯口沾上鹽或糖。",
  "Garnish with a slice of lime.": "用一片青檸裝飾。",
  "Garnish with a cherry and orange slice.": "用櫻桃和橙片裝飾。",
  "Top with soda water.": "頂部加入蘇打水。",
  "Best served cold.": "最好冰鎮後飲用。",
  "Serve with a straw.": "用吸管飲用。"
};

// Function to translate a single term or word
function translateTerm(term: string): string {
  // Just return the term as is, no translation
  return term;
}

// Function to translate text by breaking it into parts and translating each part
function translateText(text: string): string {
  // Just return the text as is, no translation
  return text;
}

// Function to translate a single sentence
function translateSentence(text: string): string {
  // Just return the sentence as is, no translation
  return text;
}

// Function specifically for translating ingredients
function translateIngredient(ingredient: string, measure: string | null): string {
  // Format with measure if available
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
