"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var swagger_express_ts_1 = require("swagger-express-ts");
var simulator_service_1 = require("../service/simulator.service");
var SimulatorController = /** @class */ (function () {
    function SimulatorController(simulatorService) {
        this.simulatorService = simulatorService;
    }
    SimulatorController.prototype.simulate = function (request, response, next) {
        try {
            var params = request.body;
            var result = this.simulatorService.getSimulationValues(params);
            response.json(result);
        }
        catch (error) {
            next(error); // Pasa errores al manejador de errores de Express
        }
    };
    __decorate([
        swagger_express_ts_1.ApiOperationPost({
            description: 'Get Values of Simulator Finance',
            parameters: {
                body: {
                    description: 'Values of simulation',
                    model: 'Simulator',
                    required: true,
                },
            },
            responses: {
                200: {
                    model: 'SimulatorResult',
                },
                400: { description: 'Parameters fail' },
            },
            summary: 'Get New Simulation',
        }),
        inversify_express_utils_1.httpPost('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], SimulatorController.prototype, "simulate", null);
    SimulatorController = __decorate([
        swagger_express_ts_1.ApiPath({
            name: 'Simulator',
            path: '/simulator',
            security: { apiKeyHeader: [] },
        }),
        inversify_express_utils_1.controller('/simulator'),
        inversify_1.injectable(),
        __param(0, inversify_1.inject(simulator_service_1.SimulatorService.name)),
        __metadata("design:paramtypes", [simulator_service_1.SimulatorService])
    ], SimulatorController);
    return SimulatorController;
}());
exports.SimulatorController = SimulatorController;
