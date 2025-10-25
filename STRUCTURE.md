# Project Structure

```
source/
├── index.html              # Markup only; links external assets and modules
├── STRUCTURE.md            # Directory overview (this file)
├── classic.html            # Simplified flowchart (optional reference)
├── assets/
│   ├── css/
│   │   └── main.css        # Styles extracted from the original SPA
│   ├── data/
│   │   └── flow-data.js    # Decision tree with bilingual content
│   ├── js/
│   │   ├── app.js          # Application logic and UI state management
│   │   └── vendor/
│   │       └── yandex-metrika.js  # Analytics snippet (optional)
│   └── lang/
│       └── translations.js  # UI copy and helper strings per language
└── README.md               # Usage notes for the standalone source package
```

## Notes
- `app.js` imports data and translations as ES modules, so the app can be served statically by any HTTP server with module support.
- To remove analytics, delete the vendor script and script tag from `index.html`.
- Language files can be expanded or replaced to support additional locales.
