//package de cryptage
const bcrypt = require('bcrypt');

const User = require('../models/user');

const jwt = require('jsonwebtoken');


//1ère fonction signup va enregistrer nvx utilisateurs
//crypte mot de passe 
//prend le mess crypt va crée un new user + mail 
//va enregistrer cet utilisateur dans la bdd
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

//2ème fonction login pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
    //findOne va trouver 1 utilistateur ac mail correspondant au mail entré
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
            //si pas bon erreur
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //bcypt va comparer le mdp avec l'utilisateur qui vient de se connecter et le hash de la bdd
        bcrypt.compare(req.body.password, user.password)
        //boolean pr savoir si comparaison des mdp valable ou non
          .then(valid => {
            if (!valid) {
                //false, pas bon
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            //true, renvoi une requête ok + renvoi objet json userId et token
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
              { userId: user._id },
              'RANDOM_SECRET_KEY',
              { expiresIn: '24h' }
              )
            })
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };