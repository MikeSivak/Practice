const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    if (!email || !password || !phone) {
        res.render('register', {
            title: 'Fill the all fields!'
        });
    } else {
        let newUser = new User({
            user_login: email,
            user_phone: phone,
            id_role: 2,
            user_password: password
        });
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.user_password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }

                newUser.user_password = hash;
                console.log('EEEEE: ' + newUser.id_role);
                User
                    .create({
                        // id: 77,
                        user_login: newUser.user_login,
                        user_phone: newUser.user_phone,
                        id_role: newUser.id_role,
                        user_password: newUser.user_password
                    })
                    .then(
                        res.redirect("/login"),
                    );
            });
        });
    }
}