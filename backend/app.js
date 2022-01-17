//Application Express

const express = require("express");

const mongoose = require("mongoose");

//importation de path pour accéder au chemin de notre système de fichier
const path = require("path");

//importation du routeur - routes/sauce.js
const sauceRoutes = require("./routes/sauce");

//importation du routeur correspondant aux utilisateurs
const userRoutes = require("./routes/user");




const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://user700:0Jv1ivdWb5@cluster0.gk6zl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connexion à MongoDb réussi");
    }
  }
);

//le CORS définit comment les serveurs et les navigateurs interagissent en spécifiant quelles ressources peuvent être demandées
//app.use permet d'accéder d'attribuer un middleware à une route spécifique de mon app
//middleware avec des headers permettant d'accéder à notre api depuis n'importe quelle origine
//+ headers permettant d'ajouter des headers mentionnés aux requêtes envoyées vers notre API
//+ headers permettant d'envoyer des requêtes avec les méthodes mentionnées GET POST
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//pour cette route on utilise le routeur sauceRoutes URL
app.use("/api/sauces", sauceRoutes);

//pour cette route on utilise le routeur userRoutes -lié à l'authentification
app.use("/api/auth", userRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));





module.exports = app;
