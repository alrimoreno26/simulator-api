import 'reflect-metadata';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpPost, interfaces } from 'inversify-express-utils';
import { ApiOperationPost, ApiPath } from 'swagger-express-ts';
import { SimulatorService } from '../service/simulator.service';
import { SimulatorModel } from '../model/simulatorModel';

@ApiPath({
    name: 'Simulator',
    path: '/simulator',
    security: { apiKeyHeader: [] },
})
@controller('/simulator')
@injectable()
export class SimulatorController implements interfaces.Controller {
    constructor(
        @inject(SimulatorService.name) private simulatorService: SimulatorService
    ) {
    }

    @ApiOperationPost({
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
    })
    @httpPost('/')
    public simulate(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        try {
            const params: SimulatorModel = request.body;

            const result = this.simulatorService.getSimulationValues(params);
            response.json(result);
        } catch (error) {
            next(error);  // Pasa errores al manejador de errores de Express
        }
    }
}
