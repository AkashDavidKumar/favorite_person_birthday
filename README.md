# 🎂 Birthday Surprise Website

A complete, interactive, cinematic birthday surprise website built with React, Vite, Tailwind CSS v4, and Motion for React.

---

## ✨ Features

| Scene | Description |
|-------|-------------|
| 1. Secret Invitation | Animated envelope with wax seal that opens with a letter reveal |
| 2. Birthday Universe | Cinematic welcome with floating stars, clouds, and orbital decorations |
| 3. Friendship Museum | Polaroid photo gallery with lightbox, prev/next, keyboard navigation |
| 4. Best Friend Awards | Three openable gift boxes with confetti reveals |
| 5. Birthday Cake Challenge | Interactive 8-candle cake — extinguish all to make a wish |
| 6. Personal Letter | Paragraph-by-paragraph letter reveal with skip option |
| 7. Birthday Finale | Cinematic dark scene with confetti fireworks and replay controls |

---

## 🚀 Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🎨 Personalization Guide

### 1. Change the friend's name

Open `src/data/birthday.js` and change:

```js
friendName: "[FRIEND_NAME]",   // ← replace with e.g. "Priya"
```

### 2. Change your name (the sender)

```js
senderName: "[YOUR_NAME]",     // ← replace with e.g. "Aarav"
```

### 3. Edit the letter

In `src/data/birthday.js`, edit `letterParagraphs` — each string is one paragraph:

```js
letterParagraphs: [
  "Happy Birthday to one of my favourite people!",
  "Your custom message here...",
  // Add or remove paragraphs as needed
],
```

### 4. Change award messages

Open `src/data/awards.js` and edit each award's `title` and `message`.

### 5. Add personal photos

1. Copy your photo files into `public/images/memories/`
2. Open `src/data/memories.js`
3. Set the `image` field for each memory:

```js
{ id: 1, image: "photo1.jpg", caption: "Our caption", ... }
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

If `image` is `null`, a beautiful decorative placeholder is shown automatically.

### 6. Change photo captions

In `src/data/memories.js`, edit the `caption`, `date`, and `description` for each memory.

### 7. Change invitation text

In `src/data/birthday.js`, edit:
- `inviteTeaser` — the opening teaser
- `inviteSubtext` — the subtext below
- `inviteButtonText` — button label

---

## 📁 Project Structure

```
birthday-surprise/
├── public/
│   ├── favicon.svg
│   └── images/
│       └── memories/       ← Place your photos here
├── src/
│   ├── components/
│   │   ├── SceneLayout.jsx       — Shared scene wrapper
│   │   ├── ProgressIndicator.jsx — Top progress dots
│   │   ├── PrimaryButton.jsx     — Reusable button
│   │   ├── FloatingParticles.jsx — Ambient sparkle particles
│   │   ├── PolaroidCard.jsx      — Photo card component
│   │   ├── PhotoLightbox.jsx     — Accessible photo lightbox
│   │   ├── SurpriseBox.jsx       — Gift box award component
│   │   ├── BirthdayCake.jsx      — Interactive cake
│   │   ├── BirthdayCandle.jsx    — Individual candle
│   │   └── LetterCard.jsx        — Letter reveal component
│   ├── scenes/
│   │   ├── InvitationScene.jsx
│   │   ├── BirthdayWorldScene.jsx
│   │   ├── MemoryMuseumScene.jsx
│   │   ├── BestFriendAwardsScene.jsx
│   │   ├── BirthdayChallengeScene.jsx
│   │   ├── PersonalLetterScene.jsx
│   │   └── BirthdayFinaleScene.jsx
│   ├── data/
│   │   ├── birthday.js    ← All editable text content
│   │   ├── memories.js    ← Photo gallery data
│   │   └── awards.js      ← Award titles and messages
│   ├── hooks/
│   │   └── useReducedMotionPreference.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
└── package.json
```

---

## 🌐 Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository at [vercel.com](https://vercel.com) and it will auto-detect Vite.

### Netlify

```bash
npm run build
```

Then drag the `dist/` folder into [app.netlify.com/drop](https://app.netlify.com/drop).

Or connect your GitHub repository at [netlify.com](https://netlify.com):
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
"deploy": "gh-pages -d dist"
```

Then:
```bash
npm run build
npm run deploy
```

---

## 🛠️ Tech Stack

- **React** + **Vite** — fast development and builds
- **Tailwind CSS v4** — utility-first styling
- **Motion for React** (`motion/react`) — smooth animations
- **Lucide React** — icons
- **canvas-confetti** — celebration effects

---

## 📌 Items Still Needing Your Input

- [ ] Replace `[FRIEND_NAME]` with your friend's actual name
- [ ] Replace `[YOUR_NAME]` with your name
- [ ] Add personal photos to `public/images/memories/`
- [ ] Edit letter paragraphs with personal memories
- [ ] Customize award messages with inside jokes
- [ ] Update captions in `memories.js` with personal details

---

*Made with love 💜 — no backend required, no private data collected.*
