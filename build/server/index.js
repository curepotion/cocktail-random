import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { createElement } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx("div", {
        "data-basename": "/cocktail-random",
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function translateText(text) {
  return text;
}
function translateIngredient(ingredient, measure) {
  return measure ? `${measure} ${ingredient}` : ingredient;
}
function meta({}) {
  return [{
    title: "Cocktail Generator"
  }, {
    name: "description",
    content: "Discover delicious cocktail recipes"
  }];
}
const home = withComponentProps(function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
    const searchEvent = new CustomEvent("cocktailSearch", {
      detail: {
        searchTerm: "",
        categories: [category]
      }
    });
    document.dispatchEvent(searchEvent);
  };
  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    if (selectedCategory) {
      setSelectedCategory(null);
    }
  };
  const handleSearch = () => {
    setSelectedCategory(null);
    const searchEvent = new CustomEvent("cocktailSearch", {
      detail: {
        searchTerm: searchTerm.trim(),
        categories: []
      }
    });
    document.dispatchEvent(searchEvent);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-black text-white",
    children: [/* @__PURE__ */ jsx(Header, {
      selectedCategory,
      onCategoryChange: handleCategoryChange,
      searchTerm,
      onSearchTermChange: handleSearchTermChange,
      onSearch: handleSearch
    }), /* @__PURE__ */ jsx(CocktailGenerator, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
function Header({
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchTermChange,
  onSearch
}) {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const categories = ["Ordinary Drink", "Cocktail", "Shake", "Cocoa", "Shot", "Coffee / Tea", "Homemade Liqueur", "Punch / Party Drink", "Beer", "Soft Drink"];
  const handleSearchInputChange = (e) => {
    onSearchTermChange(e.target.value);
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      onSearch();
    }
  };
  const handleSearchButtonClick = () => {
    if (searchTerm.trim()) {
      onSearch();
    }
    if (showMobileMenu) {
      setShowMobileMenu(false);
    }
  };
  return /* @__PURE__ */ jsxs("header", {
    className: "w-full bg-[#0a0a0a] border-b border-[#9e8a55]/20",
    children: [/* @__PURE__ */ jsx("div", {
      className: "w-full px-6 py-4",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between w-full",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-xl font-bold bg-gradient-to-r from-[#c6a964] to-[#e9d3a3] bg-clip-text text-transparent",
          children: "Cocktail Generator"
        }), /* @__PURE__ */ jsx("div", {
          className: "hidden lg:flex relative flex-1 max-w-md mx-4",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex w-full bg-[#1a1a1a] border border-[#9e8a55]/30 rounded overflow-hidden",
            children: [/* @__PURE__ */ jsx("input", {
              type: "text",
              placeholder: "Search cocktails...",
              className: "bg-transparent flex-1 text-white placeholder-[#9e8a55]/70 focus:outline-none px-4 py-2",
              value: searchTerm,
              onChange: handleSearchInputChange,
              onKeyDown: handleSearchKeyDown
            }), /* @__PURE__ */ jsx("button", {
              className: "w-[50px] h-10 flex items-center justify-center bg-[#9e8a55] hover:bg-[#c6a964] text-black transition-colors",
              onClick: handleSearchButtonClick,
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-5 w-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                })
              })
            })]
          })
        }), /* @__PURE__ */ jsx("button", {
          className: "lg:hidden ml-2 p-2 text-[#9e8a55] hover:text-[#c6a964]",
          onClick: () => setShowMobileMenu(!showMobileMenu),
          children: /* @__PURE__ */ jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-6 w-6",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M4 6h16M4 12h16M4 18h16"
            })
          })
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "hidden lg:block w-full bg-[#0a0a0a] mt-4 border-t border-[#9e8a55]/20",
      children: /* @__PURE__ */ jsx("div", {
        className: "w-full overflow-x-auto py-3 px-4",
        children: /* @__PURE__ */ jsx("ul", {
          className: "flex space-x-2 min-w-max",
          children: categories.map((category) => /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx("button", {
              onClick: () => onCategoryChange(category),
              className: `
                    px-6 py-2 rounded-full whitespace-nowrap transition-all duration-200
                    ${selectedCategory === category ? "bg-[#9e8a55] text-black font-medium" : "text-[#9e8a55] hover:bg-[#9e8a55]/20 hover:text-[#c6a964]"}
                    focus:outline-none focus:ring-2 focus:ring-[#9e8a55] focus:ring-opacity-50
                  `,
              children: category
            })
          }, category))
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "lg:hidden w-full bg-[#0a0a0a] py-3 px-6 border-t border-[#9e8a55]/20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex w-full bg-[#1a1a1a] border border-[#9e8a55]/30 rounded overflow-hidden",
        children: [/* @__PURE__ */ jsx("input", {
          type: "text",
          placeholder: "Search cocktails...",
          className: "bg-transparent flex-1 text-white placeholder-[#9e8a55]/70 focus:outline-none px-4 py-2",
          value: searchTerm,
          onChange: handleSearchInputChange,
          onKeyDown: handleSearchKeyDown
        }), /* @__PURE__ */ jsx("button", {
          className: "w-[50px] h-10 flex items-center justify-center bg-[#9e8a55] hover:bg-[#c6a964] text-black transition-colors",
          onClick: handleSearchButtonClick,
          children: /* @__PURE__ */ jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-5 w-5",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            })
          })
        })]
      })
    }), showMobileMenu && /* @__PURE__ */ jsxs("div", {
      className: "lg:hidden fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-[#9e8a55]/20 z-50 transform translate-x-0 transition-transform duration-300 ease-in-out",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex justify-between items-center p-4 border-b border-[#9e8a55]/20",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-lg font-bold bg-gradient-to-r from-[#c6a964] to-[#e9d3a3] bg-clip-text text-transparent",
          children: "Categories"
        }), /* @__PURE__ */ jsx("button", {
          className: "p-2 text-[#9e8a55] hover:text-[#c6a964]",
          onClick: () => setShowMobileMenu(false),
          children: /* @__PURE__ */ jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-6 w-6",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M6 18L18 6M6 6l12 12"
            })
          })
        })]
      }), /* @__PURE__ */ jsx("ul", {
        className: "flex flex-col py-2",
        children: categories.map((category) => /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx("button", {
            onClick: () => {
              onCategoryChange(category);
              setShowMobileMenu(false);
            },
            className: `
                    w-full text-left px-6 py-3 transition-all duration-200
                    ${selectedCategory === category ? "bg-[#9e8a55]/20 text-[#c6a964] font-medium" : "text-[#9e8a55] hover:bg-[#1f1f1f] hover:text-[#c6a964]"}
                  `,
            children: category
          })
        }, category))
      })]
    }), showMobileMenu && /* @__PURE__ */ jsx("div", {
      className: "lg:hidden fixed inset-0 bg-black/60 z-40",
      onClick: () => setShowMobileMenu(false)
    })]
  });
}
function CocktailGenerator() {
  const [cocktails, setCocktails] = React.useState([]);
  const [flippedCards, setFlippedCards] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(false);
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 576);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  React.useEffect(() => {
    console.log("Initial component mount - loading random cocktails");
    generateRandomCocktails();
  }, []);
  React.useEffect(() => {
    const handleSearch = (event) => {
      var _a, _b;
      const term = (_a = event.detail) == null ? void 0 : _a.searchTerm;
      const categories2 = ((_b = event.detail) == null ? void 0 : _b.categories) || [];
      setCocktails([]);
      setIsLoading(true);
      if (categories2.length > 0) {
        fetchAllCocktailsByCategory(categories2[0]);
      } else if (term) {
        searchAllCocktails(term);
      } else {
        generateRandomCocktails();
      }
    };
    document.addEventListener("cocktailSearch", handleSearch);
    return () => {
      document.removeEventListener("cocktailSearch", handleSearch);
    };
  }, []);
  const fetchAllCocktailsByCategory = async (category) => {
    try {
      console.log(`Fetching drinks for category: ${category}`);
      setIsLoading(true);
      setCocktails([]);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`);
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.drinks) {
        console.log("No drinks data returned from API");
        setIsLoading(false);
        return;
      }
      console.log(`Found ${data.drinks.length} drinks in category ${category}`);
      let loadedDrinks = [];
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
            const sortedDrinks = [...loadedDrinks].sort((a, b) => a.strDrink.localeCompare(b.strDrink));
            setCocktails(sortedDrinks);
          }
        } catch (drinkError) {
          console.error(`Error processing drink at index ${i}:`, drinkError);
        }
      }
      console.log(`Successfully loaded ${loadedDrinks.length} drinks`);
    } catch (error) {
      console.error("Error fetching cocktails by category:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const generateRandomCocktails = async () => {
    try {
      setIsLoading(true);
      setCocktails([]);
      const totalDrinks = 100;
      let loadedDrinks = [];
      for (let i = 0; i < totalDrinks; i++) {
        try {
          const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
          if (!response.ok) {
            console.error(`Failed to fetch random drink (attempt ${i + 1})`);
            continue;
          }
          const data = await response.json();
          if (data.drinks && data.drinks[0]) {
            const isDuplicate = loadedDrinks.some((drink) => drink.idDrink === data.drinks[0].idDrink);
            if (!isDuplicate) {
              loadedDrinks.push(data.drinks[0]);
              const sortedDrinks = [...loadedDrinks].sort((a, b) => a.strDrink.localeCompare(b.strDrink));
              setCocktails(sortedDrinks);
            }
          }
        } catch (drinkError) {
          console.error(`Error fetching random drink (attempt ${i + 1}):`, drinkError);
        }
      }
      console.log(`Successfully loaded ${loadedDrinks.length} random drinks`);
    } catch (error) {
      console.error("Error generating random cocktails:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const searchAllCocktails = async (term) => {
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
        const sortedDrinks = [...data.drinks].sort((a, b) => a.strDrink.localeCompare(b.strDrink));
        setCocktails(sortedDrinks);
      } else {
        console.log(`No drinks found for search term "${term}"`);
      }
    } catch (error) {
      console.error("Error searching cocktails:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getIngredients = (cocktail) => {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(translateIngredient(ingredient, measure));
      }
    }
    return ingredients.join("，");
  };
  const toggleCardFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  return /* @__PURE__ */ jsxs("main", {
    className: "w-full px-4 py-8",
    children: [cocktails.length === 0 && isLoading ? /* @__PURE__ */ jsx("div", {
      className: "flex justify-center items-center h-64",
      children: /* @__PURE__ */ jsx("div", {
        className: "text-xl text-[#c6a964]",
        children: "Loading cocktails..."
      })
    }) : /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-2 md:grid-cols-5 gap-4",
      children: cocktails.map((cocktail, index) => {
        const cardId = cocktail.idDrink || `card-${index}`;
        const isFlipped = flippedCards[cardId] || false;
        return /* @__PURE__ */ jsx("div", {
          className: `flip-card-container cursor-pointer hover:scale-105 transition-transform ${isFlipped && !isMobileOrTablet ? "col-span-1" : isFlipped ? "col-span-2" : "col-span-1"}`,
          onClick: () => toggleCardFlip(cardId),
          style: {
            perspective: "1000px"
          },
          children: /* @__PURE__ */ jsxs("div", {
            className: `flip-card-inner relative w-full transition-transform duration-700 ${isFlipped ? "" : "aspect-square"}`,
            style: {
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            },
            children: [/* @__PURE__ */ jsx("div", {
              className: "flip-card-front absolute w-full h-full bg-[#121212] border border-[#9e8a55]/20 transition-colors",
              style: {
                backfaceVisibility: "hidden"
              },
              children: /* @__PURE__ */ jsxs("div", {
                className: "aspect-square w-full relative",
                children: [/* @__PURE__ */ jsx("img", {
                  src: cocktail.strDrinkThumb,
                  alt: cocktail.strDrink,
                  className: "w-full h-full object-cover"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pb-5",
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "text-lg font-semibold text-[#e9d3a3] truncate",
                    children: cocktail.strDrink
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#9e8a55] text-[18px] truncate",
                    children: translateText(cocktail.strAlcoholic)
                  })]
                })]
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "flip-card-back bg-[#121212] border border-[#9e8a55]/20 w-full p-6",
              style: {
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                position: isFlipped ? "relative" : "absolute",
                height: isFlipped ? "auto" : "100%"
              },
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex justify-between items-center mb-4 border-b border-[#9e8a55] pb-2",
                children: /* @__PURE__ */ jsx("h5", {
                  className: "text-xl font-bold text-[#e9d3a3] break-words",
                  children: cocktail.strDrink
                })
              }), /* @__PURE__ */ jsxs("p", {
                className: "mb-3 text-[18px] font-medium text-[#c6a964]",
                children: ["Category:", /* @__PURE__ */ jsx("span", {
                  className: "text-[#9e8a55]",
                  children: translateText(cocktail.strCategory)
                })]
              }), /* @__PURE__ */ jsxs("p", {
                className: "mb-3 text-[18px] font-medium text-[#c6a964]",
                children: ["Type:", /* @__PURE__ */ jsx("span", {
                  className: "text-[#9e8a55]",
                  children: translateText(cocktail.strAlcoholic)
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "mb-2 text-[18px] font-medium text-[#c6a964]",
                children: "Ingredients:"
              }), /* @__PURE__ */ jsx("p", {
                className: "mb-4 text-[18px] text-[#9e8a55] break-words",
                children: getIngredients(cocktail)
              }), /* @__PURE__ */ jsx("p", {
                className: "mb-2 text-[18px] font-medium text-[#c6a964]",
                children: "Instructions:"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[18px] text-[#9e8a55] break-words",
                children: translateText(cocktail.strInstructions)
              })]
            })]
          })
        }, cardId);
      })
    }), isLoading && cocktails.length > 0 && /* @__PURE__ */ jsx("div", {
      className: "flex justify-center items-center py-8 mt-4",
      children: /* @__PURE__ */ jsx("div", {
        className: "text-xl text-[#c6a964]",
        children: "Loading more cocktails..."
      })
    })]
  });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", {
    className: "bg-[#0a0a0a] border-t border-[#9e8a55]/20 py-6 px-4",
    children: /* @__PURE__ */ jsx("div", {
      className: "container mx-auto",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col md:flex-row justify-between items-center",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mb-4 md:mb-0",
          children: [/* @__PURE__ */ jsx("div", {
            className: "text-xl font-bold bg-gradient-to-r from-[#c6a964] to-[#e9d3a3] bg-clip-text text-transparent mb-2",
            children: "Cocktail Generator"
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-[#9e8a55] text-sm",
            children: ["© ", (/* @__PURE__ */ new Date()).getFullYear(), " Discover delicious cocktail recipes"]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col md:flex-row gap-4 md:gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h4", {
              className: "font-medium mb-2 text-[#c6a964]",
              children: "聯絡我們"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-[#9e8a55] text-sm",
              children: "info@cocktailgen.com"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-[#9e8a55] text-sm",
              children: "+886 123 456 789"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h4", {
              className: "font-medium mb-2 text-[#c6a964]",
              children: "關注我們"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex gap-4",
              children: [/* @__PURE__ */ jsx("a", {
                href: "#",
                className: "text-[#9e8a55] hover:text-[#c6a964]",
                children: "FB"
              }), /* @__PURE__ */ jsx("a", {
                href: "#",
                className: "text-[#9e8a55] hover:text-[#c6a964]",
                children: "IG"
              }), /* @__PURE__ */ jsx("a", {
                href: "#",
                className: "text-[#9e8a55] hover:text-[#c6a964]",
                children: "TW"
              })]
            })]
          })]
        })]
      })
    })
  });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/cocktail-random/assets/entry.client-CrHes0rY.js", "imports": ["/cocktail-random/assets/chunk-KNED5TY2-BWNdqSdz.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/cocktail-random/assets/root-uKkS1zL3.js", "imports": ["/cocktail-random/assets/chunk-KNED5TY2-BWNdqSdz.js", "/cocktail-random/assets/with-props-D3AO8slx.js"], "css": ["/cocktail-random/assets/root-aQZFn8st.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/cocktail-random/assets/home-CjvjbW4k.js", "imports": ["/cocktail-random/assets/with-props-D3AO8slx.js", "/cocktail-random/assets/chunk-KNED5TY2-BWNdqSdz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/cocktail-random/assets/manifest-668df577.js", "version": "668df577", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/cocktail-random/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
