// ########################  ADD TO BASKET ############################

/** Adds an item to the basket
 * @param {string} array original array
 * @param {number} index original array-index
*/
function addToBasket(array, index) {    
    array[3][index] += 1;
    if(array[3][index] == 1) {                          // array is Burgers/Fries/Salads
        newToBasket(array, index)
    } else {
        changeCounterAndPrice(array, index);
    }
    setBasket();
    render();
}


/**When the item is not already in the basket, this function adds it by pushing to the basket array. */
function newToBasket(originalArray, originalIndex) {
        Basket[0].push(originalArray[0][originalIndex]);        // name
        Basket[1].push(originalArray[2][originalIndex]);        // price
        Basket[2].push(originalArray[3][originalIndex]);        // counter
        Basket[3][0].push(originalArray[2][originalIndex]);     // save original price (for accurate calculation)
        Basket[3][1].push(originalIndex);                       // save the original index of menu
}


/**If that item is already in the basket, here we change the counter and the menu price in the basket item. */ 
function changeCounterAndPrice(originalArray, originalIndex) {
    let menu = originalArray[0][originalIndex];                 //name of menu

        for (let i = 0; i < Basket[0].length; i++) {
            if (Basket[0][i] == menu) {                         // basket menu NAME == menu name (searching for the menu name which is already in the basket)
                Basket[1][i] += Basket[3][0][i];                // new PRICE = old price + original price
                Basket[2][i] = originalArray[3][originalIndex]; // basket COUNTER = menu counter
            }
        }
}


// ########################  LOWER/REMOVE BASKET ITEM ############################
/**This function lowers the count and price of that item or delets it completely from the basket. */
function lowerBasket(index) {
    // these two are to GET and CHANGE the "count" in the content section (in the original menu)
    // originalPrice = Basket[3][0][index];
    // originalIndex = Basket[3][1][index];

    if (Basket[2][index] > 1) {
        lowerTheAmount(index, Basket[3][0][index]);
        setBasket();
        render();
    } else {   // when the basket counter is already at "1" and we click on "lower"
        removeFromBasket(index, Basket[3][1][index], Basket[3][0][index]);
        setBasket();
        render();
    }
}


/**Lowers the counter of the basket-item.
 * @param {number} basket_Index basket index to get the basket item
 * @param {number} original_price that the original item price for accurate calculating (lowering the basket-item price)
 */
function lowerTheAmount(basket_Index, original_price) {
    Basket[2][basket_Index] -= 1;                                // change COUNT of basket menu
    Basket[1][basket_Index] -= original_price;       // change basket PRICE -> new PRICE = old price - original price
}


function removeFromBasket(basket_Index)  {
    Basket[2][basket_Index] -= 1;
    connectBasketANDContent_onlyOnce();
    Basket[0].splice(basket_Index, 1);
    Basket[1].splice(basket_Index, 1);
    Basket[2].splice(basket_Index, 1);
    Basket[3][0].splice(basket_Index, 1);
    Basket[3][1].splice(basket_Index, 1);
    Basket[4].splice(basket_Index, 1);
}



// ########################  ADD MORE OF BASKET ITEM ############################
/**Highers the counter and price of that item. */
function higherBasket(index) {
    addMore(index)
    setBasket();
    render();
}


/**Changes the count of that basket_item (+1) and adds the original-item price to that basket-item price (for accurate calculation) */
function addMore(basket_index) {
    let originalPrice = Basket[3][0][basket_index];
    Basket[2][basket_index] += 1;                     
    Basket[1][basket_index] += originalPrice;          
}


// ######################## COMMENT (IN THE BASKET) ############################
/**Check if this basket-item has an comment or not. */
function commentAvailable(basket_index) {
    let basket = document.getElementById(`fullBasketMenuContainer${basket_index}`);
    let resp_basket = document.getElementById(`fullBasketMenuContainer_resp${basket_index}`);
    if (Basket[4][basket_index]) {
        basket.innerHTML += returnPreContainerWithComment(basket_index);
        resp_basket.innerHTML += returnPreContainerWithComment_resp(basket_index);
    } else {
        basket.innerHTML += returnPreContainerWithoutComment(basket_index);
        resp_basket.innerHTML += returnPreContainerWithoutComment_resp(basket_index);
    }
}


