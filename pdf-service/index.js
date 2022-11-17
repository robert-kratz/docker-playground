const express = require('express');
const app = express();

const fs = require('fs');

const PORT = process.env.PORT || 8001;

app.use('/invoice', express.static('./invoice'));

app.get('/create', (req, res) => {
    const name = new Date().getTime() + '.txt'

    fs.writeFile(
        `./invoice/${name}`,
        'Hello World on ' + new Date().toString(),
        (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error creating the file');
            } else {
                res.status(201).json({message: 'File created: ' + name});
            }
        }
    );
    
});

app.listen(PORT, () => {
    if (!fs.existsSync('./invoice')) {
        fs.mkdirSync('./invoice');
    }

    console.log(`PDF listening on port http://localhost:${PORT}`);
});