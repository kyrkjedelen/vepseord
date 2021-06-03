const express = require('express');
const app = express();
const server = {
    port = 6969
}

app.use(express.static('public'));