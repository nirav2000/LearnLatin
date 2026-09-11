# Learn Latin

An iPhone/iPad-friendly Latin grammar coach for Sai and a parent to learn together.

## Features

- Plain-English grammar guide covering word roles, cases, adjective agreement, verb tenses, conjugations and infinitives
- Six-foundations learning path and printable worksheet
- Mixed, focused and speed practice with varied answer positions
- Response-time, accuracy, confidence and error analytics
- Question-by-question replay
- Spaced repetition stored locally, with optional Firebase Firestore sync
- Suggested four-week learning plan

Open `index.html` or visit the GitHub Pages deployment.

## Firebase sync

The app works offline without configuration. Open **More > Sync & data** and paste the Firebase web configuration from the KKSyllabus Firebase project. The configuration is stored only on that device. Firestore records are written below `learnLatinLearners/{learnerCode}`.

## Deployment

GitHub Pages can serve the repository root from the `main` branch. No build step is required.
