import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer, DivRow } from './styles';
import { FormCrearProducto } from '../../components/FormCrearProducto';
import { ListaProductos } from '../../components/ListarProductos';
import { PaginadorProductos } from '../../components/PaginadorProductos';
import { Producto } from '../../models/Producto';
import { useEffect } from 'react';
import { EstadoProducto } from 'app/core/redux/modelo/EstadoProducto';
import { EstadoUsuario } from 'app/core/redux/modelo/EstadoUsuario';
import { MenuLogueado } from 'app/shared/components/MenuLogueado';

interface GestionProductosProps {
  productos: EstadoProducto;
  usuario: EstadoUsuario;
  listarProductos: (numeroPagina: number) => void;
  agregarNuevoProducto: (producto: Producto) => void;
}

export const GestionProductos: React.FC<GestionProductosProps> = ({
  productos,
  usuario,
  agregarNuevoProducto,
  listarProductos,
}) => {
  useEffect(() => {
    listarProductos(0);
  }, [listarProductos]);
  const estaLogueado: boolean = usuario.usuarios.length > 0 ? true : false;
  return (
    <DivContainer>
      {estaLogueado && 
      <MenuLogueado
        usuario={usuario.usuarios[0]}    
      />}
      <DivRow>
      {!estaLogueado && <FormCrearProducto
          onSubmit={agregarNuevoProducto}
          formTitle="Crear Producto"
        />}
        <ListaProductos
          productos={productos.productos}
        />
        <PaginadorProductos
          cantidadTotalProductos={productos.cantidadTotalProducto}
          onClickCambiarPagina={listarProductos}
        />
      </DivRow>
    </DivContainer>
  );
};

GestionProductos.propTypes = {
  productos: PropTypes.shape({
    productos: PropTypes.array.isRequired,
    cantidadTotalProducto: PropTypes.number.isRequired,
  }).isRequired,
  usuario: PropTypes.shape({
    usuarios: PropTypes.array.isRequired,
    usuario: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      clave: PropTypes.string.isRequired,
    }).isRequired,
    cambioClaveUsuario: PropTypes.shape({
      nombre: PropTypes.string.isRequired, 
      claveActual: PropTypes.string.isRequired, 
      claveNueva: PropTypes.string.isRequired,
    }).isRequired,
    mensajeError: PropTypes.string.isRequired,
    mensajeConfirmacion: PropTypes.string.isRequired,
    mostrarAgregar: PropTypes.bool.isRequired,
    mostrarInicio: PropTypes.bool.isRequired,
    mostrarPanel: PropTypes.bool.isRequired,
    mostrarActualizar: PropTypes.bool.isRequired,
  }).isRequired,
  listarProductos: PropTypes.func.isRequired,
  agregarNuevoProducto: PropTypes.func.isRequired,
};
