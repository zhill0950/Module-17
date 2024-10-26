"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_js_1 = require("../../controllers/userController.js");
const router = (0, express_1.Router)();
router.route('/').get(userController_js_1.getUsers).post(userController_js_1.createUser);
router.route('/:userId').get(userController_js_1.getSingleUser).put(userController_js_1.updateUser).delete(userController_js_1.deleteUser);
router.route('/:userId/friends/:friendId').post(userController_js_1.addFriend).delete(userController_js_1.deleteFriend);
exports.default = router;
