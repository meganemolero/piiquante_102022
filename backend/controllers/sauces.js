const Sauce = require('../models/Sauce');
const fs = require('fs');

/*Route creation de sauces*/
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    });
    sauce.save()
        .then(() => res.status(201).json ({message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json ({error}));
};
/*Route modification de sauce*/
exports.modifySauce =  (req, res, next) => {
    const SauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    delete SauceObject._userId;
    Sauce.findOne({ _id: req.params.id})
      .then((sauce) => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({ message : 'Non_autorisé'});
          } else {
              Sauce.updateOne({ _id: req.params.id}, {...SauceObject, _id: req.params.id})
              .then(()  => res.status(200).json ({message: 'Sauce modifiée !'}))
              .catch(error => res.status(400).json ({error}));
          }
      })
      .catch(error => res.status(400).json({ error}));     
};
/*Route suppression de sauce*/
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
      .then(sauce => {
        if (sauce.userId != req.auth.userId) {
          res.status(401).json({ message : 'Non_autorisé'});
        } else {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: req.params.id})
                .then(()  => res.status(200).json ({message: 'Sauce supprimée !'}))
                .catch(error => res.status(401).json ({error}));
          })
        }
      })
      .catch(error => res.status(500).json ({error}));
};
/*Route d'accès à une sauce en particulier*/
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id}) 
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error}));
};
/*Route d'accès à toutes les sauces*/
exports.getAllSauce =  (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json ({error}));
}
/*Route like Dislike */
exports.likeDislikeSauce = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;
    const sauceId = req.params.id;
    Sauce.findOne({ _id: sauceId})
      .then((sauces) => {
        switch(like){
          case 1 :
            /*like = 1 (likes = +1)*/
            if(!sauces.usersLiked.includes(userId) && like ===1){
              Sauce.updateOne({ _id: sauceId},
                {
                $inc: {likes: 1},
                $push: {usersLiked: userId}
                }
              )
              .then(()  => res.status(201).json ({message: "Je like"}))
              .catch(error => res.status(400).json ({error}));
            }
          break;

          case -1 :
          /*like = -1 ( dislikes 1)*/
            if(!sauces.usersDisliked.includes(userId) && like ===-1){
              Sauce.updateOne({ _id: sauceId},
                {
                $inc: {dislikes: 1},
                $push: {usersDisliked: userId}
                }
              )
              .then(()  => res.status(201).json ({message: "Je dislike"}))
              .catch(error => res.status(400).json ({error}));
            }
          break;

          case 0 :
            /*like = 0 ( likes -1)*/
            if(sauces.usersLiked.includes(userId)){
                Sauce.updateOne({ _id: sauceId},
                  {
                  $inc: {likes: -1},
                  $pull: {usersLiked: userId}
                  }
                )
                .then(()  => res.status(201).json ({message: "J'unlike"}))
                .catch(error => res.status(400).json ({error}));
            };
            /*like = 0 (dislikes -1)*/
            if(sauces.usersDisliked.includes(userId)){
                Sauce.updateOne({ _id: sauceId},
                  {
                  $inc: {dislikes: -1},
                  $pull: {usersDisliked: userId}
                  }
                )
                .then(()  => res.status(201).json ({message: "J'undislike"}))
                .catch(error => res.status(400).json ({error}));
            }
          }
      })
      .catch(error => res.status(404).json ({error}));
};    

