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
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_express_ts_1 = require("swagger-express-ts");
var SimulatorModel = /** @class */ (function () {
    function SimulatorModel() {
    }
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Valor del inmueble.',
            required: true,
            type: 'number',
        }),
        __metadata("design:type", Number)
    ], SimulatorModel.prototype, "valorImovel", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Valor del alquiler mensual.',
            required: true,
            type: 'number',
        }),
        __metadata("design:type", Number)
    ], SimulatorModel.prototype, "valorAluguel", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Tasa de inflación anual.',
            required: true,
            type: 'number',
        }),
        __metadata("design:type", Number)
    ], SimulatorModel.prototype, "inflacao", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Tasa SELIC anual.',
            required: true,
            type: 'number',
        }),
        __metadata("design:type", Number)
    ], SimulatorModel.prototype, "selic", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Tasa de valorización anual del inmueble.',
            required: true,
            type: 'number',
        }),
        __metadata("design:type", Number)
    ], SimulatorModel.prototype, "valorizacao", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Tiempo de inversión en años.',
            required: true,
            type: 'number',
        }),
        __metadata("design:type", Number)
    ], SimulatorModel.prototype, "tempo", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Monto de la entrada inicial.',
            required: true,
            type: 'number',
        }),
        __metadata("design:type", Number)
    ], SimulatorModel.prototype, "entrada", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Tasa del Sistema Financeiro de Habitação (SFH).',
            required: true,
            type: 'number',
        }),
        __metadata("design:type", Number)
    ], SimulatorModel.prototype, "sfh", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Indica si se está vendiendo el inmueble.',
            required: true,
            type: 'boolean',
        }),
        __metadata("design:type", Boolean)
    ], SimulatorModel.prototype, "isSelling", void 0);
    SimulatorModel = __decorate([
        swagger_express_ts_1.ApiModel({
            description: 'Simulator description',
            name: 'Simulator',
        })
    ], SimulatorModel);
    return SimulatorModel;
}());
exports.SimulatorModel = SimulatorModel;
