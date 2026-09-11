# Learn Latin

An iPhone/iPad-friendly Latin grammar coach for Sai and a parent to learn together.

## 4.0.0

- Practice is capped at five questions and may finish after three fluent,
  independent answers across different sentence patterns.
- Role sentences vary the verb position and later introduce determiners,
  pronouns and prepositions.
- Word detail distinguishes type hierarchy (`determiner > article`) from a
  sentence job (`Job: subject`).
- Visual history includes a licensed Lazio map, century blocks and plain
  explanations of Mesopotamia, millennia, medieval centuries and Germanic
  languages.
- English-first comparisons align English, Latin and French for word order,
  agreement and verb person.
- Notes are editable, archivable and linked to release notes. After the first
  Firebase sign-in, authentication persists and the app automatically merges
  notes, drafts, settings, progress and interaction recordings in Firestore.

## Features

### Beginner-first revision

Word roles now progresses through six small stages: noun, verb, adjective, adverb, subject and object. Each has 24 annotated sentences. Learners tap actual words; after answering, every word can be explored by type and sentence job. Two valid nouns in one sentence are both accepted. Help and optional device read-aloud support readers. Unseen later questions introduce vocabulary before a supported first try.

Rounds contain unique sentences and prefer material outside the last 12 answers. Small banks create shorter rounds rather than duplicate fillers. Every answer snapshots an unfinished session immediately; Progress includes partial sessions, topic filtering and individual timings. Historical unfinished rounds from the old version were never saved and cannot be recovered. Timing is observational, not a progression gate. Supported answers do not count as independent mastery.

Firebase sync merges records transactionally instead of replacing another device's history. Version 4 migrates older session bundles into individual Firestore records rather than silently dropping old recordings. Parent sign-in is required; no security rules are relaxed. Run `node tests/regression.cjs` for the beginner-flow regression checks.

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
