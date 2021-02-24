window.addEventListener("load", sidenVises);

function sidenVises() {
    // Viser "siden vies" i konsollen
    console.log("sidenVises");
    // Kalder på #menuknap, adder 'click' og går til toggleMenu
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}

function toggleMenu() {
    // Viser "toggleMenu" i konsollen
    console.log("toggleMenu");
    // Kalder på #menu, tildeler classen 'hidden'
    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";

    } else {
        document.querySelector("#menuknap").textContent = "✕";
        document.querySelector("#menu").classList.remove("hidden");
    }

}
