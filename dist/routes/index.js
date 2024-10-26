"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./api/userRoutes"));
const thoughtRoutes_1 = __importDefault(require("./api/thoughtRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
apiRouter.use('/users', userRoutes_1.default);
apiRouter.use('/thoughts', thoughtRoutes_1.default);
app.use('/api', apiRouter);
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
exports.default = apiRouter;
