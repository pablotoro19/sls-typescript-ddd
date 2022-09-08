"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
/* eslint-disable jest/require-hook */
const sequelize_1 = require("sequelize");
const config = __importStar(require("../../config/database"));
const customer_1 = __importDefault(require("./customer"));
const env = process.env.NODE_ENV || 'dev';
const dbConfig = config[env];
const { url } = dbConfig;
const sequelize = new sequelize_1.Sequelize(url, dbConfig);
exports.sequelize = sequelize;
const entities = {
    Customer: customer_1.default,
};
Object.keys(entities).forEach((modelKey) => {
    entities[modelKey].initialize(sequelize);
});
Object.keys(entities).forEach((modelKey) => {
    // Create model associations
    if (entities[modelKey].associate.length) {
        entities[modelKey].associate(entities);
    }
});
exports.default = entities;
//# sourceMappingURL=index.js.map