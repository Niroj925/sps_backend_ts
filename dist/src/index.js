"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./config/db.config");
const routes_1 = __importDefault(require("../routes"));
const swagger_1 = __importDefault(require("../swagger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorMiddleware_1 = __importDefault(require("./exception/errorMiddleware"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.get('/', (req, res) => {
    res.send('Hello,Nepal');
});
app.use(routes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use(errorMiddleware_1.default);
app.listen(process.env.PORT || 4000, () => {
    db_config_1.AppDataSource.initialize()
        .then(() => {
        console.log("Data Source has been initialized!");
    });
    console.log(`Server is running `);
});
