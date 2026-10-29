const {
    app,
    BrowserWindow
   } = require("electron");
   const path = require("path")

   function createWindow() {
    const window = new BrowserWindow({
    width: 800,
    height: 600
    });
    window.loadFile(
    path.join(__dirname, "Autorentool.html")
    );
   }
   app.whenReady().then(() => {
    createWindow();
   })

// Datenbank verbindung herstellen
const database = require("better-sqlite3");
const db = new Database('QuizzApp.db');

ipcMain.handle('Liste:getAll', () => {
    return db.prepare(`SELECT q.text, c.category_name AS categoryname
        FROM question q
        LEFT JOIN category c ON q.category = c.category_id;`)
});