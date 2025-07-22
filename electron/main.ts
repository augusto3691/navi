import { app, BrowserWindow, globalShortcut } from "electron";
import * as path from "path";

let win: BrowserWindow | null = null;

function createWindow() {
  if (win) return;

  win = new BrowserWindow({
    darkTheme: true,
    width: 400,
    height: 500,
    show: false, // inicia oculta
    resizable: false,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    roundedCorners: true,
    hasShadow: true,
    backgroundColor: "#00000000", // transparente
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL("http://localhost:5173");

  // Fecha a janela logicamente (não destrói) com ESC
  win.webContents.on("before-input-event", (_, input) => {
    if (input.key === "Escape") {
      win?.hide();
    }
  });

  // Fecha a janela quando perder o foco (clicar fora)
  win.on("blur", () => {
    win?.hide();
  });

  // Zera a referência quando janela for fechada de verdade
  win.on("closed", () => {
    win = null;
  });
}



app.whenReady().then(() => {
  // Registra atalho global
  globalShortcut.register("Control+Shift+.", () => {
    if (!win) {
      createWindow();
      // Mostrar só quando estiver pronto para evitar precisar apertar 2x
      win!.once("ready-to-show", () => {
        win?.show();
      });
    } else {
      win.isVisible() ? win.hide() : win.show();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});