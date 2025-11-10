const { contextBridge, ipcRenderer } = require("electron");

// Expose a safe API to the renderer process (the index.html file)
// This allows the frontend to request system-level actions (like setting wallpaper)
// without having direct access to Node.js modules.
contextBridge.exposeInMainWorld("electronAPI", {
  // Function to send a request to the main process to set the wallpaper
  setWallpaper: (url, title) =>
    ipcRenderer.send("set-wallpaper-request", url, title),

  // Function to listen for status updates (success/error) from the main process
  onWallpaperStatus: (callback) =>
    ipcRenderer.on("wallpaper-status", (event, type, message) =>
      callback(type, message)
    ),
});
