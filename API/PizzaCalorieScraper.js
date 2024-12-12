const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePepperoniPizza() {
  const url = 'https://www.calorieking.com/us/en/foods/f/calories-in-pizzas-14-pizza-pepperoni-topping-regular-crust/iOA85RvsRi6Ssskhq_DrrA';
  
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const nutritionData = {
      name: $('.food-title').text().trim(),
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
    console.error('Error scraping data:', error);
    throw error;
  }
}

module.exports = scrapePepperoniPizza;
