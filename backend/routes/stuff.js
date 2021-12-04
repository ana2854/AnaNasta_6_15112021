//ROUTEUR -logique de rooting

const express = require('express');

const auth = require('../middleware/auth')

const multer = require('../middleware/multer-config')

//express.router permet de créer des routeurs séparés pour chaque route ppale de l'appli
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// ces routes vont appliquer la fonction qui lui est associée
//protection de la route en ajoutant le middleware auth avant d'autoriser l'envoi des requêtes
//multer pour les images 
router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id',auth, stuffCtrl.deleteThing);

module.exports = router;