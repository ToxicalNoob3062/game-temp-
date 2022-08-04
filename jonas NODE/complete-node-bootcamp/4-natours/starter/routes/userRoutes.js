const exp = require('express');
const userController = require('./../controllers/userController');
//directly intiating routung for users with this advnaced routing process
const router = exp.Router();
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
