const express = require('express');
const app = express();

app.get('/her', (req, res) => {
    res.send(`
        <h1>Her er en overskrift</h1>
        <p>Og her er en paragraf</p>
    `);
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

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});