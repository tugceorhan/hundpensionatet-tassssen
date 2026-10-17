
function uppdateraKlockaOchStatus() {
    const nu = new Date();

    const datumVal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const datumStrang = nu.toLocaleDateString('sv-SE', datumVal);
    
    const formateratDatum = datumStrang.charAt(0).toUpperCase() + datumStrang.slice(1);
    document.getElementById("current-date").textContent = formateratDatum;

    const timmar = String(nu.getHours()).padStart(2, '0');
    const minuter = String(nu.getMinutes()).padStart(2, '0');
    const sekunder = String(nu.getSeconds()).padStart(2, '0');
    
    document.getElementById("current-time").textContent = `${timmar}:${minuter}:${sekunder}`;

    const dag = nu.getDay(); 
    const nuvarandeTimme = nu.getHours();
    
    let arOppet = false;

    if (dag >= 1 && dag <= 5) {
        if (nuvarandeTimme >= 7 && nuvarandeTimme < 18) {
            arOppet = true;
        }
    } 
    else if (dag === 6) {
        if (nuvarandeTimme >= 9 && nuvarandeTimme < 14) {
            arOppet = true;
        }
    }

    const statusBadge = document.getElementById("status-badge");
    if (arOppet) {
        statusBadge.textContent = "Öppet just nu";
        statusBadge.className = "status-badge open";
    } else {
        statusBadge.textContent = "Stängt just nu";
        statusBadge.className = "status-badge closed";
    }
}

setInterval(uppdateraKlockaOchStatus, 1000);
uppdateraKlockaOchStatus();


class Bokningslista {
    constructor() {
        const franStorage = localStorage.getItem("tassen_bokningar");
        this.bokningar = franStorage ? JSON.parse(franStorage) : [];
    }

    laggTill(hundNamn, datum) {
        const nyBokning = {
            id: Date.now(), 
            hundNamn: hundNamn,
            datum: datum
        };
        this.bokningar.push(nyBokning);
        this.spara();
    }

    taBort(id) {
        this.bokningar = this.bokningar.filter(b => b.id !== id);
        this.spara();
    }

    spara() {
        localStorage.setItem("tassen_bokningar", JSON.stringify(this.bokningar));
    }

    hamtaAlla() {
        return this.bokningar;
    }
}

const minBokningslista = new Bokningslista();

const bookingForm = document.getElementById("booking-form");
const dogNameInput = document.getElementById("dog-name");
const bookingDateInput = document.getElementById("booking-date");
const formError = document.getElementById("form-error");
const bookingsListElement = document.getElementById("bookings-list");


const dagensDatum = new Date().toISOString().split('T')[0];
bookingDateInput.setAttribute("min", dagensDatum);

function ritaBokningar() {
    bookingsListElement.innerHTML = "";
    const allaBokningar = minBokningslista.hamtaAlla();

    if (allaBokningar.length === 0) {
        const tomLi = document.createElement("li");
        tomLi.className = "empty-list-info";
        tomLi.textContent = "Du har inga sparade bokningsförfrågningar ännu.";
        bookingsListElement.appendChild(tomLi);
        return;
    }

    allaBokningar.forEach(bokning => {
        const li = document.createElement("li");
        
        const infoText = document.createElement("span");
        infoText.textContent = `Hund: ${bokning.hundNamn} | Datum: ${bokning.datum}`;
        
        const taBortKnapp = document.createElement("button");
        taBortKnapp.textContent = "Avboka";
        taBortKnapp.className = "btn btn-delete";
        
        taBortKnapp.addEventListener("click", () => {
            minBokningslista.taBort(bokning.id);
            ritaBokningar();
        });

        li.appendChild(infoText);
        li.appendChild(taBortKnapp);
        bookingsListElement.appendChild(li);
    });
}

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const hundNamn = dogNameInput.value.trim();
    const datum = bookingDateInput.value;
    const idag = new Date().toISOString().split('T')[0];

    
    if (!hundNamn || !datum) {
        formError.textContent = "Vänligen fyll i både hundens namn och ett datum.";
        return;
    }

    
    if (datum < idag) {
        formError.textContent = "Du kan inte boka ett datum som redan har varit!";
        return;
    }

    formError.textContent = "";

    minBokningslista.laggTill(hundNamn, datum);

    dogNameInput.value = "";
    bookingDateInput.value = "";

    ritaBokningar();
});

ritaBokningar();


const omdomen = [
    { text: "Tassen är helt fantastiskt! Vår Buster mår så bra efter en dag här.", forfattare: "Karin & Buster" },
    { text: "Proffsig personal och så skönt med de stora uteytorna. Rekommenderas starkt!", forfattare: "Marcus" },
    { text: "Tryggt pensionat när vi var bortresta över helgen. Vi fick uppdateringar hela tiden.", forfattare: "Elin och hunden Bella" },
    { text: "Hämtning och lämningsservicen sparar mig så mycket tid i vardagen!", forfattare: "Johan P." },
    { text: "Det märks verkligen att Nina och Pelle älskar hundar. Fem av fem stjärnor!", forfattare: "Sara M." }
];

let senastVisadeIndex = -1;

function visaSlumpatOmdome() {
    let nyttIndex;
    
    do {
        nyttIndex = Math.floor(Math.random() * omdomen.length);
    } while (nyttIndex === senastVisadeIndex && omdomen.length > 1);

    senastVisadeIndex = nyttIndex;

    const utvaltOmdome = omdomen[nyttIndex];
    document.getElementById("review-text").textContent = `"${utvaltOmdome.text}"`;
    document.getElementById("review-author").textContent = `- ${utvaltOmdome.forfattare}`;
}

document.getElementById("next-review-btn").addEventListener("click", visaSlumpatOmdome);

visaSlumpatOmdome();