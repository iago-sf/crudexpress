const express = require('express');
const app = express();

app.use(express.urlencoded());

const Index = require('./routes/index.routes');
const City = require('./routes/city.routes');
const Country = require('./routes/country.routes');
const User = require('./routes/user.routes');

app.use('/', Index);
app.use(['/city', '/cities', '/ciudad', '/ciudades'], City);
app.use(['/country', '/countries', '/pais', '/paises'], Country);
app.use('/', User);

module.exports = app