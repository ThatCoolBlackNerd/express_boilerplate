const express = require('express');
const helmet = require('helmet');
const error = require('../middleware/error');

module.exports = function (app) { 
    app.use(express.json());
    app.use(error);
    app.use(helmet());
    // app.use('/api/...., route)
}