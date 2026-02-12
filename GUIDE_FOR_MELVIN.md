# 🤍🌹 Valentine's Website Guide for Chinnu

This guide will help you customize and deploy your Valentine's Day surprise website.

## 📸 Step 1: Add Your Photos
The website is designed to automatically load photos if you name them correctly.

1.  **General Gallery** (`gallery.html`):
    *   Go to the `photos` folder.
    *   Add your best couple photos.
    *   **Rename them**: `1.jpg`, `2.jpg`, `3.jpg`, etc. (or .png, .jpeg).
    *   *Note:* The code currently looks for up to ~11 photos in `gallery.html`. You can increase this number by editing the `const MAX = 11;` line in `gallery.html`.

2.  **Specific Memories** (`story.html`):
    *   **Train Trip**: Put photos in `memories/train/` named `1.jpg`, `2.jpg`, etc.
    *   **Bike Ride**: Put photos in `memories/bike/` named `1.jpg`, `2.jpg`, etc.
    *   **Secret Section**: Put private photos in `memories/secret/` named `1.jpg`, `2.jpg`, etc.

## 🎵 Step 2: Add Music
1.  Find a romantic MP3 song she loves.
2.  Rename the file to `love.mp3`.
3.  Place it inside the `music` folder.
4.  It will play when she clicks "Play Music" on the Gallery page.

## 📝 Step 3: Customize the Text
Open these files in VS Code to change the messages:

*   **`index.html`**: The main title ("HEY CHINNU"). You can change the Malayalam subtitle here.
*   **`notes.html`**: This is the love letter.
    *   Look for the text inside `<div class="note">`.
    *   Edit the paragraphs `<p>...</p>` to write your own personal feelings.
    *   Update the "Promises" list `<ul>...</ul>`.
*   **`gift.html`**: The gift game.
    *   Currently, Gift 3 is the winner.
    *   You can change the winning message "You found it!" inside `gift.js` (look for `giftTitle.textContent` inside the `if (pick === WIN)` block).

## 🔒 Step 4: The Secret Password
*   In `story.html`, there is a "Secret" button.
*   It asks for a 4-digit PIN.
*   **The current PIN is `1825`** (found in `story.js`).
*   To change it: Open `story.js`, find `if (entered === "1825")`, and change `1825` to a date special to you (like her birthday or your anniversary).

## 🚀 Step 5: How to Send It to Her (Deployment)
Since this is a simple HTML website, the easiest way to share it is using **Netlify Drop** or **GitHub Pages**.

### Option A: Netlify Drop (Easiest)
1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Open your file explorer on your computer.
3.  Drag and drop the **entire `chinnu-valentine` folder** onto the web page.
4.  It will upload and give you a link (e.g., `chinnu-surprise.netlify.app`).
5.  Send her that link on Valentine's Day! 💌

### Option B: GitHub Pages (Free forever)
1.  Create a repository on GitHub.
2.  Upload all your files.
3.  Go to Settings > Pages.
4.  Select `main` branch and save.
5.  GitHub will give you a link to share.

---
**💡 Tips for the Surprise:**
*   Tell her to open the link on her phone (the site is mobile-friendly).
*   Tell her to turn up her volume for the music in the gallery.
*   Don't forget to give her the PIN for the Secret section!
