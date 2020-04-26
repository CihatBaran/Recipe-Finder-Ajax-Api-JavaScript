import {elements} from './base';



export const toggleLikeButton = (flag) =>{
    const iconString = !flag ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.header__likes use').setAttribute('href',`img/icons.svg#${iconString}`)
}


export const highlightSelections = (id)=>{
    document.querySelectorAll('.likes__link').forEach(el=>{
        el.classList.remove('likes__link--active');
    })
    const selectorLiked = document.querySelector(`li[class='${id}'] a`)
    if(selectorLiked) selectorLiked.classList.add('likes__link--active');
    
}

// like the recipes
export const renderLikedRecipe = (recipe)=>{
    const markup = ` 
        <li class="${recipe.id}">
            <a class="likes__link" href="#${recipe.id}">
                <figure class="likes__fig">
                    <img src="${recipe.img}" alt="${recipe.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${recipe.title}</h4>
                    <p class="likes__author">${recipe.author}</p>
                </div>
            </a>
        </li>`

    elements.likeList.insertAdjacentHTML('beforeend',markup);
}


export const clearLikedRecipe = ()=>{
    elements.likeList.innerHTML = "";
}

export const deleteLikedRecipe = (id)=>{
    document.querySelector(`#${id}`).parentNode.removeChild(document.querySelector(`#${id}`));
}