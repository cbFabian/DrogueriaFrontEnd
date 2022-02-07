import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from 'app/shared/components/Button';
import { PedidoListar } from 'app/feature/Pedido/models/PedidoListar';

interface BtnCancelarPedidoUsuarioProps {
    onCancelar: (pedidoListar: PedidoListar) => any;
    pedidoListar: PedidoListar;
}

export const BtnCancelarPedidoUsuario: React.FC<BtnCancelarPedidoUsuarioProps> = ({
    onCancelar,
    pedidoListar,
}) => {
    const handleCancelar = () => onCancelar(pedidoListar);
    return(
        <Button onClick={handleCancelar}>
            <span role='img' aria-labelledby='cancelar'>
                Cancelar❌
            </span>
        </Button>
    );
};

BtnCancelarPedidoUsuario.propTypes = {
    pedidoListar: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombreUsuario: PropTypes.string.isRequired,
        nombreProducto: PropTypes.string.isRequired,
        tipoReunion: PropTypes.string.isRequired,
        fechaRealizacion: PropTypes.string.isRequired,
        direccion: PropTypes.string.isRequired,
        valorTotal: PropTypes.number.isRequired,
        horasDeServicio: PropTypes.number.isRequired,
    }).isRequired,
    onCancelar:PropTypes.func.isRequired,
};
