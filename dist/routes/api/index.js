"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const thoughtRoutes_1 = __importDefault(require("./thoughtRoutes"));
const apiRouter = express_1.default.Router();
apiRouter.use('/users', userRoutes_1.default);
apiRouter.use('/thoughts', thoughtRoutes_1.default);
exports.default = apiRouter;
