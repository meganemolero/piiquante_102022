const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');


const sauceCtrl = require('../controllers/sauces');

/*Création de sauce*/
router.post('/', auth, multer, sauceCtrl.createSauce);
  
/*Modification de sauce*/
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
  
/*Suppression de sauce*/
router.delete('/:id', auth, sauceCtrl.deleteSauce);
  
/*Acceder à une sauce en particulier*/
router.get('/:id', auth, sauceCtrl.getOneSauce);
  
/*Acceder à l'ensemble des sauces*/
router.get('/', auth, sauceCtrl.getAllSauce);

/*Système de Like et Dislike*/
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);

module.exports = router;
