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