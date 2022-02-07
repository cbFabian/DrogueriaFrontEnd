import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from 'app/shared/components/LazyFallback';

const CrearPedidoPage = React.lazy(() => import('./pages/CrearPedido'));

export const PedidoCrearRouter = () => (
  <React.Suspense fallback={<LazyFallback />}>
    {/* Layout compartido entre las rutas va aquí */}
    <Switch>
      <Route path="/" component={CrearPedidoPage}></Route>
    </Switch>
  </React.Suspense>
);
