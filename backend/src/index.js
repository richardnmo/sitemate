import express from 'express';
export const app = express();
app.use(express.json());

app.get('/issues', (req, res) => {
    res.send('List of items received');
});

app.post('/issues', (req, res) => {
    const newItem = req.body;
    res.send(`Item added: ${newItem.name}`);
});

app.put('/issues/:id', (req, res) => {
    const itemId = req.params.id;
    res.send(`Item with ID ${itemId} updated`);
});

app.delete('/issues/:id', (req, res) => {
    const itemId = req.params.id;
    res.send(`Item with ID ${itemId} deleted`);
});