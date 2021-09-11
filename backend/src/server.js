const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const not404 = require('./error-handlers/404');
const not500 = require('./error-handlers/500');
const authRoutes = require('./auth/routes');
const propertyRoute = require('./routes/property');


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.get('/', (req, res) => {
    res.send('its work')
})
app.use(propertyRoute);


app.use('*', not404);
app.use(not500);

module.exports = {
    start: port => {
        if (!port) throw new Error('Missing Port');
        app.listen(port);
    }
}