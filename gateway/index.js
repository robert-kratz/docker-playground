const express = require('express');
const app = express();

const proxy = require('express-http-proxy');

const PORT = process.env.PORT || 8000;

const errorHandler = (err, res, next) => {
    console.log(err);
    res.status(500).send('Error connecting to the Microservice 1');
};

// app.use('/pdf', proxy('http://pdf-service:8001', {
//     proxyErrorHandler: errorHandler
// }));

app.use('/service', proxy('http://storage-service:8002', {
    proxyErrorHandler: errorHandler
}));

app.use('/', (req, res) => {
    res.send('Hello from the gateway');
});

app.listen(PORT, () => {
    console.log(`Gateway listening on port ${PORT}`);
}).on('error', (err) => {
    console.log('Gateway error', err);
});