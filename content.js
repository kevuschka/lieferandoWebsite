let burgers = ['Classic Cheeseburger', 'Vegan American Burger', 'Smashed Burger'];
let burgers_info = ['mit hausgemachtem Burgersauce und 150g Rinderpattie', 'mit hausgemachtem 150g Erbsen-/Sojapattie, Sauce (vegan), Sesam und Käse (vegan)', 'mit 2x100g Rinderpattie, hauseigener spezial Sauce und Cheddar'];
let burgers_prices = [12.95, 11.95, 14.95];
let burgers_counter = [0,0,0];
let Burgers = [burgers ,burgers_info, burgers_prices, burgers_counter];


let fries = ['Portion Pommes "French"', 'Portion Pommes "American"', 'Portion Pommes "Spain"'];
let fries_info = ['mit Spezialsauce (oder Sauce nach Wahl)', 'mit american friets sauce', 'mit Menchego-Käse, Peperoni und Frühlingszwiebel'];
let fries_prices = [4.95, 4.95, 4.95];
let fries_counter = [0,0,0];
let Fries = [fries, fries_info, fries_prices, fries_counter];


let salads = ['Französischer Salat', 'Thunfisch Salat', 'Italienischer Nudelsalat'];
let salads_info = ['mit Oliven, getrockneten Tomaten und selbstgemachtem Dressing', 'mit hausgemachtem Dressing', 'mit Rucola, Cherrytomaten und weicher Mozarella'];
let salads_prices = [6.95, 7.95, 7.95];
let salads_counter = [0,0,0];
let Salads = [salads, salads_info, salads_prices, salads_counter];

let ALLMENUS = [Burgers, Fries, Salads];

let basket_menu = [];
let basket_price = [];
let basket_counter = [];
let original_menu_arrays = [];
let original_menu_prices = [];
let original_menu_indexes = [];
let basket_comment = [];
let original = [original_menu_prices, original_menu_indexes]
//  Basket[3]= [          0         ,          1           ]

let Basket = [basket_menu, basket_price, basket_counter, original, basket_comment];
// Basket =  [    0      ,       1     ,       2       ,    3    ,       4       ] 

/**for formatting porpose */
let price;
/**delivery costs */
const delivery = 1.9; 
/** price without delivery costs */
let basketPrice;
/**total price */
let basketFullPrice;

let heart;
let SearchMenus = [];


/**Rendering the page content. Here the "Beliebte Gerichte" section. */
function renderLovedMenu() {
    let lovedMenusSection = document.getElementById('lovedMenus');

    lovedMenusSection.innerHTML = '';
    lovedMenusSection.innerHTML += `<div id="lovedMenusSection" class="title bg-beige darkblue flex">Beliebte Gerichte</div>`;
    renderLovedMenu_Burger(lovedMenusSection);
    renderLovedMenu_Salad(lovedMenusSection);
    renderLovedMenu_Fries(lovedMenusSection);
}


/**Renders the burger section in the loved menu section ("Beliebte Gerichte") 
 * @param {string} container the countainer where to load the burger section inside
*/
function renderLovedMenu_Burger(container) {
    let priceBurger = Burgers[2][1];
    priceBurger = priceBurger.toString().replace('.', ',');
    container.innerHTML += returnLoveFood_Burger(priceBurger);
    checkForCounter(`food031_4`, Burgers, 1);
}


function renderLovedMenu_Salad(container) {
    let priceSalad = Salads[2][1];
    priceSalad = priceSalad.toString().replace('.', ',');
    container.innerHTML += returnLoveFood_Salad(priceSalad);
    checkForCounter(`food231_4`, Salads, 1);
}


function renderLovedMenu_Fries(container) {
    let priceFries = Fries[2][0];
    priceFries = priceFries.toString().replace('.', ',');
    container.innerHTML += returnLoveFood_Fries(priceFries);
    checkForCounter(`food130_4`, Fries, 0);
}


function returnLoveFood_Burger(price) {
    return `<div id="food031_4" class="food gray-border flex round-corner" onclick="addToBasket(Burgers,1)">
                <div>
                    <p class="footTitle darkblue">${Burgers[0][1]}</p>
                    <p class="foodIngredients gray">${Burgers[1][1]}</p>
                    <p class="foodPrice orange">${price} €</p>
                </div>
            </div>`;
}


