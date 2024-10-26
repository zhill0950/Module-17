"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const thoughtRoutes_1 = __importDefault(require("../routes/api/thoughtRoutes"));
const userRoutes_1 = __importDefault(require("../routes/api/userRoutes"));
const router = express_1.default.Router();
router.use('/users', userRoutes_1.default);
router.use('/thoughts', thoughtRoutes_1.default);
exports.default = router;
