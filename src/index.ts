import * as bodyParser from 'body-parser';
import * as express from 'express';
import 'reflect-metadata';
import { Container } from 'inversify';
import {
    interfaces,
    InversifyExpressServer,
    TYPE,
} from 'inversify-express-utils';
import * as swagger from 'swagger-express-ts';
import { SimulatorService } from './simulator/service/simulator.service';
import { SimulatorController } from './simulator/controller/simulator.controller';

// set up container
const container = new Container();

// note that you *must* bind your controllers to Controller
container.bind<SimulatorService>(SimulatorService.name).to(SimulatorService).inSingletonScope();
container.bind<interfaces.Controller>(TYPE.Controller).to(SimulatorController).inSingletonScope();

// create server
const server = new InversifyExpressServer(container);

server.setConfig((app: any) => {
    app.use('/api-docs/swagger', express.static('swagger'));
    app.use(
        '/api-docs/swagger/assets',
        express.static('node_modules/swagger-ui-dist'),
    );
    app.use(bodyParser.json());
    app.use(
        swagger.express({
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
        }),
    );
});

server.setErrorConfig((app: any) => {
    app.use(
        (
            err: Error,
            request: express.Request,
            response: express.Response,
            next: express.NextFunction,
        ) => {
            console.error(err.stack);
            response.status(500).send('Something broke!');
        },
    );
});

const app = server.build();
app.listen(3000);
console.info('Server is listening on port : 3000');
