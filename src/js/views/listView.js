import { elements } from './base';

const fixItemUnit = (unitItem)=>{
    if(unitItem === ""){
        return 'ea'
    } else {
        return unitItem;
    }
}

export const renderItem = item => {
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${fixItemUnit(item.unit)}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopList.insertAdjacentHTML('beforeend',markup);
}

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid='${id}']`);
    if (item) item.parentNode.removeChild(item);
    
}