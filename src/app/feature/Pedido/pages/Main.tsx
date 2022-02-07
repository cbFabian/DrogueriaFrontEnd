import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorGestionPedidos } from '../hoc/ProveedorGestionPedidos';
import { RouteComponentProps } from 'react-router-dom';

const MainPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="Pedidos" description="Gestión de pedidos">
      <ProveedorGestionPedidos/>
    </Layout>
  );
};

MainPage.displayName = 'HomeMainPage';

export default MainPage;
