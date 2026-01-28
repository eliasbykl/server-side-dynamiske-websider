const express = require('express');
const app = express();

app.get('/her', (req, res) => {
    res.send(`
        <h1>Her er en overskrift</h1>
        <p>Og her er en paragraf</p>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});