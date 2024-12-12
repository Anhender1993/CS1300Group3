const axios = require('axios');
const cheerio = require('cheerio');

const FOOD_URLS = {
  cheese: 'https://www.calorieking.com/us/en/foods/f/calories-in-pizzas-14-pizza-cheese-topping-original-crust/OCrypuBtRY-n8kv7QpHpcw',
  pepperoni: 'https://www.calorieking.com/us/en/foods/f/calories-in-pizzas-14-pizza-pepperoni-topping-regular-crust/iOA85RvsRi6Ssskhq_DrrA',
  veggie: 'https://www.calorieking.com/us/en/foods/f/calories-in-pizzas-pacific-veggie-handmade-pan-crust-pizza/1h39l3ikRfKJFPl_VIrLFw',
  spaghetti: 'https://www.calorieking.com/us/en/foods/f/calories-in-italian-spaghetti-meatballs-with-tomato-sauce-regular/3fIqeI8zRUOkcLLbuRtNzw'
};

async function scrapeFood(type, url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const foodNames = {
      cheese: 'Cheese Pizza',
      pepperoni: 'Pepperoni Pizza',
      veggie: 'Veggie Pizza',
      spaghetti: 'Code Spaghetti'
    };

    const nutritionData = {
      name: foodNames[type],
      servingSize: $('.serving-size').text().trim(),
      calories: $('.calories').text().trim(),
      nutrients: {}
    };

    $('.nutrient-row').each((i, element) => {
      const nutrientName = $(element).find('.nutrient-name').text().trim();
      const nutrientValue = $(element).find('.nutrient-value').text().trim();
      nutritionData.nutrients[nutrientName] = nutrientValue;
    });

    return nutritionData;
  } catch (error) {
    console.error(`Error scraping ${type} food data:`, error);
    throw error;
  }
}

async function scrapeAllFoods() {
  const foodData = {};
  
  for (const [type, url] of Object.entries(FOOD_URLS)) {
    foodData[type] = await scrapeFood(type, url);
  }
  
  return foodData;
}

module.exports = {
  scrapeAllFoods,
  scrapeFood
};
