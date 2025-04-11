import React from 'react'
import { Header } from '../components/Header'
import { CocktailGenerator } from '../components/CocktailGenerator'
import { Footer } from '../components/Footer'
import type { Route } from "./+types/home";

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
    setSearchTerm('');
    
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
    if (selectedCategory) {
      setSelectedCategory(null);
    }
  };
  
  const handleSearch = () => {
    setSelectedCategory(null);
    
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
