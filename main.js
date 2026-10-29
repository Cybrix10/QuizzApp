const {
    app,
    BrowserWindow,
    ipcMain
   } = require("electron");
   const path = require("path")

   function createWindow() {
    const window = new BrowserWindow({
    width: 1200,
    height: 760,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true, // blendet die Menüleiste aus, wie im Mockup
    webPreferences: {
        preload: path.join(__dirname, "preload.js"), // preload verknüfen
        nodeIntegration: false,
        contextIsolation: true
    }
    });
    window.loadFile(
    path.join(__dirname, "Autorentool.html")
    );
    window.webContents.openDevTools(); // Konsole öffnen um fehlern anzuzeigen falls etwas fehlschlägt
   }
   app.whenReady().then(() => {
    createWindow();
   })

// Datenbank verbindung herstellen
const database = require("better-sqlite3");
const { start } = require("repl");
const db = new database('QuizzApp.db');


// Kanal für Alle Fragen
ipcMain.handle('fragen:getAll', () => {
    const stmt = db.prepare(`SELECT 
            q.question_id, 
            q.text, 
            c.category_name AS category, 
            d.difficulty_name AS difficulty 
        FROM question q
        JOIN category c ON q.category = c.category_id
        JOIN difficulty d ON q.difficulty = d.difficulty_level;`);
        return stmt.all();
});

//kanal für Fragen suchen


// Kanal für Kategorien
ipcMain.handle('kategorien:getAll', () => {
    const stmt = db.prepare(`SELECT * FROM category;`);
    return stmt.all();
})


// Kanal für Stufen
ipcMain.handle('stufen:getAll', () => {
    const stmt = db.prepare(`SELECT * FROM difficulty`);
    return stmt.all();
})

app.on("window-all-closed", () => app.quit());  // sonst läuft die App im Hintergrund weiter, auch wenn alle Fenster geschlossen sind