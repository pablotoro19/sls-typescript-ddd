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
exports.CustomerController = void 0;
const response_1 = require("../../../shared/helpers/response");
class CustomerController {
    constructor(customerUseCase) {
        this.customerUseCase = customerUseCase;
        this.getCustomer = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield this.customerUseCase.getCustomerById(id);
                return (0, response_1.successHandler)(customer);
            }
            catch (error) {
                const { message, status, errorCode } = error;
                console.error('error: ', error);
                return (0, response_1.errorHandler)(message, status, errorCode);
            }
        });
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map