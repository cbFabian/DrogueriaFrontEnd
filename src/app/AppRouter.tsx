import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeRouter } from 'app/feature/Home/HomeRouter';
import MainPage from 'app/Main';
import { NavigationHeader } from 'app/shared/components/NavigationHeader';
import { ProductoRouter } from 'app/feature/Producto/ProductoRouter';
import { ReunionRouter } from './feature/Reunion/ReunionRouter';
import { UsuarioRouter } from './feature/Usuario/UsuarioRouter';
import { UsuarioAjustesRouter } from './feature/Usuario/UsuarioAjustesRouter';
import { PedidoRouter } from './feature/Pedido/PedidoRouter';
import { PedidoCrearRouter } from './feature/Pedido/PedidoCrearRouter'
import { PedidoModificarRouter } from './feature/Pedido/PedidoModificarRouter'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavigationHeader />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/home" component={HomeRouter} />
        <Route path="/productos" component={ProductoRouter} />
        <Route path="/reuniones" component={ReunionRouter} />
        <Route path="/pedidos" component={PedidoRouter} />
        <Route path="/usuario" component={UsuarioRouter} />
        <Route path="/ajustes-usuario" component={UsuarioAjustesRouter} />
        <Route path="/crear-pedido" component={PedidoCrearRouter} />
        <Route path="/modificar-pedido" component={PedidoModificarRouter} />
      </Switch>
    </BrowserRouter>
  );
};
