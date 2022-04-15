"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = require("express");
const CategoriesController_ts_1 = __importDefault(require("../controllers/CategoriesController.ts"));
const router = (0, express_1.Router)();
router.post('/', CategoriesController_ts_1.default.create);
router.get('/', CategoriesController_ts_1.default.getAll);
exports.default = router;
