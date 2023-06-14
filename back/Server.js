const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors')
var app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

//Route for front-end
app.get('/', (req,res) => {
    res.json({message: 'Client not ready yet'})
})

require('./app/routes/Att-Histo.routes')(app);
require('./app/routes/Planning.routes')(app);
require('./app/routes/Staff.routes')(app);
require('./app/routes/FrontContent.routes')(app);
require('./app/routes/Login.routes')(app);


app.listen(3000, () => {
    console.log('server is running on port 3000')
});