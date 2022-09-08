"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerById = void 0;
const customer_useCase_1 = require("../application/customer.useCase");
const customer_controller_1 = require("./controller/customer.controller");
const sequelize_repository_1 = require("./repository/sequelize.repository");
const sequelizeRepository = new sequelize_repository_1.SequelizeRepository();
const userUseCase = new customer_useCase_1.CustomerUseCase(sequelizeRepository);
const customerController = new customer_controller_1.CustomerController(userUseCase);
const getCustomerById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = event.pathParameters;
    return customerController.getCustomer(+id);
});
exports.getCustomerById = getCustomerById;
//# sourceMappingURL=index.js.map