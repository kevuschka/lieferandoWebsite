/**Loading this template div on pageload. */
function preLoad_responsiveBasketButton() {
    document.getElementById('body').innerHTML += `<div class="basketBottom displayNone" id="basketBottom"></div>`;
}


/**Loading this template div on pageload. */
function preLoad_responsiveBasket() {
    document.getElementById('body').innerHTML += `<div class="resp_basket flex displayNone" id="resp_basket"></div>`;
}


/**Preoload some templates and div on pageload */
function preload() {
    renderHeader();
    renderFooter();
    preLoad_responsiveBasketButton();
    preLoad_responsiveBasket();
    preload_myAccountPopUp();
    preload_infoPopUp();
}

/**Thats the empty basket div in responsive view. */
function renderResponsiveBasket_open_empty() {
    let basket = document.getElementById('resp_basket');
    basket.innerHTML = '';
    basket.innerHTML = returnRespBasket_empty_Content();
}


function returnRespBasket_empty_Content() {
    return `
        <div class="resp_basketHead flex" >
            <div class="resp_basketHead_basket">Warenkorb</div>
            <div class="resp_basketHead_cross" onclick="closePopUpBasket()">x</div>
        </div>
        <div class="resp_basketMenuSection flex" id="resp_basketMenuSection"></div>`;
}


/**Thats the basket div in responsive view, with menus put inside. */
function renderResponsiveBasket_open_full() {
    let total = returnBasketPrice() + 1.9;
    let basket = document.getElementById('resp_basket');
    basket.innerHTML = '';
    basket.innerHTML = returnRespBasket_full_Content(total);
    renderRespBasket_full_calculation(total);
}


/**Renders the bottom calculation part in the basket (with items inside) in responsive view.
 * @param {number} total full price (delivery costs included)
 */
function renderRespBasket_full_calculation(total) {
    let calculation = document.getElementById('resp_calculation');
    calculation.innerHTML += returnSubtotal(returnBasketPrice()); 
    calculation.innerHTML += returnDeliveryCosts();
    calculation.innerHTML += returnTotalPrice(total);
    calculation.innerHTML += returnAmountToLow();
}


/**When the amount is to low (< 15€), this div will be shown */
function returnAmountToLow() {
    return `<div class="resp_basketCalculationDisclaimer displayNone" id="resp_basketCalculationDisclaimer">Kostenfreie Lieferung ab 15,00 €</div>`;
}


function returnRespBasket_full_Content(total) {
    return `
        <div class="resp_basketHead flex" >
            <div class="resp_basketHead_basket">Warenkorb</div>
            <div class="resp_basketHead_cross" onclick="closePopUpBasket()">x</div>
        </div>
        <div class="resp_basketMenuSection flex" id="resp_basketMenuSection"><div class="resp_BasketItem" id="resp_BasketItem"></div></div>
        <div class="resp_basketBottom flex">
            <div class="resp_calculation" id="resp_calculation"></div>
            <div id="resp_buttonBasketFull_Container" class="resp_buttonContainer">
                <div id="bottomButton_basket" class="resp_buttonBasketFull flex centering" onclick="popUpBasket();">Bezahlen (${total.toFixed(2).toString().replace('.', ',')} €)</div>
                <div id="bottomButton_info" class="resp_buttonBasketFull_info flex centering" onclick="closePopUpBasket();">Weitere Produkte hinzufügen</div>
            </div
        </div>`;
}


/**Renders the blue button on page (incl. basket price) in responsive view */
function renderBottomBasket() {
    let total = returnBasketPrice() + 1.9;
    let basketBottom = document.getElementById('basketBottom');
    basketBottom.innerHTML = '';
    basketBottom.innerHTML += `
            <div class="basketBottomButton flex centering" onclick="popUpBasket()">Warenkorb (${total.toFixed(2).toString().replace('.', ',')} €)</div>`;
    
    if (returnBasketPrice()) {
        document.getElementById('basketBottom').classList.remove('displayNone');
    } else {
        document.getElementById('basketBottom').classList.add('displayNone');
    }
}


function closePopUpBasket() {
    document.getElementById('resp_basket').classList.add('displayNone');
}


function popUpBasket() {
    document.getElementById('resp_basket').classList.remove('displayNone');
}