function returnPreContainerWithComment(basket_index) { //
    return `
        <div class="fullBasketMenuTitle fullBasketMenuMiddle flex">
            <a id="commentPre_change(${basket_index})" class="fullBasketMenuNote" href="javascript:commentChange(${basket_index});changeCommentState_change(${basket_index})">Anmerkung bearbeiten</a>
            <a id="commentAfter_change(${basket_index})" class="fullBasketMenuNote displayNone" href="javascript:renderFullBasket()">Anmerkung bearbeiten</a> 
            <div class="minusANDplus flex">
                <img class="minusBasket round-corner" src="img/minus.PNG" onclick="lowerBasket(${basket_index})">
                <img class="plusBasket round-corner" src="img/plus.PNG" onclick="higherBasket(${basket_index})">
                <div class="countDigiBasket">${Basket[2][basket_index]}</div>
            </div>
        </div>
        <div id="savedComment${basket_index}" class="comment"><em>${Basket[4][basket_index]}</em></div>`;
}


function returnPreContainerWithComment_resp(basket_index) { //
    return `
        <div class="fullBasketMenuTitle fullBasketMenuMiddle flex">
            <a id="commentPre_change_resp(${basket_index})" class="fullBasketMenuNote" href="javascript:commentChange(${basket_index});changeCommentState_change(${basket_index})">Anmerkung bearbeiten</a>
            <a id="commentAfter_change_resp(${basket_index})" class="fullBasketMenuNote displayNone" href="javascript:renderFullBasket()">Anmerkung bearbeiten</a> 
            <div class="minusANDplus flex">
                <img class="minusBasket round-corner" src="img/minus.PNG" onclick="lowerBasket(${basket_index})">
                <img class="plusBasket round-corner" src="img/plus.PNG" onclick="higherBasket(${basket_index})">
                <div class="countDigiBasket resp_basketCounter">${Basket[2][basket_index]}</div>
            </div>
        </div>
        <div id="savedComment_resp${basket_index}" class="comment"><em>${Basket[4][basket_index]}</em></div>`;
}


function returnPreContainerWithoutComment(basket_index) {
    return `
        <div class="fullBasketMenuTitle fullBasketMenuMiddle flex">
            <a id="commentPre_push(${basket_index})" class="fullBasketMenuNote" href="javascript:commentNew(${basket_index});changeCommentState_push(${basket_index})">Anmerkung hinzufügen</a>
            <a id="commentAfter_push(${basket_index})" class="fullBasketMenuNote displayNone" href="javascript:renderFullBasket()">Anmerkung hinzufügen</a> 
            <div class="minusANDplus flex">
                <img class="minusBasket round-corner" src="img/minus.PNG" onclick="lowerBasket(${basket_index})">
                <img class="plusBasket round-corner" src="img/plus.PNG" onclick="higherBasket(${basket_index})">
                <div class="countDigiBasket">${Basket[2][basket_index]}</div>
            </div>
        </div>`;
}


function returnPreContainerWithoutComment_resp(basket_index) {
    return `
        <div class="fullBasketMenuTitle fullBasketMenuMiddle flex">
            <a id="commentPre_push_resp(${basket_index})" class="fullBasketMenuNote" href="javascript:commentNew(${basket_index});changeCommentState_push(${basket_index})">Anmerkung hinzufügen</a>
            <a id="commentAfter_push_resp(${basket_index})" class="fullBasketMenuNote displayNone" href="javascript:renderFullBasket()">Anmerkung hinzufügen</a> 
            <div class="minusANDplus flex">
                <img class="minusBasket round-corner" src="img/minus.PNG" onclick="lowerBasket(${basket_index})">
                <img class="plusBasket round-corner" src="img/plus.PNG" onclick="higherBasket(${basket_index})">
                <div class="countDigiBasket resp_basketCounter">${Basket[2][basket_index]}</div>
            </div>
        </div>`;
}


/**Change the function state when clicking on "Anmerkung hinzufügen". Preventing from adding more comment sections */
function changeCommentState_push(basket_index) {
    document.getElementById(`commentPre_push(${basket_index})`).classList.add('displayNone');
    document.getElementById(`commentAfter_push(${basket_index})`).classList.remove('displayNone');
    document.getElementById(`commentPre_push_resp(${basket_index})`).classList.add('displayNone');
    document.getElementById(`commentAfter_push_resp(${basket_index})`).classList.remove('displayNone');
    
}


