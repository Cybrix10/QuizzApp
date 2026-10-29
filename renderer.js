let alleFragen = [];

function tabellenAnzeigen(fragenListe){
    const listenTbody = document.getElementById("fragen-liste");
    listenTbody.innerHTML = ""; //Tablle leeren da im HTML von Luis als Placeholder dargestellt würde

    if(fragenListe.length === 0){
        listenTbody.innerHTML = `<tr><td colspan="2">Keine Fragen gefunden.</td></tr>`;
        return;
    }

    fragenListe.forEach(element => {
        const tr = document.createElement("tr");
        const tdText = document.createElement("td");
        tdText.textContent = element.text;
        const tdKategorie = document.createElement("td");
        tdKategorie.textContent = element.category;

        tr.appendChild(tdText);
        tr.appendChild(tdKategorie);
        
        listenTbody.appendChild(tr);
    })
}

async function fragenSuchen(){
    try{
        alleFragen = await window.api.getAllFragen();
        tabellenAnzeigen(alleFragen);
    }catch (err){
        console.error("Error beim Laden der Fragen!",err);
    }
}

const suchFeld = document.getElementById("suche");
suchFeld.addEventListener("input", (event) => {
    const suchBegriff = event.target.value.toLowerCase();
    const gefilterteFragen = alleFragen.filter(frage => {
        return frage.text.toLowerCase().includes(suchBegriff);
    });
    tabellenAnzeigen(gefilterteFragen);
});
fragenSuchen();


// Die Daten aus db für kategorie holen um selecten zu können
async function kategorien(){
    const kategorienListe = await window.api.getAllKategorien();
    const selectElement = document.getElementById("filter-kategorie");
    selectElement.innerHTML = '<option value="">Alle Kategorien</option>';
    kategorienListe.forEach(element => {
        const options = document.createElement("option");
        options.value = element.category_name;
        options.textContent = element.category_name;
        selectElement.appendChild(options);
    });
}
kategorien();


// Die Daten aus db für stufen holen um selecten zu können
async function stufen(){
    const stufenListe = await window.api.getAllStufen();
    const selectElement = document.getElementById("filter-stufe");
    selectElement.innerHTML = '<option value="">Alle Stufen</option>';
    stufenListe.forEach(element => {
        const options = document.createElement("option");
        options.value = element.difficulty_name;
        options.textContent = element.difficulty_name;
        selectElement.appendChild(options);
    });
}
stufen();