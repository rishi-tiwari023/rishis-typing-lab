Changes made so far

1) Documentation
- Updated `README.md` Project Structure to match current workspace and files.

2) Typing test mechanics
- Reworked `useTypingTracker` to be a timed test (15s, 30s, 60s, 120s).
- WPM now computed strictly from elapsed time; finalized on completion.
- Added countdown and duration selector in `TypingBox`.

3) Fixes
- Fixed stale WPM updates by using refs and final calculation on completion.

4) UI updates
- Removed Accuracy and Errors from the Typing Test UI (`TypingBox`, `ProgressBar`).
- Moved Tips and Achievement Goals from `Progress` to `Home` with sliders.
- Added latest result summary (WPM, Accuracy, Errors) to `Progress` above chart.

Pending/next
- Auto-open Progress after time completion carrying the latest stats.

