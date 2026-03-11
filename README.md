# server-side-dynamiske-websider

Et Express.js-prosjekt med SQLite-database for å lære server-side utvikling.

---

## 🚀 Slik starter du serveren

Åpne terminalen i prosjektmappen og kjør én av disse:

```bash
# Vanlig start (uten auto-reload)
npm run serve

# Utviklingsmodus med auto-reload (anbefalt)
npm run dev
```

Serveren starter på **http://localhost:3000**

> 💡 Med `npm run dev` (nodemon) starter serveren automatisk på nytt hver gang du lagrer en fil.

---

## 📋 Alle oppgaver og ruter

### Grunnoppsett – Deltagere

| URL | Beskrivelse |
|-----|-------------|
| [/deltagere-1](http://localhost:3000/deltagere-1) | Elever hardkodet direkte i JavaScript (statisk HTML) |
| [/deltagere-2](http://localhost:3000/deltagere-2) | Elever hentet fra SQLite-databasen |
| [/json](http://localhost:3000/json) | Returnerer `data.json`-filen |
| [/html](http://localhost:3000/html) | Returnerer `side.html` via `res.sendFile()` |

---

### Oppgave 1 – Bilmerker som HTML

Henter bilmerker fra databasen og viser dem som en HTML-liste.

👉 [http://localhost:3000/bilmerker](http://localhost:3000/bilmerker)

---

### Oppgave 2 – Bilmerker som JSON

Henter bilmerker fra databasen og returnerer dem som JSON.

👉 [http://localhost:3000/bilmerker-json](http://localhost:3000/bilmerker-json)

---

### Oppgave 3 – Statiske filer og dynamiske funksjoner (AJAX/Fetch)

Sider som henter og sender data dynamisk til API-et, uten at siden laster på nytt. Filene serveres fra `public/`-mappen ved hjelp av `express.static`.

| URL | Funksjon |
|-----|----------|
| [/deltagere.html](http://localhost:3000/deltagere.html) | Registrere og vise deltagere dynamisk mot `/deltagere-json` og `/legg-til-deltager` |
| [/skuespillere.html](http://localhost:3000/skuespillere.html) | Registrere og vise skuespillere dynamisk mot `/skuespillere-json` og `/legg-til-skuespiller` |
| [/skuespillere-og-filmer.html](http://localhost:3000/skuespillere-og-filmer.html) | Viser skuespillere og filmer hentet fra API-et |

---

### Oppgave 4 – Skuespillere og filmer (JOIN)

Kobler skuespillere og filmer med en SQL JOIN mellom tre tabeller.

| URL | Beskrivelse |
|-----|-------------|
| [/skuespillere-og-filmer](http://localhost:3000/skuespillere-og-filmer) | HTML-visning direkte fra serveren |
| [/skuespillere-og-filmer-json](http://localhost:3000/skuespillere-og-filmer-json) | JSON-data (brukes av HTML-siden under) |
| [/skuespillere-og-filmer.html](http://localhost:3000/skuespillere-og-filmer.html) | HTML-side som henter data via `fetch()` |

---

## 📁 Prosjektstruktur

```text
server-side-dynamiske-websider/
├── index.js              ← Express-serveren og alle API-ruter
├── data.json             ← JSON-fil som sendes på /json
├── side.html             ← HTML-fil som sendes på /html
├── database.db           ← SQLite-databasen (lages automatisk)
├── package.json
└── public/               ← Statiske filer (servert automatisk på roten /)
    ├── deltagere.html
    ├── skuespillere.html
    └── skuespillere-og-filmer.html
```
