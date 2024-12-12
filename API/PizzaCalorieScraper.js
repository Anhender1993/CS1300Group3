const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePizzaCalories() {
    const url = 'https://www.calories.info/food/pizza';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const pizzaData = [];
    
    $('.food-table tr').each((index, element) => {
        // Skip header row
        if (index === 0) return;
        
        const cols = $(element).find('td');
        if (cols.length >= 2) {
            pizzaData.push({
                pizzaType: $(cols[0]).text().trim(),
                calories: $(cols[1]).text().trim()
            });
        }
    });
    
    return pizzaData;
}

// Usage
scrapePizzaCalories()
    .then(data => console.table(data))
    .catch(error => console.error('Error:', error));
