# Interface releases

- 4.0.0 (11 September 2026): varied short practice, extended word groups,
  visual history, English/Latin/French comparisons, resolved-note release links,
  editable drafts, automatic reconnection and complete item-by-item cloud records.
- 3.0.1: unscored exploration in history totals and improved replay labels and
  wide-screen layout; preserved as the interface reviewed in the 4.0.0 cycle.

- 3.0.0 (11 September 2026): gradual whole-sentence exploration, all matching nouns,
  calm activity ending, pointer/touch event replay, reusable feedback and Latin context.
- 2.0.0: snapshot of ce5344bbedc4e501ea4ec23128fde9619be65c1c: first word-button
  interaction, expanded roles bank and immediate session saving.
- 1.0.0: snapshot of 80f228c81a2b33b82481d8d3900509565ba5e747: earlier answer cards.

Archives are interface snapshots, with only a banner, isolated storage, disabled cloud
sync and corrected resource links. They do not import current progress. Current code
continues to evolve independently. Git commits identify every subsequent correction.

# Reusable feedback

Copy feedback.js and the .notes-* styles into another static app. Include:

```html
<script type="module" src="feedback.js" data-repository="OWNER/REPO" data-version="1.0.0"></script>
```

Notes work in normal or developer use. Saving is device-local; submitting opens a
GitHub issue for the user to review and submit. No child progress or pointer traces
are attached. This public issue step requires GitHub sign-in.

The app-feedback workflow checks new owner-authored [App feedback] issues, implements
a bounded correction, runs tests and commits to main, then deploys Pages. It requires
an OPENAI_API_KEY repository Actions secret (separate API billing). Without that secret,
it records that setup is pending and makes no claim of AI review. It does not poll local
draft notes. Older issues can be retried through workflow_dispatch. Larger requests
outside the supported files need a normal development session.

# Recording

New attempts record sampled pointer positions and clicks within the question area,
including taps on touch devices. Keyboard clicks are represented by their target.
Up to 350 events per question limit storage. The viewer maps targets to the current
layout: it is an event replay, not a pixel-perfect screen video or an eye tracker.
Older attempts have no movements to replay. Replay never submits answers or changes
mastery. Try question creates a new attempt. Recordings remain with progress and use
the same owner-only Firebase sync when connected. Do not infer ability from pointer
hesitation alone; it can reflect reading, thinking, distraction or interface confusion.
