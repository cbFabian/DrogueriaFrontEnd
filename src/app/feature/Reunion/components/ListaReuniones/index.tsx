import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Reunion } from '../../models/Reunion';
import { Table } from './styles';

export interface ListaReunionesProps {
    reuniones: Array<Reunion>; 
}

export const ListaReuniones: React.FC<ListaReunionesProps> = ({
    reuniones,
}) => {
    return (
        <Table>
            <thead>
                <tr>
                    <td>
                        <b>Tipo de Reunion</b>
                    </td>
                    <td>
                        <b>Precio</b>
                    </td>
                </tr>
            </thead>
            <tbody>
                {reuniones.map((reunion: Reunion, index) => {
                        return (
                            <tr key={index}>
                                <td>{`${reunion.tipo}`}</td>
                                <td>${`${reunion.precio}`}</td>
                            </tr>
                        );
                    })}
            </tbody>
        </Table>
    );
};

ListaReuniones.propTypes = {
    reuniones: PropTypes.array.isRequired,
};
