/**Checks if there are some data in localstorage already. If not, it defines the normal basket structure given in content.js. */
function checkForSavedBasket() {
    getBasket();
    if ( !(Basket) ) {
        Basket = [basket_menu, basket_price, basket_counter, original, basket_comment];    
    } else {
        connectBasketANDContent_onlyOnce();
    }
}


/**This function is for syncing the counters of the basket item with the exact item from page content. Here we are finding the basket-item index and the content-item index in the 
 * ALLMENU array. We compare the basket-item-name with the content-item-name found in the array "ALLMENUS". Thats the way we find both indexes. 
 * b: The basket-item index
 * i: The content-item-type index
 * m: The content-item index
 */
function connectBasketANDContent_onlyOnce() {
    for (let b = 0; b < Basket[0].length; b++) {
        for (let i = 0; i < ALLMENUS.length; i++) {
            for (let m = 0; m < ALLMENUS[i][0].length; m++) {
                if (Basket[0][b] == ALLMENUS[i][0][m]) { // names equal?
                    makeCountsEqual(b,i,m);
                    break;
                    break;
                }
            }
        }
    }
}

/**With the indexes given, we sync the counters of the basket menu with the content menu.
 * @param {number} basket_index: The basket-item index
 * @param {number} original_category_index The content-item-type index
 * @param {number} original_menu_index The content-item index
 */
function makeCountsEqual(basket_index, original_category_index, original_menu_index) {
    for (let i = 0; i < Basket[0].length; i++) {
        ALLMENUS[original_category_index][3][original_menu_index] = Basket[2][basket_index];
    }
}


function setBasket() {
    let Basket_AsText = JSON.stringify(Basket);
    localStorage.setItem('Basket', Basket_AsText);
}


function getBasket() {
    let Basket_AsText = localStorage.getItem('Basket');
    Basket = JSON.parse(Basket_AsText);
}


function setLike() {
    let heart_AsText = JSON.stringify(heart);
    localStorage.setItem('heart', heart_AsText);
}


function getLike() {
    let heart_AsText = localStorage.getItem('heart');
    heart = JSON.parse(heart_AsText);
}

