"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
let win = null;
function createWindow() {
    if (win)
        return;
    win = new electron_1.BrowserWindow({
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
electron_1.app.whenReady().then(() => {
    // Registra atalho global
    electron_1.globalShortcut.register("Control+Shift+.", () => {
        if (!win) {
            createWindow();
            // Mostrar só quando estiver pronto para evitar precisar apertar 2x
            win.once("ready-to-show", () => {
                win?.show();
            });
        }
        else {
            win.isVisible() ? win.hide() : win.show();
        }
    });
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
electron_1.app.on("will-quit", () => {
    electron_1.globalShortcut.unregisterAll();
});
