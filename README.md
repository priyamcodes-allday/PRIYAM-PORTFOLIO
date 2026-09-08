# Priyam Deb Portfolio

Frontend-only personal portfolio built with React, Vite and Tailwind CSS. No backend or API functionality is implemented.

## Run locally

```sh
cd frontend
npm install
npm run dev
```

Run `npm run build` for production, or `npm run preview` to preview the build. Deploy `frontend/dist`; configure your host to serve `index.html` for client-side routes.

## Content

- Projects: `frontend/src/data/projects.js`. Add `liveUrl` and/or `githubUrl` to enable outbound project links.
- Biography: `frontend/src/components/sections/About.jsx` and `Hero.jsx`.
- Contact: edit `frontend/src/data/contact.js` to enable email and social links. The contact form validates locally and does not send messages until a backend is connected.

## Images and resume

Place files at these paths. Missing images display intentional fallbacks.

- `frontend/public/images/profile/profile.png`
- `frontend/public/images/projects/habit-planner.png`
- `frontend/public/images/projects/nexatoken.png`
- `frontend/public/images/projects/web3-message-board.png`
- `frontend/public/images/projects/portfolio.png`
- `frontend/public/resume/priyam-deb-resume.pdf` (reserved; add a download link when supplied)

Portrait: recommended 800 × 1000 px. Project screenshots: recommended 1500 × 1200 px. Avatars: square. Fonts are loaded from Google Fonts with local sans-serif fallbacks.
