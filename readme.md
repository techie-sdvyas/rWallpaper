# 🖼️ rWallpaper - Reddit Wallpaper Desktop Browser

A cross-platform desktop application built with Electron, HTML,and JavaScript that allows users to browse high-resolution wallpapers from popular Reddit subreddits and instantly set them as their desktop background.

---

## ✨ Features

* **Subreddit Browsing:** Quickly select from a curated list of popular wallpaper subreddits (e.g., `r/wallpapers`, `r/EarthPorn`).

* **Filtering:** Sort posts by **Hot**, **New**, and **Top**.

* **Pagination:** Load more results seamlessly with the "Load More" button.

* **Gallery Support:** Correctly parses and displays individual images from multi-image Reddit gallery posts.

* **Desktop Integration:** Directly downloads and sets the high-resolution image as the desktop wallpaper using system-level Node.js modules (`wallpaper`).

* **Responsive UI:** A clean, modern, and dark-themed interface built with Tailwind CSS.

## 🛠️ Technology Stack

* **Electron:** Provides the desktop application container and handles system integration.

* **HTML/CSS/JavaScript:** The core frontend stack (**Vanilla JS** for DOM manipulation and API calls).

* **Tailwind CSS:** Used for fast, responsive, and aesthetic styling.

* **Reddit API (Public):** Used to fetch post data (no authentication required).

* **Node.js Modules:**

    * `wallpaper`: Handles setting the desktop background across different operating systems.

    * `https`, `fs`, `path`: Used for securely downloading images and managing temporary files.

## 🚀 Getting Started

To get this application running locally, follow these steps.

### Prerequisites

You must have **Node.js** (which includes `npm`) installed on your system.

### Installation

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/yourusername/rwallpaper.git](https://github.com/yourusername/rwallpaper.git)
    cd rwallpaper
    ```

2.  **Save Project Files:** Ensure the following files are present in the root directory:

    * `index.html` (The UI/Renderer process)

    * `main.js` (The Electron Main process logic)

    * `preload.js` (The security bridge)

    * `package.json` (The configuration file)

3.  **Install Dependencies:**

    ```bash
    npm install
    ```

### Running the Application

Start the Electron application using the `npm start` command:

```bash
npm start