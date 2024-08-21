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
var SimulatorResultModel = /** @class */ (function () {
    function SimulatorResultModel() {
    }
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Resultado de la compra del inmueble.',
            required: true,
        }),
        __metadata("design:type", Number)
    ], SimulatorResultModel.prototype, "resultadoCompra", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Total acumulado de encargos.',
            required: true,
        }),
        __metadata("design:type", Number)
    ], SimulatorResultModel.prototype, "encargosAcumulado", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Valor de cada parcela del financiamiento.',
            required: true,
        }),
        __metadata("design:type", Number)
    ], SimulatorResultModel.prototype, "valorParcela", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Resultado de la inversión en alquiler.',
            required: true,
        }),
        __metadata("design:type", Number)
    ], SimulatorResultModel.prototype, "resultadoAluguel", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Total acumulado de alquileres.',
            required: true,
        }),
        __metadata("design:type", Number)
    ], SimulatorResultModel.prototype, "aluguelAcumulado", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Diferencia entre el valor de compra y el valor actual.',
            required: true,
        }),
        __metadata("design:type", Number)
    ], SimulatorResultModel.prototype, "desvalorizacao", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Valor invertido en la entrada.',
            required: true,
        }),
        __metadata("design:type", Number)
    ], SimulatorResultModel.prototype, "investimentoEntrada", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Valor invertido en el alquiler.',
            required: true,
        }),
        __metadata("design:type", Number)
    ], SimulatorResultModel.prototype, "investimentoAluguel", void 0);
    __decorate([
        swagger_express_ts_1.ApiModelProperty({
            description: 'Valor restante de la inversión.',
            required: true,
        }),
        __metadata("design:type", Number)
    ], SimulatorResultModel.prototype, "investimentoSaldo", void 0);
    SimulatorResultModel = __decorate([
        swagger_express_ts_1.ApiModel({
            description: 'Simulator result description',
            name: 'SimulatorResult',
        })
    ], SimulatorResultModel);
    return SimulatorResultModel;
}());
exports.SimulatorResultModel = SimulatorResultModel;
