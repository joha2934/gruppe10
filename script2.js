// Load siden
window.addEventListener("load", sidenVises);

function sidenVises() {
    // Viser "siden vises" i konsollen
    console.log("sidenVises");
    // Kalder på #menuknap, adder 'click' og går til toggleMenu
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}

function toggleMenu() {
    // Viser "toggleMenu" i konsollen
    console.log("toggleMenu");
    // Kalder på #menu, skifter mellem at add og remove classen 'hidden'
    document.querySelector("#menu").classList.toggle("hidden");
    // Når #menu indeholder .hidden
    let erSkjult = document.querySelector("#menu").classList.contains("hidden");
    // hvis #menu indeholder .hidden er sand, vises burgermenu ikon
    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";

    } //ellers vises menupunkterne og x ikon
    else {
        document.querySelector("#menuknap").textContent = "✕";
        document.querySelector("#menu").classList.remove("hidden");
    }

}
