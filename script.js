
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






document.addEventListener("DOMContentLoaded", start)
const header = document.querySelector("h1");
const medieurl = "https://babushka-dd8a.restdb.io/media/";
const myHeaders = {
    'x-apikey': "600ec2fb1346a1524ff12de4"
};


let filter = "alle";
let fisk;


function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    console.log(filterKnapper);
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerFisk));
    hentData();
}

function filtrerFisk() {
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");

    visFisk();
    header.textContent = this.textContent;
}


async function hentData() {
    const JSONData = await fetch("https://babushka-dd8a.restdb.io/rest/menu", {
        headers: myHeaders
    });
    fisk = await JSONData.json();
    console.log("Fisk", fisk);
    visFisk();
}


const dest = document.querySelector("#liste");
const skabelon = document.querySelector("template").content;


function visFisk() {
    dest.textContent = "";
    fisk.forEach(menu => {
        console.log("kategori", menu.kategori)
        if (filter == menu.kategori || filter == "alle") {
            const klon = skabelon.cloneNode("true");
            klon.querySelector(".billede").src = medieurl + menu.billede;
            klon.querySelector(".navn").textContent = menu.navn;
            klon.querySelector(".kortbeskrivelse").textContent = menu.kortbeskrivelse;
            klon.querySelector(".pris").textContent = menu.pris + ",-";
            klon.querySelector(".ret").addEventListener("click", () => visDetaljer(menu));
            dest.appendChild(klon);
        }
    })
}

function visDetaljer(hvad) {
    console.log(hvad);
    location.href = `detalje.html?id=${hvad._id}`;
}
