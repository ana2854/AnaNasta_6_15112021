//Modèle de données pour les utilisateurs 

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//validateur appliqué au schéma avant d'en faire un modèle, pas possible d'avoir un ut avec plusieurs addresses mails
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);