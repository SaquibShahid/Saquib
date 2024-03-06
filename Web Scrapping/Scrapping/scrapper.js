const axios = require('axios');
const cheerio = require('cheerio');


axios.get('https://www.ndtv.com/entertainment#pfrom=home-ndtv_header-globalnav')
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        console.log($('title').text());
        const recipeElements = $('.featured_cont');

        const recipes = recipeElements.map((index, element) => {
            return {
                title: $(element).find('.recipe-title').text(),
                ingredients: $(element).find('.ingredients').text(),
                instructions: $(element).find('.instructions').text(),
            };
        }).get();

        console.log(recipes);
    });