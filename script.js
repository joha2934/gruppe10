// load siden
window.addEventListener("load", start);

function start() {
    console.log("start");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
    // Henter knapper fra filtrering
    const filterKnapper = document.querySelectorAll(".filtrering button");
    // vis i consollen
    console.log(filterKnapper);
    // Sætter klik på alle
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerFisk));

    // Går til hentData
    hentData();
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







const header = document.querySelector("#section_one h2");
// Henter billeder
const medieurl = "https://fiskfisk-2fc1.restdb.io/media/";
// Nøgle til adgang
const myHeaders = {
    'x-apikey': "602e97ac5ad3610fb5bb6361"
};

// variabler
let filter = "alle";
let fiske;


function start() {
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
    // Henter knapper fra filtrering
    const filterKnapper = document.querySelectorAll(".filtrering button");
    // vis i consollen
    console.log(filterKnapper);
    // Sætter klik på alle
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerFisk));

    // Går til hentData
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
    //Valgte knap bliver vist som h2 i section_one
    header.textContent = this.textContent;
}

// Hent data fra database
async function hentData() {
    const JSONData = await fetch("https://fiskfisk-2fc1.restdb.io/rest/fisk", {
        headers: myHeaders
    });
    // Udskriver JSONData
    fiske = await JSONData.json();
    // vis i consollen
    console.log("Fisk", fiske);

    // Gå til visFiske
    visFiske();
}

//Udvælg område for skabelon
const dest = document.querySelector("#section_two");
//udvælg skabelon
const skabelon = document.querySelector("template").content;


function visFiske() {
    // indsætter tekst textContent til section_two
    dest.textContent = "";
    fiske.forEach(fisk => {
        // vis i consollen
        console.log("levested", fisk);
        //Hvis knappen er = et levested, vises begrænsede fisk. Ellers vises alle fisk
        if (filter == fisk.levested || filter == "alle") {
            const klon = skabelon.cloneNode("true");
            // vis fiske billede
            klon.querySelector(".fisk").src = medieurl + fisk.billede;
            // vil fiske navn
            klon.querySelector(".navn").textContent = fisk.art;
            // klik på fisk -> gå til detalje.html
            klon.querySelector(".fisk").addEventListener("click", () => visDetaljer(fisk));
            //Kloner templates
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
