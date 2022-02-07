import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorCrearPedidos } from '../hoc/ProveedorCrearPedidos';
import { RouteComponentProps } from 'react-router-dom';

const CrearPedidoPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="Crear Pedido" description="Creación de pedidos">
      <ProveedorCrearPedidos />
    </Layout>
  );
};

CrearPedidoPage.displayName = 'HomeMainPage';

export default CrearPedidoPage;
