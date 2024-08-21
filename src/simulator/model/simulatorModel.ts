import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
    description: 'Simulator description',
    name: 'Simulator',
})
export class SimulatorModel {
    @ApiModelProperty({
        description: 'Valor del inmueble.',
        required: true,
        type: 'number',
    })
    public valorImovel: number;

    @ApiModelProperty({
        description: 'Valor del alquiler mensual.',
        required: true,
        type: 'number',
    })
    public valorAluguel: number;

    @ApiModelProperty({
        description: 'Tasa de inflación anual.',
        required: true,
        type: 'number',
    })
    public inflacao: number;

    @ApiModelProperty({
        description: 'Tasa SELIC anual.',
        required: true,
        type: 'number',
    })
    public selic: number;

    @ApiModelProperty({
        description: 'Tasa de valorización anual del inmueble.',
        required: true,
        type: 'number',
    })
    public valorizacao: number;

    @ApiModelProperty({
        description: 'Tiempo de inversión en años.',
        required: true,
        type: 'number',
    })
    public tempo: number;

    @ApiModelProperty({
        description: 'Monto de la entrada inicial.',
        required: true,
        type: 'number',
    })
    public entrada: number;

    @ApiModelProperty({
        description: 'Tasa del Sistema Financeiro de Habitação (SFH).',
        required: true,
        type: 'number',
    })
    public sfh: number;

    @ApiModelProperty({
        description: 'Indica si se está vendiendo el inmueble.',
        required: true,
        type: 'boolean',
    })
    public isSelling: boolean;
}
