//Modèle de données pour les utilisateurs avec mongoose

//on importe mongoose
const mongoose = require('mongoose');

//plugin unique validator 
const uniqueValidator = require('mongoose-unique-validator');

//création du schéma 
const userSchema = mongoose.Schema({

  //impossible pour l'utilisateur de s'inscrire plusieurs fois ac plusieurs mails
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//validateur appliqué au schéma avant d'en faire un modèle, pas possible d'avoir un ut avec la même adresse mail 
userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);