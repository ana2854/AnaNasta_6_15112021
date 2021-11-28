//Schéma de données contenant les champs souhaités pour chaque thing

const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

//On exporte ce schéma en tant que modele mongoose appelée Thing
module.exports = mongoose.model('Thing', thingSchema);