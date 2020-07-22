const express = require('express');
const app = express();
const db = require('./models');
db.sequelize.sync();
const path = require('path');
var exphbs = require('express-handlebars');
var hbs = require('hbs');
//const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000;
app.use(express.json({
    extended: true
}));

app.engine('.hbs', exphbs({ extname: '.hbs' }));

app.set("view engine", "hbs");

app.set('views', path.join(__dirname, '/views'));
app.engine("hbs", exphbs(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "main",
        extname: "hbs"
        // hbs: allowInsecurePrototypeAccess(hbs)
    }
));

app.use(express.static('public'));

hbs.registerPartials(path.join(__dirname, '/views/partials'));


const home_controller = require('./controllers/home.controller.js');
app.get('/tuti', (req,res)=>{
    res.render('home');
});

app.listen(port);

console.log(`server was started on port: ${port} ...`);