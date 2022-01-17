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
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  const filename = sauce.imageUrl.split("/images/")[1];
  fs.unlink(`images/${filename}`, () => {
    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
      .catch((error) => res.status(400).json({ error }));
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
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => {


    if (req.body.likes == 1) {
      sauce.likes += 1;
      sauce.usersLiked.push(req.body.userId);

    } else if ((req.body.likes = 0)) {

      for (let i = 0; i < sauce.usersLiked.length; i++) {
        if (sauce.usersLiked[i] == req.body.userId) {
          sauce.likes -= 1;
          sauce.usersLiked.splice(i, 1);
        }
  
        for (let i = 0; i < sauce.usersDisliked.length; i++) {
          if (sauce.usersDisLiked[i] == req.body.userId) {
            sauce.likes -= 1;
            sauce.usersDisLiked.splice(i, 1);
          }
        }
      }
    } else if ((req.body.likes = -1)) {
      sauce.dislikes += 1;
      sauce.usersDisliked.push(req.body.userId);
    }

    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauce, _id: req.params.id }
    )

    res.status(200);

  })

  .catch((error) => {
    res.status(400).json({
      error: error,
    })
  });
}
;


/*
exports.evaluateSauce = (req, res, next) => {
  if (req.body.like === 1) { // si l'utilisateur aime la sauce //
      Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } }) // on ajoute 1 like et on le push l'array usersLiked //
          .then((sauce) => res.status(200).json({ message: 'Un like de plus !' }))
          .catch(error => res.status(400).json({ error }));
  } else if (req.body.like === -1) { // sinon si il aime pas la sauce //
      Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } }) // on ajoute 1 dislike et on le push l'array usersDisliked //
          .then((sauce) => res.status(200).json({ message: 'Un dislike de plus !' }))
          .catch(error => res.status(400).json({ error }));
  } else { // si l'utilisateur enleve son vote
      Sauce.findOne({ _id: req.params.id })
          .then(sauce => {
              if (sauce.usersLiked.includes(req.body.userId)) { // si l'array userLiked contient le id de like //
                  Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }) // $pull : ça vide l'array userLiked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like//
                      .then((sauce) => { res.status(200).json({ message: 'Un like de moins !' }) })
                      .catch(error => res.status(400).json({ error }))
              } else if (sauce.usersDisliked.includes(req.body.userId)) { //// si l'array userDisliked contient le id de like //
                  Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })// $pull : ça vide l'array userDisliked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like//
                      .then((sauce) => { res.status(200).json({ message: 'Un dislike de moins !' }) })
                      .catch(error => res.status(400).json({ error }))
              }
          })
          .catch(error => res.status(400).json({ error }));
  }
};
*/