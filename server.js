const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const app = express();


//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//panggil routes
var routes = require('./routes');
routes(app);

//daftarkan routes baru dari folder middleware
app.use('/auth', require('./middleware'));

app.listen(3000, () => {
    console.log('Server started on port');
});