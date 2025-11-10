const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const https = require("https");
const wallpaper = require("wallpaper"); // Requires 'npm install wallpaper'

// IMPORTANT: This function handles the request from the web page (Renderer Process).
// It downloads the image and calls the OS-specific command to set the wallpaper.
const handleSetWallpaper = async (event, url, title) => {
  try {
    console.log(`Attempting to set wallpaper from: ${url}`);

    // 1. Determine a temporary download path
    const fileExtension = path.extname(url.split("?")[0]) || ".jpg";
    // Sanitize the title for use as a filename
    const safeTitle = title.replace(/[^\w\s]/gi, "_").substring(0, 50);
    const filePath = path.join(
      app.getPath("temp"),
      `${safeTitle}-${Date.now()}${fileExtension}`
    );

    // 2. Download the image file
    await downloadFile(url, filePath);

    // 3. Set the wallpaper using the Node 'wallpaper' module
    await wallpaper.set(filePath);

    // Optional: Notify the renderer process of success
    event.sender.send(
      "wallpaper-status",
      "success",
      `Wallpaper set successfully!`
    );

    // Optional: Clean up the temporary file after a delay
    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    }, 5000);
  } catch (error) {
    console.error("Failed to set wallpaper:", error);
    // Notify the renderer process of failure
    event.sender.send(
      "wallpaper-status",
      "error",
      `Failed to set wallpaper: ${error.message}`
    );
  }
};

/**
 * Downloads a file from a URL to a local path.
 * @param {string} url - The remote URL.
 * @param {string} dest - The local destination path.
 */
const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          return reject(
            new Error(`Failed to download: Status Code ${response.statusCode}`)
          );
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => reject(err)); // Delete the file async
      });
  });
};

// --- Electron Main Process Setup ---
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Use a preload script for security
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the HTML file (assuming index.html is in the same directory)
  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  // Listen for the 'set-wallpaper-request' channel from the renderer process
  ipcMain.on("set-wallpaper-request", (event, url, title) => {
    handleSetWallpaper(event, url, title);
  });

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
