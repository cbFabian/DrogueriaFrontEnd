import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorGestionReunion } from '../hoc/ProveedorGestionReunion';
import { RouteComponentProps } from 'react-router-dom';

const MainPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="Reunion" description="Gestión de Reuniones">
      <ProveedorGestionReunion/>
    </Layout>
  );
};

MainPage.displayName = 'HomeMainPage';

export default MainPage;
