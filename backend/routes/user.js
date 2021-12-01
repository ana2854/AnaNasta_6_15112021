//importation d'express pour crée un routeur 
const express = require('express');

//création du routeur ac la fonction routeur d'express
const router = express.Router();

//on associe le controleur qui est associé aux differentes routes 
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

//on exporte ce routeur 
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//routes POST -car le front end va envoyer des infos -mails et mdp
// signup
// login
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;