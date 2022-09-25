function render() {
    connectBasketANDContent_onlyOnce();
    renderBasket();
    renderRestaurantTemplate();
    renderLovedMenu();
    renderBurger();
    renderFries();
    renderSalad();
    renderSearchbar();
    
}


function renderSearchbar() {
    let container = document.getElementById('searchBar');
    container.innerHTML = '';
    container.innerHTML += returnSearchbar();
}


function returnSearchbar() {
    return `<div class="searchBarMenus flex">
                <a id="searchIcon" href="javascript:renderSearchbarEdit()"><img class="searchIcon" src="img/searchIcon.PNG"></a>
                <a id="select0" href="#lovedMenusSection">Beliebte Gerichte</a>
                <a id="select1" href="#burgerSection">Burger</a>
                <a id="select2" href="#friesSection">Pommes</a>
                <a id="select3" href="#saladSection">Salate</a>
            </div>`;
}


/**Renders a searchbar for some input from the user.  */
function renderSearchbarEdit() {
    let container = document.getElementById('searchBar');
    container.innerHTML = '';
    container.innerHTML = returnSearchEdit();
}


function returnSearchEdit() {
    return `<div class="searchBar_input">
                <div class="searchEdit flex" id="searchEdit">
                    <img class="searchIcon_input" src="img/searchIconWhite.PNG" onclick="endSearch()">
                    <input class="searchInput" id="searchInput" type="text" placeholder="Suche nach Gerichten, usw..." onkeydown="filterMenus()" autofocus>
                    <div class="searchCross" onclick="endSearch();hideFilteredMenus()">x</div>
                    <div class="showFilteredMenus displayNone flex" id="showFilteredMenus"></div>
                </div>
            </div>`;
}


function endSearch() {
    renderSearchbar();
}


/**Function to search for menus in the seachbar */
function filterMenus() {
    hideFilteredMenus();
    let input = document.getElementById('searchInput').value;
    input = input.toLowerCase();
    let showMenus = document.getElementById('showFilteredMenus');
    showMenus.innerHTML = '';
    if_SearchMenusHasEntries();
    filterMenus_searchingForEqualEtriesInAllMenus(input);
    set_SearchResults(showMenus);
    showFilteredMenus();
}


/**Description: This function looks for an equality between the input valu (string) and the menus (in ALLMENUS array)
 *
 * @param {string} getInput Get the search input from the user 
 * @param {string} getField Get the field, where to show the entries that were found
 */
function filterMenus_searchingForEqualEtriesInAllMenus(getInput) {
    for (let i = 0; i < ALLMENUS.length; i++) {
        for (let j = 0; j < ALLMENUS[i][0].length; j++) {

            let menu = ALLMENUS[i][0][j].toLowerCase();
            if(menu.includes(getInput)) {
                SearchMenus.push(ALLMENUS[i][0][j]);
            }
        }
    }
}


/**
 * If there are any menus saved (in the SearchMenus Array) from previous searchings, the entries will be "deleted" with splice(0, arr.lenght)
 * before pushing new entries
 */
function if_SearchMenusHasEntries() {
    if(SearchMenus.length > 0) {
        SearchMenus.splice(0, SearchMenus.length);
    }
}


/**The passed searchings will be written as anchor tags in the "showFilteredMenus" div */
function set_SearchResults(getField) {
    for (let i = 0; i < SearchMenus.length; i++) {
        getField.innerHTML += `<a class="showedMenus" href="#${SearchMenus[i]}">${SearchMenus[i]}</a>`
    }
}


/**show the "showFilteredMenus" div with ..classList.remove.('displayNone') */
function showFilteredMenus() {
    document.getElementById('showFilteredMenus').classList.remove('displayNone');
}


/**hide the "showFilteredMenus" div with ..classList.add('displayNone') */
function hideFilteredMenus() {
    document.getElementById('showFilteredMenus').classList.add('displayNone');
}

// ################# LIKED THAT RESTAURANT ################# =>

function checkForLike() {
    getLike();
    if (heart == null || heart == 0) {
        heart = 0;
    } else {
        showLike();
    }
}


function like() {
    heart = 1;
    setLike();
    showLike();
}


function unlike() {
    heart = 0;
    setLike();
    hideLike();
}


function showLike() {
    document.getElementById('unliked').classList.add('displayNone');
    document.getElementById('liked').classList.remove('displayNone');
}


function hideLike() {
    document.getElementById('unliked').classList.remove('displayNone');
    document.getElementById('liked').classList.add('displayNone');
}
// <= ################# LIKED THAT RESTAURANT #################



function renderBasket() {
    if(BasketEmpty()) {
        renderEmptyBasket();
    } else renderFullBasket();
}


function BasketEmpty() {
    if(Basket[0].length == 0) {
        return true;
    }
    else return false;
}

