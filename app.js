const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5dc4a8f0a010e91ddc7bba4e')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb://127.0.0.1:27017/shop', { useNewUrlParser:
true }).then(result => {
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: 'Ezekiel',
        email: 'ezekiel@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  })
  app.listen(3800);
  console.log('Connected to server');
})
.catch(err => {
  console.log(err);
})