function returnLoveFood_Salad(price) {
    return `<div id="food231_4" class="food gray-border flex round-corner" onclick="addToBasket(Salads,1)">
                <div>
                    <p class="footTitle darkblue">${Salads[0][1]}</p>
                    <p class="foodIngredients gray">${Salads[1][1]}</p>
                    <p class="foodPrice orange">${price} €</p>
                </div>
            </div>`;
}


function returnLoveFood_Fries(price) {
    return `<div id="food130_4" class="food gray-border flex round-corner" onclick="addToBasket(Fries,0)">
                <div>
                    <p class="footTitle darkblue">${Fries[0][0]}</p>
                    <p class="foodIngredients gray">${Fries[1][0]}</p>
                    <p class="foodPrice orange">${price} €</p>
                </div>
            </div>`;
}


/**Rendering the page content. */
function renderBurger() {
    let burgerSection = document.getElementById('burger');
        burgerSection.innerHTML = '';
        burgerSection.innerHTML += returnBurgerSection();
        for (let i = 0; i < Burgers[0].length; i++) {
            price = Burgers[2][i];
            burgerSection.innerHTML += returnBurgerMenus(i);
            checkForCounter(`food03${i}`, Burgers, i);
        } 
}


function returnBurgerSection() {
    return `<div id="burgerSection" class="titleANDImage flex round-corner">
                <img class="titleImage" src="img/burger.jpg">
                <div class="title bg-beige darkblue flex">Burger</div>
            </div>`;
}


function returnBurgerMenus(index) {
    return `<div id="food03${index}" class="food gray-border flex round-corner" onclick="addToBasket(Burgers,${index})">
                <div>
                    <p class="footTitle darkblue" id="${Burgers[0][index]}">${Burgers[0][index]}</p>
                    <p class="foodIngredients gray">${Burgers[1][index]}</p>
                    <p class="foodPrice orange">${price.toString().replace('.',',')} €</p>
                </div>
            </div>`;
}

/**Rendering the page content. */
function renderFries() {
    let fritesSection = document.getElementById('fries');
        fritesSection.innerHTML = '';
        fritesSection.innerHTML += returnFriesSection();
        for (let i = 0; i < Fries[0].length; i++) {
            price = Fries[2][i];
            fritesSection.innerHTML += returnFriesMenus(i);
            checkForCounter(`food13${i}`, Fries, i);
        }
}


function returnFriesSection() {
    return `<div id="friesSection" class="titleANDImage flex round-corner">
                <img class="titleImage" src="img/fries.jpg">
                <div class="title bg-beige darkblue flex">Pommes</div>
            </div>`;
}


function returnFriesMenus(index) {
    return `<div id="food13${index}" class="food gray-border flex round-corner" onclick="addToBasket(Fries,${index})">
                <div>
                    <p class="footTitle darkblue" id="${Fries[0][index]}">${Fries[0][index]}</p>
                    <p class="foodIngredients gray">${Fries[1][index]}</p>
                    <p class="foodPrice orange">${price.toString().replace('.',',')} €</p>
                </div>
            </div>`;
}

/**Rendering the page content. */
function renderSalad() {
    let saladSection = document.getElementById('salad');
    saladSection.innerHTML = '';
    saladSection.innerHTML += returnSaladSection();
    for (let i = 0; i < Salads[0].length; i++) {
        price = Salads[2][i];
        saladSection.innerHTML += returnSaladMenus(i);
        checkForCounter(`food23${i}`, Salads, i);
    }
}


function returnSaladSection() {
    return `<div id="saladSection" class="titleANDImage flex round-corner">
                <img class="titleImage saladImage" src="img/salad.jpg">
                <div class="title bg-beige darkblue flex">Salate</div>
            </div>`;
}


function returnSaladMenus(index) {
    return `<div id="food23${index}" class="food gray-border flex round-corner" onclick="addToBasket(Salads,${index})">
                <div>
                    <p class="footTitle darkblue" id="${Salads[0][index]}">${Salads[0][index]}</p>
                    <p class="foodIngredients gray">${Salads[1][index]}</p>
                    <p class="foodPrice orange">${price.toString().replace('.',',')} €</p>
                </div>
            </div>`;
}