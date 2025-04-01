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
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const subdomainMiddleware_1 = __importDefault(require("./middlewares/subdomainMiddleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv.config();
const app = (0, express_1.default)();
app.engine('.hbs', (0, express_handlebars_1.engine)({ extname: '.hbs' }));
app.engine('.hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs',
    helpers: {
        eq: (a, b) => a === b
    }
}));
app.set('view engine', '.hbs');
app.set('views', 'src/views');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(subdomainMiddleware_1.default);
app.use(routes_1.default);
exports.default = app;
