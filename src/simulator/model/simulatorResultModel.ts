import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
    description: 'Simulator result description',
    name: 'SimulatorResult',
})
export class SimulatorResultModel {
    @ApiModelProperty({
        description: 'Resultado de la compra del inmueble.',
        required: true,
    })
    public resultadoCompra: number;

    @ApiModelProperty({
        description: 'Total acumulado de encargos.',
        required: true,
    })
    public encargosAcumulado: number;

    @ApiModelProperty({
        description: 'Valor de cada parcela del financiamiento.',
        required: true,
    })
    public valorParcela: number;

    @ApiModelProperty({
        description: 'Resultado de la inversión en alquiler.',
        required: true,
    })
    public resultadoAluguel: number;

    @ApiModelProperty({
        description: 'Total acumulado de alquileres.',
        required: true,
    })
    public aluguelAcumulado: number;

    @ApiModelProperty({
        description: 'Diferencia entre el valor de compra y el valor actual.',
        required: true,
    })
    public desvalorizacao: number;

    @ApiModelProperty({
        description: 'Valor invertido en la entrada.',
        required: true,
    })
    public investimentoEntrada: number;

    @ApiModelProperty({
        description: 'Valor invertido en el alquiler.',
        required: true,
    })
    public investimentoAluguel: number;

    @ApiModelProperty({
        description: 'Valor restante de la inversión.',
        required: true,
    })
    public investimentoSaldo: number;
}
