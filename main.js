const {
    app,
    BrowserWindow
   } = require("electron");
   const path = require("path")

   function createWindow() {
    const window = new BrowserWindow({
    width: 1200,
    height: 760,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true // blendet die Menüleiste aus, wie im Mockup
    });
    window.loadFile(
    path.join(__dirname, "Autorentool.html")
    );
   }
   app.whenReady().then(() => {
    createWindow();
    app.on("window-all-closed", () => app.quit());  // sonst läuft die App im Hintergrund weiter, auch wenn alle Fenster geschlossen sind
   })