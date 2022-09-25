function renderRestaurantTemplate() {
    let restaurant_info = document.getElementById('restaurantTemplate');
    restaurant_info.innerHTML = '';
    restaurant_info.innerHTML += `<div class="restaurant flex" id="restaurant"></div>`;
    let restaurantSection = document.getElementById('restaurant');
            returnRestaurant_titelAndReviews(restaurantSection); 
            returnRestaurant_minInfos(restaurantSection);
            returnRestaurant_disclaimerAndinfoANDheart(restaurantSection);
    checkForLike();
}


function returnRestaurant_titelAndReviews(container) {
    container.innerHTML += `
        <p class="restaurantName darkblue">Dishes&Burgers</p>
        <div class="reviews flex">
            <img src="img/starsIcon.PNG">
            <a href="#" class="orange">(412 Bewertungen)</a>
        </div>`;
}


function returnRestaurant_minInfos(container) {
    container.innerHTML += `
        <div class="info flex gray" id="info"></div>`;
    let minInfoContent = document.getElementById('info');
    returnMinInfo_time(minInfoContent);
    returnMinInfo_bike(minInfoContent);
    returnMinInfo_basket(minInfoContent);
}


function returnMinInfo_time(container) {
    container.innerHTML += `<div class="minInfo minTime flex centering">
    <img src="img/timeIcon.PNG">
    <p>55-80 min</p>
</div>`;
}


function returnMinInfo_bike(container) {
    container.innerHTML += `<div class="minInfo minBike flex centering">
    <img src="img/bikeIcon.PNG">
    <p>1,90 €</p>
</div>`;
}


function returnMinInfo_basket(container) {
    container.innerHTML += `<div class="minInfo minBasket flex centering">
    <img src="img/basketIcon.PNG">
    <p>Min. 15,00 €</p>
</div>`;
}


function returnRestaurant_disclaimerAndinfoANDheart(container) {
    container.innerHTML += `
        <p class="disclaimer gray">Bei diesem Restaurant kannst du Stempel sammeln. Stelle beim Bestellabschluss bitte sicher, dass du dich für unseren Newsletter angemeldet hast, um deine Stempel per E-Mail zu erhalten.</p>
        <div class="infoANDheartContainer flex">
            <div class="infoContainer flex centering" onclick="infoPopUP()"><img class="infoIcon" src="img/infoIcon.PNG" onclick="infoPopUP()"></div>
            <div id="unliked" class="heartContainer flex centering" onclick="like()"><img class="heartIcon" src="img/heartIconEmpty.PNG"></div>
            <div id="liked" class="heartContainer flex centering displayNone" onclick="unlike()"><img class="heartIcon" src="img/heartIcon.PNG"></div>
        </div>`;
}