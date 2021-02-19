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






document.addEventListener("DOMContentLoaded", start);
const header = document.querySelector("h1");
const medieurl = "https://fiskfisk-2fc1.restdb.io/media/";
const myHeaders = {
    'x-apikey': "602e97ac5ad3610fb5bb6361"
};


let filter = "alle";
let fiske;


function start() {
    const filterKnapper = document.querySelectorAll(".kategori button");
    console.log(filterKnapper);
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerFisk));
    hentData();
}

function filtrerFisk() {
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");

    visFiske();
    header.textContent = this.textContent;
}


async function hentData() {
    const JSONData = await fetch("https://fiskfisk-2fc1.restdb.io/rest/fisk", {
        headers: myHeaders
    });
    fiske = await JSONData.json();
    console.log("Fisk", fiske);
    visFiske();
}


const dest = document.querySelector("#liste");
const skabelon = document.querySelector("template").content;


function visFiske() {
    dest.textContent = "";
    fiske.forEach(fisk => {
        console.log("kategori", fisk);
        if (filter == fisk.levested || filter == "alle") {
            const klon = skabelon.cloneNode("true");
            klon.querySelector(".billede").src = medieurl + fisk.billede;
            klon.querySelector(".art").textContent = fisk.art;
            klon.querySelector(".fisk").addEventListener("click", () => visDetaljer(fisk));
            dest.appendChild(klon);
        }
    })
}

function visDetaljer(hvad) {
    console.log(hvad);
    location.href = `detalje.html?id=${hvad._id}`;
}