/**Change the function state when clicking on "Anmerkung bearbeiten". Preventing from adding more comment (alter) sections */
function changeCommentState_change(basket_index) {
    document.getElementById(`commentPre_change(${basket_index})`).classList.add('displayNone');
    document.getElementById(`commentAfter_change(${basket_index})`).classList.remove('displayNone');
    document.getElementById(`commentPre_change_resp(${basket_index})`).classList.add('displayNone');
    document.getElementById(`commentAfter_change_resp(${basket_index})`).classList.remove('displayNone');
}


/** Laod comment section,  if there is no comment saved for that menu/item*/ 
function commentNew(basket_index) {
    let basket = document.getElementById(`fullBasketMenuContainer${basket_index}`);
    let resp_basket = document.getElementById(`fullBasketMenuContainer_resp${basket_index}`);
    basket.innerHTML += returnCommentSection_noComment(basket_index);
    resp_basket.innerHTML += returnCommentSection_noComment_resp(basket_index);
}


/**For normal view, to show item section with comment section (if NO comment is saved for this menu).
 * @param {number} index basket index
*/
function returnCommentSection_noComment(index) {
    return `<div class="fullBasketCommentContainer flex">
                <span id="comment${index}" class="fullBasketCommentSection" role="textbox" contenteditable></span>
                <div class="fullBasketCommentSectionButtons flex">
                    <a href="javascript:renderFullBasket()">Abbrechen</a>
                    <a href="javascript:saveBasketComment(${index})">Hinzufügen</a>
                </div>
            </div>`;
}


/**For responsive view, to show item section with comment section (if NO comment is saved for this menu). 
 * @param {number} index basket index
*/
function returnCommentSection_noComment_resp(index) {
    return `<div class="fullBasketCommentContainer flex">
                <span id="comment_resp${index}" class="fullBasketCommentSection" role="textbox" contenteditable></span>
                <div class="fullBasketCommentSectionButtons flex">
                    <a href="javascript:renderFullBasket()">Abbrechen</a>
                    <a href="javascript:saveBasketComment_resp(${index})">Hinzufügen</a>
                </div>
            </div>`;
}


/**Load comment section, if there is a comment saved for that menu/item */ 
function commentChange(basket_index) {
    document.getElementById(`savedComment${basket_index}`).classList.add('displayNone');
    document.getElementById(`savedComment_resp${basket_index}`).classList.add('displayNone');
    let basket = document.getElementById(`fullBasketMenuContainer${basket_index}`);
    let resp_basket = document.getElementById(`fullBasketMenuContainer_resp${basket_index}`);
    basket.innerHTML += returnCommentSection_commentAvailable(basket_index);
    resp_basket.innerHTML += returnCommentSection_commentAvailable_resp(basket_index);
}


/**For normal view, to show item section with comment section (if comment is already available) 
 * @param {number} index basket index
*/
function returnCommentSection_commentAvailable(index) {
    return `
    <div class="fullBasketCommentContainer flex">
        <span id="comment${index}" class="fullBasketCommentSection" role="textbox" contenteditable>${Basket[4][index]}</span>
        <div class="fullBasketCommentSectionButtons flex">
            <a href="javascript:deleteBasketComment(${index})">Löschen</a>
            <a href="javascript:saveBasketComment(${index})">Speichern</a>
        </div>
    </div>`;
}


/**For resonsive view, to show item section with comment section (if comment is already available) 
 * @param {number} index basket index
*/
function returnCommentSection_commentAvailable_resp(index) {
    return `
    <div class="fullBasketCommentContainer flex">
        <span id="comment_resp${index}" class="fullBasketCommentSection" role="textbox" contenteditable>${Basket[4][index]}</span>
        <div class="fullBasketCommentSectionButtons flex">
            <a href="javascript:deleteBasketComment(${index})">Löschen</a>
            <a href="javascript:saveBasketComment_resp(${index})">Speichern</a>
        </div>
    </div>`;
}


function saveBasketComment(basket_index) {
    let comment = document.getElementById(`comment${basket_index}`);
    Basket[4][basket_index] = comment.innerText;
    setBasket();
    renderFullBasket();
}


function saveBasketComment_resp(basket_index) {
    let comment_resp = document.getElementById(`comment_resp${basket_index}`);
    Basket[4][basket_index] = comment_resp.innerText;
    setBasket();
    renderFullBasket();
}


function deleteBasketComment(basket_index) {
    Basket[4][basket_index] =  '';
    setBasket();
    renderFullBasket();
}