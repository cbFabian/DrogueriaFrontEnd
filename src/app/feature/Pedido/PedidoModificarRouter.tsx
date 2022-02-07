import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from 'app/shared/components/LazyFallback';

const ModificarPedidoPage = React.lazy(() => import('./pages/ModificarPedido'));

export const PedidoModificarRouter = () => (
  <React.Suspense fallback={<LazyFallback />}>
    {/* Layout compartido entre las rutas va aquí */}
    <Switch>
      <Route path="/" component={ModificarPedidoPage}></Route>
    </Switch>
  </React.Suspense>
);
