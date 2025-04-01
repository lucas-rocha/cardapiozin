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
exports.LeadController = void 0;
const database_1 = require("../config/database");
class LeadController {
    constructor() { }
    createLead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastname, email, phone_number, restaurant_name } = req.body;
            const { data } = yield database_1.supabase.from('leads').insert({
                name,
                lastname,
                email,
                phone_number,
                restaurant_name
            }).select();
            return res.status(201).json(data);
        });
    }
    congratulateLead(req, res) {
        const { name, restaurant } = req.query;
        res.render('congratulations', {
            layout: 'basicLayout',
            name,
            restaurant
        });
    }
}
exports.LeadController = LeadController;
