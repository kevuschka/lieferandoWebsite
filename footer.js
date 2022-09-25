function renderFooter() {
    let footer = document.getElementById('footerTemplate');
    footer.innerHTML = returnFooter();
}


function returnFooter() {
    return `<div class="footerImportant">
                <a>Ein Restaurant empfehlen</a>
                <a>Ein Restaurant anmelden</a>
                <a>Jobs</a>
                <a>AGB</a>
                <a>Datenschutzerklärung</a>
                <a>Impressum</a>
                <a>Verwendung von Cookies</a>
                <a>Bug Bounty</a>
                <a>Ethik-Hotline</a>
            </div>
            <div class="footerCompany"><a>© 2022 HOMErando.de</a></div>`;
}