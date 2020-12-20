const { app, BrowserWindow, ipcMain: ipc, dialog } = require("electron");
const chokidar = require("chokidar");
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: __dirname + "/preload.js",
    },
  });

  const startUrl = isDev
    ? "http://localhost:3000"
    : url.format({
        pathname: path.join(__dirname, "/../build/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(startUrl);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipc.on("file:request", () => {
  const files = dialog.showOpenDialogSync(mainWindow, {
    properties: ["openFile"],
    filters: [{ name: "Log File", extensions: ["log"] }],
  });

  if (!files) return;
  const watcher = chokidar.watch(files[0], { persistent: true });

  watcher
    .on("add", (path) => mainWindow.webContents.send("file:open", path))
    .on("change", (path) => mainWindow.webContents.send("file:change", path));
});
