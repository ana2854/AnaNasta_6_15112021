//Schéma de données contenant les champs souhaités pour chaque thing

const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({

  /*
userId : {type: String, required true}
name :  {type: String, required true}
Manufacturer :  {type: String, required true}
description : {type: String, required true}
mainPepper :  {type: String, required true}
imageUrl :  {type: String, required true}
heat :  {type: Number, required true}
likes :  {type: Number, required true}
dislikes :  {type: Number, required true}
usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateurs
qui ont aimé (= liked) la sauce
usersDisliked : [ "String <userId>" ] — tableau des identifiants des
utilisateurs qui n'ont pas aimé (= disliked) la sauce

  */

  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

//On exporte ce schéma en tant que modele mongoose appelée Thing
module.exports = mongoose.model('Thing', thingSchema);