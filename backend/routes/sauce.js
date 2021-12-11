//ROUTEUR -logique de rooting

const express = require('express');

const auth = require('../middleware/auth')

const multer = require('../middleware/multer-config')

//express.router permet de créer des routeurs séparés pour chaque route ppale de l'appli
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

// ces routes vont appliquer la fonction qui lui est associée
//protection de la route en ajoutant le middleware auth avant d'autoriser l'envoi des requêtes
//multer pour les images 
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;