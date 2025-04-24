
// we are writing the below logic for adding all ingredients which are in the menu of a restaurant in an local array so we can use it later

export const categorizeIngredients = (ingredients) => {
    return ingredients.reduce((acc,ingredient)=>{
        const {category} = ingredient // we are destructuring the category from the ingredient object
        if(!acc[category.name]){ // if the key is not present in category 
            acc[category.name]=[]; // we are creating a new key with an empty array as its value
        }
        acc[category.name].push(ingredient); // we are pushing the ingredient in the array of the category
        return acc;
    },{})
};