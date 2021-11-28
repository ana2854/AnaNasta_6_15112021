//ROUTEUR -logique de rooting

const express = require('express');

//express.router permet de créer des routeurs séparés pour chaque route ppale de l'appli
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// ces routes vont appliquer la fonction qui lui est associée
router.get('/', stuffCtrl.getAllStuff);
router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);

module.exports = router;