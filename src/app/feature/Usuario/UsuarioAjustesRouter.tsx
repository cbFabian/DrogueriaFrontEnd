import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from 'app/shared/components/LazyFallback';

const AjustesPage = React.lazy(() => import('./pages/Ajustes'));

export const UsuarioAjustesRouter = () => (
    <React.Suspense fallback={<LazyFallback />}>
        {}
        <Switch>
            <Route path="/"component={AjustesPage}></Route>
        </Switch>
    </React.Suspense>
);
