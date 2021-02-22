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
const header = document.querySelector("#section_one h2");
const medieurl = "https://fiskfisk-2fc1.restdb.io/media/";
const myHeaders = {
    'x-apikey': "602e97ac5ad3610fb5bb6361"
};


let filter = "alle";
let fiske;


function start() {
    const filterKnapper = document.querySelectorAll(".filtrering button");
    // vis i consollen
    console.log(filterKnapper);
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerFisk));
    hentData();
}

// Filtrer fisk
function filtrerFisk() {
    // vis i consollen
    console.log("filtrerfisk")
    //hent dataset fra html
    filter = this.dataset.levested;
    // fjern classen valgt, fra alle knappen
    document.querySelector(".valgt").classList.remove("valgt");
    //Tilføj classen valgt
    this.classList.add("valgt");
//Gå til visFiske
    visFiske();
    header.textContent = this.textContent;
}

// Hent data fra database
async function hentData() {
    const JSONData = await fetch("https://fiskfisk-2fc1.restdb.io/rest/fisk", {
        headers: myHeaders
    });
    fiske = await JSONData.json();
    // vis i consollen
    console.log("Fisk", fiske);

    // Gå til viFiske
    visFiske();
}

//Udvælg område for skabelon
const dest = document.querySelector("#section_two");
//udvælg skabelon
const skabelon = document.querySelector("template").content;


function visFiske() {
    dest.textContent = "";
    fiske.forEach(fisk => {
        // vis i consollen
        console.log("levested", fisk);
        if (filter == fisk.levested || filter == "alle") {
            const klon = skabelon.cloneNode("true");
            // vis fiske billede
            klon.querySelector(".fisk").src = medieurl + fisk.billede;
            // vil fiske navn
            klon.querySelector(".navn").textContent = fisk.art;
            // klik på fisk -> gå til detalje.html
            klon.querySelector(".fisk").addEventListener("click", () => visDetaljer(fisk));
            dest.appendChild(klon);
        }
    })
}

function visDetaljer(hvad) {
    // vis i consollen
    console.log(hvad);
    //hent id fra valgte fisk
    location.href = `detalje.html?id=${hvad._id}`;
}
