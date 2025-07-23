const { contextBridge, clipboard } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  copyToClipboard: (text: string) => {

    console.log("Copying to clipboard:", text);

    clipboard.writeText(text);
  },
});
