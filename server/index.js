
const express = require('express');
const cors = require('cors'); // Import the 'cors' package
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors({}));

app.get('/cars', (req, res) => {
    fs.readFile('./data/cars.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        try {
            const cars = JSON.parse(data);
            res.json(cars);
        } catch (parseError) {
            console.error(parseError);
            res.status(500).json({ error: 'Data parsing error' });
        }
    });

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});