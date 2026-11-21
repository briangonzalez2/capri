import { ipcMain, app, BrowserWindow, screen } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let capriWindow = null;
ipcMain.handle("capri:get-version", () => {
  return app.getVersion();
});
ipcMain.on("capri:hide", () => {
  capriWindow == null ? void 0 : capriWindow.hide();
});
ipcMain.on("capri:minimize", () => {
  capriWindow == null ? void 0 : capriWindow.minimize();
});
function createWindow() {
  const { x, y, width, height } = screen.getPrimaryDisplay().workArea;
  const windowWidth = 400;
  const windowHeight = 550;
  capriWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: x + width - windowWidth,
    y: y + height - windowHeight,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    hasShadow: false,
    resizable: false,
    maximizable: false,
    minimizable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  capriWindow.once("ready-to-show", () => {
    capriWindow == null ? void 0 : capriWindow.show();
  });
  capriWindow.webContents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });
  capriWindow.webContents.on("will-navigate", (event, url) => {
    if (VITE_DEV_SERVER_URL && url.startsWith(VITE_DEV_SERVER_URL)) {
      return;
    }
    event.preventDefault();
  });
  if (VITE_DEV_SERVER_URL) {
    capriWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    capriWindow.loadFile(path.join(process.env.APP_ROOT, "dist", "index.html"));
  }
  capriWindow.on("closed", () => {
    capriWindow = null;
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
export {
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
