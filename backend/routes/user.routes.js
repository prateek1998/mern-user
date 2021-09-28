var router = require('express').Router();
const userController = require('../controllers/user.controller');

// Single event Routes
router.route('/data')
      .post(userController.createUser)
      .put(userController.updateUser)    
      
router.route('/data/:id')
      .get(userController.getUserDetails)
      .delete(userController.deleteUser)  
      
//Multiple Events Routes
router.route('/datas')
      .get(userController.getAllUsers)       
      .delete(userController.deleteAllUsers)     

module.exports = router;



