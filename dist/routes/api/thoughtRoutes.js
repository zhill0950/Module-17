"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_js_1 = require("../../controllers/thoughtController.js");
const router = (0, express_1.Router)();
router.route('/').get(thoughtController_js_1.getThoughts).post(thoughtController_js_1.createThought);
router.route('/:thoughtId').get(thoughtController_js_1.getSingleThought).put(thoughtController_js_1.updateThought).delete(thoughtController_js_1.deleteThought);
router.route('/:thoughtId/reactions').post(thoughtController_js_1.addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(thoughtController_js_1.deleteReaction);
exports.default = router;
