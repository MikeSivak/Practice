const express = require('express');
const app = express();
const db = require('./models');
db.sequelize.sync();
const auth = require('./middleware/auth');

const path = require('path');
var exphbs = require('express-handlebars');
var hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const content_router = require('./routes/content.route.js');
const admin_router = require('./routes/admin.route.js');
const register_router = require('./routes/register.route.js');
const order_router = require('./routes/order.route');

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

app.use('/auth', require('./routes/auth.route'));

app.get('/', (req,res)=>{
    res.render('home');
});

app.get('/login', (req,res)=>{
    res.render('login');
});

app.use('/register', register_router);

app.use('/order', auth, (req,res,next)=>{
    if(req.user.id_role == 1){
        next();
    }
    else{
        res.render('home');
    }
}, order_router);

app.use('/admin', auth, (req,res,next)=>{
    if(req.user.id_role == 1){
        next();
    }
    else{
        res.render('home');
    }
}, admin_router);

app.use('/content', content_router);

app.listen(port);
console.log(`server was started on port: ${port} ...`);