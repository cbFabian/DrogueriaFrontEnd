import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from 'app/shared/components/Button';
import { Link } from 'react-router-dom';
import { PedidoListar } from 'app/feature/Pedido/models/PedidoListar';

interface BtnModificarPedidoUsuarioProps {
    onModificar: (pedidoListar: PedidoListar) => any;
    pedidoListar: PedidoListar;
}

export const BtnModificarPedidoUsuario: React.FC<BtnModificarPedidoUsuarioProps> = ({
    onModificar,
    pedidoListar,
}) => {
    const handleModificar = () => onModificar(pedidoListar);
    return(
        <Link to='/modificar-pedido' replace={true}>
            <Button onClick={handleModificar}>
                <span role='img' aria-labelledby='modificar'>
                    Modificar💡
                </span>
            </Button>
        </Link>
    );
};

BtnModificarPedidoUsuario.propTypes = {
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
    onModificar:PropTypes.func.isRequired,
};
