import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

        } catch (error) {
            console.log(error);
            alert('Something went wrong!')
        }
    }

    calcTime() {
        //Assuming we have 15 minutes to cook 3 ingredients
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng / 3);
        this.time = period * 12;
    }

    calcServing() {
        this.serving = 4;
    }

    parseIngredient() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsps', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
        const units = [...unitsShort, 'kg', 'g']


        const newIngredients = this.ingredients.map(el => {
            // 1-Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => { // current element, index
                ingredient = ingredient.replace(unit, unitsShort[i])
            });

            // 2-Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3-Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(curEl => units.includes(curEl));

            let objIng;
            if (unitIndex > -1) {
                // there is a unit
                const arrCount = arrIng.slice(0, unitIndex); // Ex. 4 1/2 cups arrCount =[4,1/2]
                //Ex 4 cups => arrCount = [4]
                let count;
                if (arrCount === 1) {
                    count = eval(arrCount[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    count: count.toFixed(1),
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }


            } else if (parseInt(arrIng[0], 10)) {//basically if it cannot be returned
                //to the int then it will return false
                // there is a unit but not in the unit array
                objIng = {
                    count: parseInt(arrIng[0], 10).toFixed(1),
                    unit: '',
                    ingredient: arrIng.slice(1, arrIng.length).join(' '),
                }

            } else if (unitIndex === -1) {
                // there is no unit and NO number in 1th position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient,
                }
            }


            return objIng;
        });
        this.ingredients = newIngredients;

    }

    updateServings(type) {
        // Update Servings
        const newServing = type === 'dec' ? this.serving - 1 : this.serving + 1;

        
        
        // Update Ingredients
        this.ingredients.forEach( ing=>{
            ing.count = (ing.count * (newServing / this.serving)).toFixed(1);
        })

        this.serving  = newServing;
    }
}

