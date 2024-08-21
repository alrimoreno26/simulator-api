"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
require("reflect-metadata");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var swagger = require("swagger-express-ts");
var simulator_service_1 = require("./simulator/service/simulator.service");
var simulator_controller_1 = require("./simulator/controller/simulator.controller");
// set up container
var container = new inversify_1.Container();
// note that you *must* bind your controllers to Controller
container.bind(simulator_service_1.SimulatorService.name).to(simulator_service_1.SimulatorService).inSingletonScope();
container.bind(inversify_express_utils_1.TYPE.Controller).to(simulator_controller_1.SimulatorController).inSingletonScope();
// create server
var server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig(function (app) {
    app.use('/api-docs/swagger', express.static('swagger'));
    app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
    app.use(bodyParser.json());
    app.use(swagger.express({
        definition: {
            info: {
                title: 'API Simulator',
                version: '1.0',
            },
            models: {
                Simulator: {
                    properties: {
                        entrada: {
                            description: 'Monto de la entrada inicial.',
                            example: [200000],
                            type: 'number',
                        },
                        inflacao: {
                            description: 'Tasa de inflación anual.',
                            example: [7.1],
                            type: 'number',
                        },
                        isSelling: {
                            description: 'Indica si se está vendiendo el inmueble.',
                            example: [false], type: 'boolean',
                        },
                        selic: {
                            description: 'Tasa SELIC anual.',
                            example: [12.25], type: 'number',
                        },
                        sfh: {
                            description: 'Tasa del Sistema Financeiro de Habitação (SFH).',
                            example: [13.25], type: 'number',
                        },
                        tempo: {
                            description: 'Tiempo de inversión en años.',
                            example: [15], type: 'number',
                        },
                        valorAluguel: {
                            description: 'Valor del alquiler mensual.',
                            example: [1500], type: 'number',
                        },
                        valorImovel: {
                            description: 'Valor del inmueble.',
                            example: [500000], type: 'number',
                        },
                        valorizacao: {
                            description: 'Tasa de valorización anual del inmueble.',
                            example: [7.1],
                            type: 'number',
                        },
                    },
                },
                SimulatorResult: {
                    properties: {
                        aluguelAcumulado: { type: 'number' },
                        desvalorizacao: { type: 'number' },
                        encargosAcumulado: { type: 'number' },
                        investimentoAluguel: { type: 'number' },
                        investimentoEntrada: { type: 'boolean' },
                        investimentoSaldo: { type: 'number' },
                        resultadoAluguel: { type: 'number' },
                        resultadoCompra: { type: 'number' },
                        valorParcela: { type: 'number' },
                    },
                },
            },
            responses: {
                500: {},
            },
        },
    }));
});
server.setErrorConfig(function (app) {
    app.use(function (err, request, response, next) {
        console.error(err.stack);
        response.status(500).send('Something broke!');
    });
});
var app = server.build();
app.listen(3000);
console.info('Server is listening on port : 3000');
