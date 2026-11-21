"use strict";
const electron = require("electron");
const capriAPI = {
  getVersion: () => {
    return electron.ipcRenderer.invoke("capri:get-version");
  },
  hide: () => {
    electron.ipcRenderer.send("capri:hide");
  },
  minimize: () => {
    electron.ipcRenderer.send("capri:minimize");
  }
};
electron.contextBridge.exposeInMainWorld("capri", capriAPI);
