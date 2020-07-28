const express = require('express');
const app = express();
const db = require('./models');
db.sequelize.sync();

const path = require('path');
var exphbs = require('express-handlebars');
var hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const content_router = require('./routes/content.route.js');
const admin_router = require('./routes/admin.route.js');

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
    }
));

app.use(express.static('public'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get('/', (req,res)=>{
    res.render('home');
});


app.use('/admin', admin_router);
app.use('/content', content_router);

app.listen(port);
console.log(`server was started on port: ${port} ...`);