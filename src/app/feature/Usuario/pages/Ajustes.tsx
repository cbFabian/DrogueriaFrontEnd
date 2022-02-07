import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorAjustesUsuario } from '../hoc/ProveedorAjustesUsuario';
import { RouteComponentProps } from 'react-router-dom';

const AjustesPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="Ajustes" description="Ajustes de Usuario">
      <ProveedorAjustesUsuario />
    </Layout>
  );
};
  
AjustesPage.displayName = 'AjustesPage';
  
export default AjustesPage;
