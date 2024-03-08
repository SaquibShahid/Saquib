require('./models/mongo.db');
const categoryModel = require('./models/category.db')
const platformModel = require('./models/platform.db')


const updatePlatforms = async () => {
    try {
        const categories = await categoryModel.find({}).select({ __v: 0 });
        let map = {};
        let categoryNames = [];
        for (const category of categories) {
            map[category.categoryName] = category._id;
            categoryNames.push(category.categoryName);
        }

        for(let i=0 ; i<categoryNames.length ; i++){
            await platformModel.updateMany(
                {'category.name' : categoryNames[i]},
                {$set : {[`category.$[c].categoryId`] : map[categoryNames[i]]}},
                {arrayFilters: [{"c.name" : categoryNames[i]}]}
            )
        }
    } catch (e) {
        console.log(e.message);
    }
}

updatePlatforms();