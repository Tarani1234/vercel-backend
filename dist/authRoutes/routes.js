"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authcontroller_1 = require("../controller/authcontroller");
const router = express_1.default.Router();
router.post('/signup', authcontroller_1.registerUser);
router.post('/login', authcontroller_1.loginUser);
router.post('/logout', authcontroller_1.logoutUser);
exports.default = router;
