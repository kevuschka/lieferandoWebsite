function renderHeader() {
    let header = document.getElementById('headerTemplate');
    header.innerHTML = returnHeader();
}


function returnHeader() {
    return `<div id="header" class="header flex centering">
                <a class="headerLogo flex centering" href="index.html">
                    <img class="headerHouse" src="img/house.png">
                    <p class="headerTitle"><b>HOMErando</b>.de</p>
                </a>
                <div class="headerMiddle">
                    <p><b>Wo möchtest du Essen bestellen?</b></p>
                </div>
                <div class="headerLangMenu flex centering">
                    <img class="headerFlag" src="img/germanFlag.png">
                    <img class="headerMenu" src="img/menu.png" onclick="open_myAccountPopUp()">
                </div>
            </div>`;
}