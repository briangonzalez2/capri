export {}

declare global {
  interface Window {
    capri: {
      getVersion: () => Promise<string>
      hide: () => void
      minimize: () => void
    }
  }
}