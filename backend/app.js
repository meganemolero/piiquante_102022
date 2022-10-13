/*Connexion à Express*/
const express = require ('express');

/*Connexion à Mongoose/Mongo DB*/
const mongoose = require('mongoose');

/*Mise en place des variables environnement grâce à dotenv*/
const dotenv = require('dotenv');
dotenv.config();

/*Connexion aux différentes routes*/
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const path = require('path');

/*Lien entre notre app et express*/
const app = express();

/*Connexion à notre compte mongoDB*/
mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.CLUSTER_DB}.ygrc7wo.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

/*CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;

