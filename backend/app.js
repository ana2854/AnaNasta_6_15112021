//Application Express
const express = require("express");

require("dotenv").config();

const mongoose = require("mongoose");

//importation de path pour accéder au chemin de notre système de fichier
const path = require("path");

//importation du routeur - routes/sauce.js
const sauceRoutes = require("./routes/sauce");

//importation du routeur correspondant aux utilisateurs
const userRoutes = require("./routes/user");

const helmet = require("helmet");

const app = express();

console.log("Express app initialization...");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log("Starting MongoDB connection...");
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true,
  },
  (err) => {
    if (err) {
      console.log("MongoDB connection error:", err);
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
console.log("Configuring CORS middleware...");
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
console.log("Registering sauceRoutes middleware...");
app.use("/api/sauces", sauceRoutes);

//pour cette route on utilise le routeur userRoutes -lié à l'authentification
console.log("Registering userRoutes middleware...");
app.use("/api/auth", userRoutes);

console.log("Setting up static file serving for /images...");
app.use("/images", express.static(path.join(__dirname, "images")));

console.log("Applying helmet for security...");
app.use(helmet());

console.log("Express app setup complete. Ready to handle requests!");

module.exports = app;
