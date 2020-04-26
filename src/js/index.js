// Global app controller
import Search from './models/Search';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import { elements, renderLoader, clearLoader, clearShopList } from './views/base';
import Recipe from './models/Recipe';


/**
 * Global state of the app
 * -Search object
 * -current recipe object
 * -shopping list object
 * -liked recipes
 */
let state = {} //object
window.state = state;
/**
 * Search Controller
 */
const controlSearch = async () => {
    // 1- Get the query from the form input...
    const query = searchView.getInput();


    if (query) { //means if there is an query.
        // 2- Create a new search object and add to state
        state.search = new Search(query);

        // 3- Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);

        try {
            // 4- Search for recipes;
            await state.search.getResults(); // get result function returns a promise.

            // 5- render results on UI but we want it to happen only if there is an actual result.
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('Something went wrong')
            clearLoader();
        }

    }
}


elements.searchForm.addEventListener('submit', event => {
    event.preventDefault(); // If we clicked normally the page reloads, we don't want it to happen.
    controlSearch();
});

elements.searchResPages.addEventListener('click', event => {
    const button = event.target.closest('.btn-inline');
    if (button) {
        const goToPage = button.dataset.goto;
        searchView.clearResults();
        searchView.renderResults(state.search.result, parseFloat(goToPage));
    }
});


/**
 * Recipe Controller
 */
const checkExist = (els, Liste)=>{
    
        Liste.likes.forEach(el=>{
            if (els.id === el.id){
                return true;
            }
        });
    return false;
}

const controlRecipe = async () => {
    state.likedItems = new Likes();
    state.likedItems.readStorage();
   

    likesView.clearLikedRecipe();
    state.likedItems.likes.forEach(el=>{
        likesView.renderLikedRecipe(el)
    })
    // if(!state.likedItems){
    //     state.likedItems = new Likes();
    //     state.likedItems.addValueFromLS();
    //     const getValueFromLS = JSON.parse(localStorage.getItem('likes'));
    //     getValueFromLS.forEach(el=> likesView.renderLikedRecipe(el))
    // } else {
    //     const getValueFromLS = JSON.parse(localStorage.getItem('likes'));
    //     getValueFromLS.forEach(els=>{
    //         if (!(els, state.likedItems)) {
    //             likesView.renderLikedRecipe(els)
    //         }
    //     })
    // }

    
    //get the ID from URL
    let id = window.location.hash;//id.hash
    id = id.replace('#', '');



    if (id) {
        // Prepare UI for changes clear middle frame body.
        renderLoader(elements.recipeRes);

        // Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id)
        };

        // Create a new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredient();
            clearLoader()

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServing();

            //clear recipe
            recipeView.clearRecipe();

            // Display the new recipe object
            recipeView.renderRecipe(state.recipe)

        } catch (error) {
            alert('Something went wrong!')
        }
    }

    if (state.likedItems && state.recipe) {
        likesView.toggleLikeButton(!state.likedItems.isLiked(state.recipe.id));
        likesView.highlightSelections(state.recipe.id);
    }




}

// window.addEventListener("hashchange", controlRecipe, false);
// window.addEventListener('load',controlRecipe);
['hashchange', 'load'].forEach((element) => { window.addEventListener(element, controlRecipe) })


/**
 * Shopping List Controller
 */

const controlShopList = () => {
    // Create a new list if there is no list.
    if (!state.list) {
        state.list = new List();
    }
    // Add Each ingredient to the list
    //clear shoplist
    clearShopList();
    state.recipe.ingredients.forEach(el => {
        //add item
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}
// Handle delete and update list item events
elements.shopList.addEventListener('click', event => {
    const id = event.target.closest('.shopping__item').dataset.itemid;
    // Handle delete event

    if (event.target.matches('.shopping__delete, .shopping__delete *')) {

        //delete from state
        state.list.deleteItem(id);

        //delete from UI
        listView.deleteItem(id);

        //Handle the count update
    } else if (event.target.matches('.shopping__count-value')) {
        const val = parseFloat(event.target.value, 10);
        if (val >= 0) {
            state.list.updateCount(id, val);
        }

    }


})


/**
 * Likes Controller Location of it of course is after recipe handles
 */

const controlLikeList = (cur) => {

    if (state.likedItems.isLiked(cur.id)) {
        likesView.toggleLikeButton(true);
        state.likedItems.deleteLike(cur.id)
    } else {
        likesView.toggleLikeButton(false);
        state.likedItems.addLike(cur.id, cur.title, cur.author, cur.img);
    }

    // GUI
    // clear inside of the like list and add all item inside of the likes array

    likesView.clearLikedRecipe();
    state.likedItems.likes.forEach(el => {
        likesView.renderLikedRecipe(el)
    })




}
// Handling recipe buttons click
elements.recipeRes.addEventListener('click', event => {
    if (event.target.matches('.btn-dec, .btn-dec *')) {//* means any child inside
        //Decreased button is clicked
        if (state.recipe.serving > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsAndIngredients(state.recipe);
        }
    } else if (event.target.matches('.btn-inc, .btn-inc *')) {
        // Increase
        state.recipe.updateServings('inc');
        recipeView.updateServingsAndIngredients(state.recipe);
    } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlShopList();
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        controlLikeList(state.recipe);
    }
});


