import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorGestionUsuario } from '../hoc/ProveedorGestionUsuario';
import { RouteComponentProps } from 'react-router-dom';

const MainPage: React.FC<RouteComponentProps> = () => {
    return (
      <Layout title="Usuario" description="Gestión de Usuarios">
        <ProveedorGestionUsuario/>
      </Layout>
    );
  };
  
  MainPage.displayName = 'HomeMainPage';
  
  export default MainPage;
