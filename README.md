# Interactive Polymer Flow Map (Source Package)

This directory contains a modularised version of the polymer identification tool, ready to be published as a standalone open-source repository. Markup, styles, application logic, translations, and third-party snippets now live in separate files for easier maintenance.

## Quick Start
1. Serve the folder with any static HTTP server (for example `python3 -m http.server`) to avoid module loading restrictions.
2. Open `http://localhost:8000/source/index.html` (adjust the port and path if you host elsewhere).
3. Use the language toggle to switch between Russian and English, explore the flowchart, and review the classic fallback via `classic.html`.

## Node.js Server
1. Ensure Node.js 14+ is installed.
2. Run `node server.js` from the project root. Override `PORT` and `HOST` if needed (for example, `PORT=8080 node server.js`).
3. Open `http://localhost:3000` (or your chosen port) to view the map.

## Customisation
- **Styles**: Edit `assets/css/main.css` to tweak layout, theming, or responsive rules.
- **Translations**: Extend `assets/lang/translations.js` with additional locales. Pair it with `assets/data/flow-data.js` to add translated nodes.
- **Flow Logic**: Update `assets/data/flow-data.js` to add or edit decision points and materials.
- **Vendor Scripts**: Remove or replace `assets/js/vendor/yandex-metrika.js` if you do not need analytics.

For a directory overview, see `STRUCTURE.md`.
