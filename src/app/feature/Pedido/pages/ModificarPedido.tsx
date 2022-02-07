import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorModificarPedidos } from '../hoc/ProveedorModificarPedidos';
import { RouteComponentProps } from 'react-router-dom';

const ModificarPedidoPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="Modificar Pedido" description="Modificación de pedidos">
      <ProveedorModificarPedidos />
    </Layout>
  );
};

ModificarPedidoPage.displayName = 'HomeMainPage';

export default ModificarPedidoPage;
