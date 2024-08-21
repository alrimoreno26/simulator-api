"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var SimulatorService = /** @class */ (function () {
    function SimulatorService() {
    }
    SimulatorService.prototype.getSimulationValues = function (params) {
        // Conversión de los valores a números y ajustes según los requisitos
        var valorImovel = Number(params.valorImovel);
        var valorAluguel = Number(params.valorAluguel);
        var inflacao = Number(params.inflacao) / 100;
        var selic = Number(params.selic) / 100;
        var valorizacao = Number(params.valorizacao) / 100;
        var tempo = Number(params.tempo);
        var entrada = Number(params.entrada);
        var sfh = Number(params.sfh) / 100;
        var ir = 0.85;
        var tempoInvest = tempo;
        // Recalculo de valorização, sfh y selic considerando inflación
        var adjustedValorizacao = (1 + valorizacao) / (1 + inflacao) - 1;
        var adjustedSfh = (1 + sfh) / (1 + inflacao) - 1;
        var adjustedSelic = (1 + selic) / (1 + inflacao) - 1;
        // Cálculos iniciales
        var valorParcela = (valorImovel - entrada) / tempo;
        var saldoDevedor = valorImovel - entrada;
        var encargos = saldoDevedor * adjustedSfh;
        var encargosAcumulado = encargos;
        var inv = params.isSelling
            ? valorImovel * Math.pow((1 + adjustedSelic * ir), tempo)
            : entrada * Math.pow((1 + adjustedSelic * ir), tempo);
        var invSaldo = 0;
        var aluguelAcumulado = 0;
        var invAluguel = 0;
        var aluguel = valorAluguel * 12;
        // Iteración sobre el tiempo de inversión
        for (var t = 1; t <= tempoInvest; t++) {
            if (saldoDevedor > 0) {
                saldoDevedor -= valorParcela;
                encargos = saldoDevedor * adjustedSfh;
            }
            else {
                saldoDevedor = 0;
                encargos = 0;
                valorParcela = 0;
            }
            encargosAcumulado += encargos;
            aluguel *= (1 + adjustedValorizacao);
            invSaldo = invSaldo - aluguel + valorParcela + encargos;
            invAluguel += aluguel;
            invAluguel *= (1 + adjustedSelic * ir);
            if (invSaldo > 0) {
                invSaldo *= (1 + adjustedSelic * ir);
            }
            aluguelAcumulado += aluguel;
        }
        var vi = valorImovel * Math.pow(1 + adjustedValorizacao, tempoInvest - 1);
        // Retorno del resultado de la simulación
        return {
            aluguelAcumulado: aluguelAcumulado,
            desvalorizacao: (vi - valorImovel),
            encargosAcumulado: encargosAcumulado,
            investimentoAluguel: invAluguel,
            investimentoEntrada: inv,
            investimentoSaldo: invSaldo,
            resultadoAluguel: params.isSelling ? vi + invAluguel : (inv + invSaldo),
            resultadoCompra: params.isSelling ? inv : vi - valorImovel * 0.04,
            valorParcela: tempo > 0
                ? (encargosAcumulado + valorImovel - entrada) / tempo / 12
                : 0,
        };
    };
    SimulatorService = __decorate([
        inversify_1.injectable()
    ], SimulatorService);
    return SimulatorService;
}());
exports.SimulatorService = SimulatorService;
