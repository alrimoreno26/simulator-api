import 'reflect-metadata';
import { injectable } from 'inversify';
import { SimulatorModel } from '../model/simulatorModel';
import { SimulatorResultModel } from '../model/simulatorResultModel';

@injectable()
export class SimulatorService {

    public getSimulationValues(params: SimulatorModel): SimulatorResultModel {
        // Conversión de los valores a números y ajustes según los requisitos
        const valorImovel = Number(params.valorImovel);
        const valorAluguel = Number(params.valorAluguel);
        const inflacao = Number(params.inflacao) / 100;
        const selic = Number(params.selic) / 100;
        const valorizacao = Number(params.valorizacao) / 100;
        const tempo = Number(params.tempo);
        const entrada = Number(params.entrada);
        const sfh = Number(params.sfh) / 100;

        const ir = 0.85;
        const tempoInvest = tempo;

        // Recalculo de valorização, sfh y selic considerando inflación
        const adjustedValorizacao = (1 + valorizacao) / (1 + inflacao) - 1;
        const adjustedSfh = (1 + sfh) / (1 + inflacao) - 1;
        const adjustedSelic = (1 + selic) / (1 + inflacao) - 1;

        // Cálculos iniciales
        let valorParcela = (valorImovel - entrada) / tempo;
        let saldoDevedor = valorImovel - entrada;
        let encargos = saldoDevedor * adjustedSfh;
        let encargosAcumulado = encargos;
        const inv = params.isSelling
            ? valorImovel * Math.pow((1 + adjustedSelic * ir), tempo)
            : entrada * Math.pow((1 + adjustedSelic * ir), tempo);
        let invSaldo = 0;
        let aluguelAcumulado = 0;
        let invAluguel = 0;
        let aluguel = valorAluguel * 12;

        // Iteración sobre el tiempo de inversión
        for (let t = 1; t <= tempoInvest; t++) {
            if (saldoDevedor > 0) {
                saldoDevedor -= valorParcela;
                encargos = saldoDevedor * adjustedSfh;
            } else {
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

        const vi = valorImovel * Math.pow(1 + adjustedValorizacao, tempoInvest - 1);

        // Retorno del resultado de la simulación
        return {
            aluguelAcumulado,
            desvalorizacao: (vi - valorImovel),
            encargosAcumulado,
            investimentoAluguel: invAluguel,
            investimentoEntrada: inv,
            investimentoSaldo: invSaldo,
            resultadoAluguel: params.isSelling ? vi + invAluguel : (inv + invSaldo),
            resultadoCompra: params.isSelling ? inv : vi - valorImovel * 0.04,
            valorParcela: tempo > 0
                ? (encargosAcumulado + valorImovel - entrada) / tempo / 12
                : 0,
        };
    }
}
