const express = require('express');
const path = require('path');
const sqlite = require('sqlite-sync');

const app = express();

// Sett opp database
sqlite.connect('database.db');

// --- Tabell: users ---
sqlite.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        navn TEXT
    )
`);
const usersCount = sqlite.run('SELECT COUNT(*) AS count FROM users');
if (usersCount[0].count === 0) {
    sqlite.run("INSERT INTO users (navn) VALUES ('Emma Hansen Fra DB')");
    sqlite.run("INSERT INTO users (navn) VALUES ('Jonas Olsen Fra DB')");
    sqlite.run("INSERT INTO users (navn) VALUES ('Maria Andersen Fra DB')");
    sqlite.run("INSERT INTO users (navn) VALUES ('Kai Johansen Fra DB')");
}

// --- Tabell: bilmerker (Oppgave 1 og 2) ---
sqlite.run(`
    CREATE TABLE IF NOT EXISTS bilmerker (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        merke TEXT
    )
`);
const bilmerkerCount = sqlite.run('SELECT COUNT(*) AS count FROM bilmerker');
if (bilmerkerCount[0].count === 0) {
    sqlite.run("INSERT INTO bilmerker (merke) VALUES ('Toyota')");
    sqlite.run("INSERT INTO bilmerker (merke) VALUES ('Volkswagen')");
    sqlite.run("INSERT INTO bilmerker (merke) VALUES ('BMW')");
    sqlite.run("INSERT INTO bilmerker (merke) VALUES ('Tesla')");
    sqlite.run("INSERT INTO bilmerker (merke) VALUES ('Ford')");
}

// --- Tabeller: filmer, skuespillere, skuespiller_i_film (Oppgave 4) ---
sqlite.run(`
    CREATE TABLE IF NOT EXISTS filmer (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tittel TEXT NOT NULL
    )
`);
sqlite.run(`
    CREATE TABLE IF NOT EXISTS skuespillere (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        navn TEXT NOT NULL
    )
`);
sqlite.run(`
    CREATE TABLE IF NOT EXISTS skuespiller_i_film (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        skuespiller_id INTEGER NOT NULL,
        film_id INTEGER NOT NULL,
        FOREIGN KEY (skuespiller_id) REFERENCES skuespillere(id),
        FOREIGN KEY (film_id) REFERENCES filmer(id)
    )
`);
const filmerCount = sqlite.run('SELECT COUNT(*) AS count FROM filmer');
if (filmerCount[0].count === 0) {
    sqlite.run("INSERT INTO filmer (tittel) VALUES ('The Matrix')");
    sqlite.run("INSERT INTO filmer (tittel) VALUES ('The Matrix Reloaded')");
    sqlite.run("INSERT INTO filmer (tittel) VALUES ('The Matrix Revolutions')");

    sqlite.run("INSERT INTO skuespillere (navn) VALUES ('Keanu Reeves')");
    sqlite.run("INSERT INTO skuespillere (navn) VALUES ('Laurence Fishburne')");
    sqlite.run("INSERT INTO skuespillere (navn) VALUES ('Carrie-Anne Moss')");

    // Alle tre skuespillere er med i alle tre filmene
    for (let film_id = 1; film_id <= 3; film_id++) {
        for (let skuespiller_id = 1; skuespiller_id <= 3; skuespiller_id++) {
            sqlite.run(`INSERT INTO skuespiller_i_film (skuespiller_id, film_id) VALUES (${skuespiller_id}, ${film_id})`);
        }
    }
}

// --- Statiske filer fra public-mappen (Oppgave 3) ---
app.use(express.static('public'));

// --- Ruter ---

app.get('/her', (req, res) => {
    res.send(`
        <h1>Her er en overskrift</h1>
        <p>Og her er en paragraf</p>
    `);
});

app.get('/', (req, res) => {
    res.redirect('/deltagere-1');
});

app.get('/deltagere-1', (req, res) => {
    res.send(`
        <h1>Elever i klassen</h1>
        <ul>
            <li>Emma Hansen</li>
            <li>Jonas Olsen</li>
            <li>Maria Andersen</li>
            <li>Kai Johansen</li>
        </ul>
    `);
});

app.get('/json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data.json'));
});

app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'side.html'));
});

app.get('/deltagere-2', (req, res) => {
    const users = sqlite.run('SELECT * FROM users');
    let html = `<h1>Elever fra databasen</h1><ul>`;
    for (const user of users) {
        html += `<li>${user.navn} (ID: ${user.id})</li>`;
    }
    html += `</ul>`;
    res.send(html);
});

// Oppgave 1: bilmerker som HTML
app.get('/bilmerker', (req, res) => {
    const merker = sqlite.run('SELECT * FROM bilmerker');
    let html = `<h1>Bilmerker</h1><ul>`;
    for (const bil of merker) {
        html += `<li>${bil.merke} (ID: ${bil.id})</li>`;
    }
    html += `</ul>`;
    res.send(html);
});

// Oppgave 2: bilmerker som JSON
app.get('/bilmerker-json', (req, res) => {
    const merker = sqlite.run('SELECT * FROM bilmerker');
    res.json(merker);
});

// Oppgave 4: skuespillere og filmer som HTML
app.get('/skuespillere-og-filmer', (req, res) => {
    const rows = sqlite.run(`
        SELECT skuespillere.navn, filmer.tittel
        FROM skuespiller_i_film
        JOIN skuespillere ON skuespiller_i_film.skuespiller_id = skuespillere.id
        JOIN filmer ON skuespiller_i_film.film_id = filmer.id
        ORDER BY skuespillere.navn, filmer.tittel
    `);
    let html = `<h1>Skuespillere og filmer</h1><ul>`;
    for (const row of rows) {
        html += `<li>${row.navn} &mdash; ${row.tittel}</li>`;
    }
    html += `</ul>`;
    res.send(html);
});

// Oppgave 4: skuespillere og filmer som JSON
app.get('/skuespillere-og-filmer-json', (req, res) => {
    const rows = sqlite.run(`
        SELECT skuespillere.navn AS skuespiller, filmer.tittel AS film
        FROM skuespiller_i_film
        JOIN skuespillere ON skuespiller_i_film.skuespiller_id = skuespillere.id
        JOIN filmer ON skuespiller_i_film.film_id = filmer.id
        ORDER BY skuespillere.navn, filmer.tittel
    `);
    // Hvis sqlite-sync ignorerer alias, mapp manuelt
    const mapped = rows.map(r => ({
        skuespiller: r.skuespiller || r.navn,
        film: r.film || r.tittel
    }));
    res.json(mapped);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});