Changes made so far

1) Documentation
- Updated `README.md` Project Structure to match current workspace and files.

2) Typing test mechanics
- Reworked `useTypingTracker` to be a timed test (15s, 30s, 60s, 120s).
- WPM now computed strictly from elapsed time; finalized on completion.
- Added countdown and duration selector in `TypingBox`.

3) Fixes
- Fixed stale WPM updates by using refs and final calculation on completion.

Next steps requested
- Remove accuracy/errors from the Typing Test page UI.
- After time completion, auto-open Progress with latest stats.
- Move typing tips and achievement goals from Progress to Home and keep charts on Progress.

