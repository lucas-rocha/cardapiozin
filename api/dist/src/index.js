"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("express-async-errors");
require("./util/module-alias");
const server_1 = require("@src/server");
(async () => {
    const server = new server_1.SetupServer();
    await server.init();
    server.start();
})();
//# sourceMappingURL=index.js.map