// ################# RENDER EMPTY BASKET ################# =>

function renderEmptyBasket() {
    renderBottomBasket();  
    let sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';
    sidebar.innerHTML = returnSidebarSticky_empty();

    renderResponsiveBasket_open_empty(); // responsive..
    let resp_basket = document.getElementById('resp_basketMenuSection');
    resp_basket.innerHTML = returnResponsiveBasket_empty();
}


/**Thats the sticky basket div (when the basket is empty), where all menus are loaded inside.  */
function returnSidebarSticky_empty() {
    return `<div class="sidebar2 flex">
                <div class="basketTitle darkblue flex"><p>Warenkorb</p></div>
                <div class="emptyBasket flex">
                    <img class="emptyBasketImage" src="img/basketIconBig.PNG">
                    <p class="emptyBasketText1 darkblue">Fülle deinen Warenkorb</p>
                    <p class="emptyBasketText2 middlegray">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
                </div>
            </div>`;
}


/**Thats the sticky basket div in responsive view (when the basket is empty), where all menus are loaded inside.  */
function returnResponsiveBasket_empty() {
    return `
                <div class="emptyBasket_resp flex">
                    <img class="emptyBasketImage" src="img/basketIconBig.PNG">
                    <p class="resp_emptyBasketText1 darkblue">Fülle deinen Warenkorb</p>
                    <p class="resp_emptyBasketText2 middlegray">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
                    <div class="resp_emptyBasketButton flex centering" onclick="closePopUpBasket()">Füge Artikel hinzu</div>
                </div>`;
}

// ################# RENDER BASKET WITH ITEMs ################# =>

function renderFullBasket() {
    let sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';
    sidebar.innerHTML = returnSidebarSticky();
    renderBottomBasket();                       // responsive
    renderResponsiveBasket_open_full(); 

    let sidebar2 = document.getElementById('sidebar2');
    sidebar2.innerHTML += `<div id="fullBasketCalculationContainer" class="fullBasketCalculationContainer flex"></div>`;
    renderBasketCalculation(returnBasketPrice());
    renderBasketItems();
    amountToLow();
}


function renderBasketItems() {
    let basket = document.getElementById('fullBasketMenusContainer');
    // basket.innerHTML = '';
    let resp_basket = document.getElementById('resp_BasketItem'); // responsive
    
    for (let i = 0; i < Basket[0].length; i++) {
        price = Basket[1][i].toFixed(2);
        basket.innerHTML += returnBasketItemContent(price, i);
        resp_basket.innerHTML += returnBasketItemContent_resp(price, i);
        commentAvailable(i);
    }
}


/**Thats the div of an menu in the basket. 
 * @param {number} price price of that menu
 * @param {number} i thats the index of that menu in the basket
*/
function returnBasketItemContent(price, index) {
    return `<div class="fullBasketMenuContainer flex" id="fullBasketMenuContainer${index}">
                <div class="fullBasketMenuTitle flex">
                    <p><strong>${Basket[0][index]}</strong></p>
                    <p>${price.toString().replace('.',',')} €</p>
                </div>
            </div>`;
}


/**Thats the div of an menu in the basket, in responsive view. 
 * @param {number} price price of that menu
 * @param {number} i thats the index of that menu in the basket
*/
function returnBasketItemContent_resp(price, index) {
    return `
                <div class="fullBasketMenuContainer_resp flex" id="fullBasketMenuContainer_resp${index}">
                    <div class="fullBasketMenuTitle flex">
                        <p><strong>${Basket[0][index]}</strong></p>
                        <p>${price.toString().replace('.',',')} €</p>
                    </div>
                </div>
            `;
}


/**Thats the sticky basket div, where all menus are loaded inside. */
function returnSidebarSticky() {
    return `<div id="sidebar2" class="sidebar2 flex">
                <div class="basketTitle darkblue flex"><p>Warenkorb</p></div>
                <div id="fullBasketMenusContainer" class="fullBasketMenusContainer flex"></div>
            </div>`;
}


// ################# BASKET AMOUNT INFO ################# =>
/**It checks if the total amount in the basket is to low. The amount has to be > 15€ */
function amountToLow() {
    if (returnBasketPrice() < 15.00) { // Mindesbestellwert
        let basket = document.getElementById('fullBasketMenusContainer');
        let resp_basket = document.getElementById('resp_BasketItem');

        basket.innerHTML += returnOrderInfo();
        resp_basket.innerHTML += returnOrderInfo();
        showPayNowNotInSidebar();
        showInfoInRespBasketBottom();
    } else {
        showPayNowInSidebar();
    }
}


/**Show a gray "Amount to low" button in the basket, when the amount is to low to order. */
function showPayNowNotInSidebar() {
    document.getElementById('payNow').classList.add('displayNone');
    document.getElementById('payNowNot').classList.remove('displayNone');
}


