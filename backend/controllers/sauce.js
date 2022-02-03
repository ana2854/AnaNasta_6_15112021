//CONTROLEUR FINAL- stocke toute la logique de métier , exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité de l'appli

//importation du modèle d'une sauce
const Sauce = require("../models/sauce");

//importation du package fs de node
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  console.log(req.body.sauce);
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => {
      console.log(error);

      res.status(400).json({ error });
    });
};

//route pour récupérer une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//route pour modifier une sauce

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,}
    : { ...req.body };

  const filename = sauce.imageUrl.split("/images/")[1];
  fs.unlink(`images/${filename}`, () => {
    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
      .catch((error) => res.status(403).json({ error }));
  });
};

//route pour supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      //fonction callback - agit qd action précédente terminée
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//route pour récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//méthode like / dislike

exports.evaluateSauce = (req, res, next) => {

  let userId = req.body.userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
    
      //L'utilisateur like une sauce
      if (req.body.likes == 1) {
       
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: userId },
            _id: req.params.id,
          }
        )

          .then(() => res.status(200).json({ message: "Mise à jour !" }))
          .catch((error) => res.status(400).json({ error }));
      

      } else if ((req.body.likes = 0)) {
        for (let i = 0; i < sauce.usersLiked.length; i++) {
          if (sauce.usersLiked[i] == req.body.userId) {
          
            //l'utilisateur annule son like
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: userId },
                _id: req.params.id,
              }
            )

              .then(() => res.status(200).json({ message: "Mise à jour !" }))
              .catch((error) => res.status(400).json({ error }));
          }

          for (let i = 0; i < sauce.usersDisliked.length; i++) {
            if (sauce.usersDisLiked[i] == req.body.userId) {
            
              //l'utilisateur annule son dislike 
              Sauce.updateOne(
                { _id: req.params.id },
                {
                  $inc: { likes: -1 },
                  $pull: { usersDisLiked: userId },
                  _id: req.params.id,
                }
              )
            
              .then(() => res.status(200).json({ message: "Mise à jour !" }))
              .catch((error) => res.status(400).json({ error }));

            }
          }
        }
      } else if ((req.body.likes = -1)) {
        
        //l'utilisateur dislike une sauce
        Sauce.updateOne (
          {_id: req.params.id},
          {
          $inc: { dislikes: 1},
          $push: { usersDisliked : userId},
          _id : req.params.id,
        }
        )

        .then(() => res.status(200).json({ message: "Mise à jour !" }))
        .catch((error) => res.status(400).json({ error }));
      }
    })

    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: error,
      });
    });
};
