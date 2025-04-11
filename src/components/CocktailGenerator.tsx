import React from 'react';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  strCategory: string;
  strInstructions: string;
  [key: string]: string | null;
}

export function CocktailGenerator() {
  const [cocktails, setCocktails] = React.useState<Cocktail[]>([]);
  const [flippedCards, setFlippedCards] = React.useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(false);

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
        ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
      }
    }
    return ingredients.join(', ');
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
                          {cocktail.strAlcoholic}
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
                      <span className="text-[#9e8a55]"> {cocktail.strCategory}</span>
                    </p>
                    <p className="mb-3 text-[18px] font-medium text-[#c6a964]">Type:
                      <span className="text-[#9e8a55]"> {cocktail.strAlcoholic}</span>
                    </p>
                    <p className="mb-2 text-[18px] font-medium text-[#c6a964]">Ingredients:</p>
                    <p className="mb-4 text-[18px] text-[#9e8a55] break-words">{getIngredients(cocktail)}</p>
                    <p className="mb-2 text-[18px] font-medium text-[#c6a964]">Instructions:</p>
                    <p className="text-[18px] text-[#9e8a55] break-words">
                      {cocktail.strInstructions}
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