/**Shows an info part in the basket, when the total amount is > 15€. */
function showInfoInRespBasketBottom() {
    document.getElementById('bottomButton_basket').classList.add('displayNone');
    document.getElementById('bottomButton_info').classList.remove('displayNone');
    document.getElementById('resp_basketCalculationDisclaimer').classList.remove('displayNone')
}


/**Show a blue "pay now" button in the basket, when the amount is high enough. */
function showPayNowInSidebar() {
    document.getElementById('payNowNot').classList.add('displayNone');
    document.getElementById('bottomButton_info').classList.add('displayNone');
}


function returnOrderInfo() {
    return `<div class="fullBasketOrderInfo  flex">
                <div class="orderInfoYellow resp_orderInfoYellow flex">
                    <p class="orderInfoAmount resp_orderInfoAmount">Benötigter Betrag, um den Mindestbestellwert zu erreichen</p>
                    <p>${(15.00-returnBasketPrice()).toFixed(2).toString().replace('.', ',')} €</p>
                </div>
                <div>
                    <p class="orderInfoBottom">Leider kannst du noch nicht bestellen. Dishes&Burgers liefert erst ab einem MIndestbestellwert von 15,00 € (exkl. Lieferkosten).</p>
                </div>
            </div>`;
}
// <= ################# BASKET CALCULATION #################


function returnBasketPrice() {
    basketPrice = 0;
    for (let i = 0; i < Basket[1].length; i++) {
        basketPrice += Basket[1][i];
    }

    return basketPrice;
}


// ################# BASKET CALCULATION ################# =>
/**Renders the calculation section in the basket */
function renderBasketCalculation(result) {
    basketFullPrice = result + 1.9;

    let calculationContainer = document.getElementById('fullBasketCalculationContainer');
    calculationContainer.innerHTML += returnSubtotal(result);
    calculationContainer.innerHTML += returnDeliveryCosts();
    calculationContainer.innerHTML += returnTotalPrice(basketFullPrice);
    calculationContainer.innerHTML += returnPayNowButton(basketFullPrice);
}


function returnSubtotal(subtotal) {
    return `<div class="basketPrice flex">   
                <p>Zwischensumme</p>
                <p>${subtotal.toFixed(2).toString().replace('.', ',')} €</p>
            </div>`;
}


function returnDeliveryCosts() {
    return `<div class="basketPrice flex">   
                <p>Lieferkosten</p>
                <p>${delivery.toFixed(2).toString().replace('.', ',')} €</p>
            </div>`;
}


function returnTotalPrice(total) {
    return `<div class="basketPrice flex">   
                <p><strong>Gesamt</strong></p>
                <p><strong>${total.toFixed(2).toString().replace('.', ',')} €</strong></p>
            </div>`;
}


function returnPayNowButton(total) {
    return `<div id="payNow" class="payNowSection payNow centering flex">   
                <div><strong>Bezahlen (${total.toFixed(2).toString().replace('.', ',')} €)</strong></div>
            </div>
            <div id="payNowNot" class="payNowSection payNowNot centering flex">   
                <div><strong>Bezahlen (${total.toFixed(2).toString().replace('.', ',')} €)</strong></div>
            </div>
            `;
}


// ########################  MENU CORNER -> PLUS or COUNT ############################

// is use only when rendering the menu
/**shows a "plus" in the top right corner of a menu */
function showPlusCorner(menuID) {
    let menu = document.getElementById(menuID);
    menu.innerHTML += `<img class="plus" src="img/plus.PNG">`;
}


/**shows the "count number" in the top right corner of a menu */
function showCountCorner(menuID, array, index) {        // array is Burgers/Fries/Salads
    let menu = document.getElementById(menuID);
    menu.innerHTML += `<div class="counter">${array[3][index]}</div>`;
}


function checkForCounter(menuID, array, index) {        // array is Burgers/Fries/Salads
    if (array[3][index] < 1) {
        showPlusCorner(menuID);
    }else {
        showCountCorner(menuID, array, index);          
    }
}


function myAccount() {
    document.getElementById('myAccountPopUp_container').classList.remove('displayNone');
}


function preload_myAccountPopUp() {
    let body = document.getElementById('body');
    body.innerHTML += return_myAccountPopUp_container(); 
    document.getElementById('myAccountPopUp_container').classList.add('displayNone');
}


