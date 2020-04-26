//Reussable documents

//we will put all dom elements right here;
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchResult: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipeRes: document.querySelector('.recipe'),
    shopList: document.querySelector('.shopping__list'),
    likeList: document.querySelector('.likes__list'),
}



export const elementStrings = {
    loader: 'loader',
}

export const clearShopList = ()=>{
    elements.shopList.innerHTML = ""
}

//Spinner
export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `//loader class has same animation css
    parent.insertAdjacentHTML('afterbegin', loader);
}


export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader){
        loader.parentNode.removeChild(loader);
    }
}

