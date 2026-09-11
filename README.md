# Learn Latin

An iPhone/iPad-friendly Latin grammar coach for Sai and a parent to learn together.

## Features

### Beginner-first revision

Word roles now progresses through six small stages: noun, verb, adjective, adverb, subject and object. Each has 24 annotated sentences. Learners tap actual words; after answering, every word can be explored by type and sentence job. Two valid nouns in one sentence are both accepted. Help and optional device read-aloud support readers. Unseen later questions introduce vocabulary before a supported first try.

Rounds contain unique sentences and prefer material outside the last 12 answers. Small banks create shorter rounds rather than duplicate fillers. Every answer snapshots an unfinished session immediately; Progress includes partial sessions, topic filtering and individual timings. Historical unfinished rounds from the old version were never saved and cannot be recovered. Timing is observational, not a progression gate. Supported answers do not count as independent mastery.

Firebase sync merges session history transactionally instead of replacing another device's history. Cloud snapshots retain the most recent 200 sessions; the local export retains local history. Parent sign-in is required; no security rules are relaxed. Run `node tests/regression.cjs` for the beginner-flow regression checks.

- Plain-English grammar guide covering word roles, cases, adjective agreement, verb tenses, conjugations and infinitives
- Six-foundations learning path and printable worksheet
- Mixed, focused and speed practice with varied answer positions
- Response-time, accuracy, confidence and error analytics
- Question-by-question replay
- Spaced repetition stored locally, with optional Firebase Firestore sync
- Suggested four-week learning plan

Open `index.html` or visit the GitHub Pages deployment.

## Firebase sync

The app works offline without configuration. Open **More > Sync & data** and sign in with the same parent Firebase account used by KKSyllabus. The public web configuration is shared with that app; the password is never stored by Learn Latin. Firestore records are written below `families/{ownerUid}/learners/sai-latin` using the existing owner-only security rules.

## Deployment

GitHub Pages can serve the repository root from the `main` branch. No build step is required.