function return_myAccountPopUp_container() {
    return `<div class="myAccountPopUp_container flex" id="myAccountPopUp_container" onclick="close_myAccountPopUp()">
                <div class="myAccountPopUp flex" onclick="doNotClose(event)">
                    <div class="myAccountPopUp_topOrange">
                        <p class="myAccountPopUp_cross" onclick="close_myAccountPopUp()">x</p>
                    </div>
                    <div class="myAccountPopUp_top2Buttons flex centering">
                        <div class="top2Buttons_loginButton flex centering">Anmelden</div>
                        <div class="top2Buttons_registrationButton flex centering">Account erstellen</div>
                    </div>
                    <div class="myAccountPopUp_selection_one flex"></div>
                </div>
            </div>`;
}


function close_myAccountPopUp() {
    document.getElementById('myAccountPopUp_container').classList.add('displayNone');
}


function open_myAccountPopUp() {
    document.getElementById('myAccountPopUp_container').classList.remove('displayNone')
}


function doNotClose(event) {
    event.stopPropagation();
}


function infoPopUP() {
    document.getElementById('infoPopUp_container').classList.remove('displayNone');
}


function preload_infoPopUp() {
    let body = document.getElementById('body');
    body.innerHTML += return_infoPopUp_container();

    let infoPopUp = document.getElementById('infoPopUp');
    returnInfoPopUp_topSectionANDgmaps(infoPopUp);
    returnInfoPopUp_detailsSection(infoPopUp);
    document.getElementById('infoPopUp_container').classList.add('displayNone');
}


function return_infoPopUp_container() {
    return ` <div class="infoPopUp_container flex centering" id="infoPopUp_container" onclick="close_infoPopUp()">
                <div class="infoPopUp flex" id="infoPopUp" onclick="doNotClose(event)"></div>
            </div>`;
}


function returnInfoPopUp_topSectionANDgmaps(container) {
    container.innerHTML += `<div class="infoPopUp_head flex">
                                <p class="infoPopUp_headline">Über das Restaurant</p>
                                <p class="infoPopUp_cross" onclick="close_infoPopUp()">x</p>
                            </div>
                            <div class="infoPopUp_tab_head">
                                <div class="infoPopUp_title_info_container">Info</div>
                            </div>
                            <div class="gmaps_container"><iframe src="https://maps.google.com/maps?q=M%C3%B6serstra%C3%9Fe%2011,%2049074%20Osnabr%C3%BCck&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" id="gmap_canvas" frameborder="0" scrolling="no" style="width: 100%; height: 300px;"></iframe><a href="https://fnftest.net" style="display:none">FNF Test Unblocked</a><style>.mapouter{position:relative;text-align:right;height:400px;width:600px;}</style><a href="https://googlemapsiframegenerator.com" style="display:none">Google Maps Iframe Generator - Free Html Embed Code</a><style>.gmap_canvas{overflow:hidden;background:none!important;height:400px;width:600px;}</style></div>
                            `;
}


function returnInfoPopUp_detailsSection(container) {
    container.innerHTML += `<div class="infoPopUp_details" id="infoPopUp_details"></div>`;
    renderInfoPopUp_details();
}


function renderInfoPopUp_details() {
    let details = document.getElementById('infoPopUp_details');
    details.innerHTML += returnInfoPopUp_details_deliveryTimeContainer(details);
    details.innerHTML += returnInfoPopUp_details_deliveryCostsContainer(details);
    details.innerHTML += returnInfoPopUp_details_paymethodsContainer(details);
}


function returnInfoPopUp_details_deliveryTimeContainer(container) {
    return `<div class="delivery_time_container">
                <p class="delivery_time_headline">Lieferzeiten</p>
                <div class="delivery_time_ul flex">
                    <div class="delivery_time_li flex">
                        <p>Montag - Donnerstag</p> 
                        <p>08:00 - 16:00</p>    
                    </div>
                    <div class="delivery_time_li flex">
                        <p>Freitag - Sonntag</p> 
                        <p>08:00 - 22:00</p>    
                    </div>    
                </div>    
            </div>`;
}


function returnInfoPopUp_details_deliveryCostsContainer(container) {
    return `<div class="delivery_costs_container">
                <p class="delivery_costs_headline">Lieferkosten</p>
                <div class="delivery_costs_ul">
                    <div class="delivery_costs_li flex">
                        <p>Mindestbestellwert</p> 
                        <p>15,00 €</p>    
                    </div>
                    <div class="delivery_costs_li flex">
                        <p>Lieferkosten</p> 
                        <p>1,50 €</p>    
                    </div>    
                </div>    
            </div>`;
}


function returnInfoPopUp_details_paymethodsContainer(container) {
    return `<div class="paymethods_container">
                <p class="paymethods_headline">Bezahlmethoden</p>
                <div class="paymethods flex centering">
                    <img src="img/info_paymethods.PNG">      
                </div>    
            </div>`;
}


function close_infoPopUp() {
    document.getElementById('infoPopUp_container').classList.add('displayNone');
}


function open_infoPopUp() {
    document.getElementById('infoPopUp_container').classList.remove('displayNone')
}