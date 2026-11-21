import { contextBridge, ipcRenderer } from 'electron'

const capriAPI = {
  getVersion: (): Promise<string> => {
    return ipcRenderer.invoke('capri:get-version')
  },

  hide: (): void => {
    ipcRenderer.send('capri:hide')
  },

  minimize: (): void => {
    ipcRenderer.send('capri:minimize')
  },
}

contextBridge.exposeInMainWorld('capri', capriAPI)
