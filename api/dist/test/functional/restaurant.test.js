"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const client_1 = require("@prisma/client");
const AuthService_1 = __importDefault(require("@src/services/AuthService"));
const prisma = new client_1.PrismaClient();
describe('Restaurants functional tests', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({});
        await prisma.restaurant.deleteMany({});
    });
    describe('When creating a new restaurant', () => {
        it('should create a restaurant', async () => {
            const newUser = {
                firstName: 'Lucas',
                lastName: 'Rocha',
                email: 'lucasrocha@cardapiozin.com',
                password: '1234546',
                passwordTwo: '1234546'
            };
            const responseUser = await global.testRequest.post('/users').send(newUser);
            const token = AuthService_1.default.generateToken(responseUser.body.id);
            const newRestaurant = {
                user_id: responseUser.body.id,
                restaurant_name: 'Cardapiozin'
            };
            const response = await global.testRequest
                .post('/restaurants')
                .set('x-access-token', token)
                .send(newRestaurant);
            await expect(response.status).toBe(201);
            await expect(response.body).toEqual(expect.objectContaining({
                id: expect.any(Number),
                user_id: expect.any(Number),
                restaurant_name: 'Cardapiozin'
            }));
        });
        it('should return 409 when the restaurant already exists', async () => {
            const newUser = {
                firstName: 'Lucas',
                lastName: 'Rocha',
                email: 'lucasrocha@cardapiozin.com',
                password: '1234546',
                passwordTwo: '1234546'
            };
            const responseUser = await global.testRequest.post('/users').send(newUser);
            const token = AuthService_1.default.generateToken(responseUser.body.id);
            const newRestaurant = {
                user_id: responseUser.body.id,
                restaurant_name: 'Cardapiozin'
            };
            await global.testRequest
                .post('/restaurants')
                .set('x-access-token', token)
                .send(newRestaurant);
            const response2 = await global.testRequest
                .post('/restaurants')
                .set('x-access-token', token)
                .send(newRestaurant);
            await expect(response2.status).toBe(409);
            expect(response2.body).toEqual({
                code: 409,
                message: 'Restaurant already exists!'
            });
        });
        it('should return 400 whent fields are missing', async () => {
            const newUser = {
                firstName: 'Lucas',
                lastName: 'Rocha',
                email: 'lucasrocha@cardapiozin.com',
                password: '1234546',
                passwordTwo: '1234546'
            };
            const responseUser = await global.testRequest.post('/users').send(newUser);
            const token = AuthService_1.default.generateToken(responseUser.body.id);
            const newRestaurant = {
                user_id: responseUser.body.id,
                restaurant_name: ''
            };
            const response = await global.testRequest
                .post('/restaurants')
                .set('x-access-token', token)
                .send(newRestaurant);
            await expect(response.status).toBe(400);
            expect(response.body).toEqual({
                code: 400,
                message: 'Some fields are missing!'
            });
        });
    });
    describe('When getting restaurants', () => {
        it('should return a list of restaurants', async () => {
        });
    });
});
//# sourceMappingURL=restaurant.test.js.map