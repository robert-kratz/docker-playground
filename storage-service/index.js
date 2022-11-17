const axios = require('axios').default;
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8002;

app.get('/', async (req, res) => {

    fetch('http://pdf-service:8001/create')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Error connecting to the Microservice 1');
    });
});

app.get('/invoice/:id', async (req, res) => {

    const id = req.params.id;

    const forbidden = ['..', '/', '\\'];

    for (let i = 0; i < forbidden.length; i++) {
        if (id.includes(forbidden[i])) {
            res.status(403).send('Forbidden');
            return;
        }
    }

    fetch(`http://pdf-service:8001/invoice/${id}`)
        .then(response => response.text())
        .then(data => {
            console.log(data);
            res.send(data);
        }).catch(err => {
            console.log(err);
            res.status(500).send('Record not found');
        });

});

app.listen(PORT, () => {
    console.log(`Service listening on port ${PORT}`);
});