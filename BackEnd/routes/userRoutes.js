const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Routes
router.post('/user', userController.saveUser);
router.post('/user/friends', userController.findMutualFriends);
router.get('/users', userController.searchUsers);
router.delete('/user/:username', userController.softDeleteUser);
router.put('/user/:username', userController.updateUser);
router.get('/users/list', userController.listUsers);

module.exports = router;

