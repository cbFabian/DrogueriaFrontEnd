import * as React from 'react';
import { MenuNav, SpanUsuario } from './styles';
import { NavList } from '../NavigationHeader/NavList';
import { Usuario } from 'app/feature/Usuario/models/Usuario';

interface MenuLogueadoProps {
    usuario: Usuario;
}

export const MenuLogueado: React.FC<MenuLogueadoProps> = ({
    usuario,
}) => {
  const routes = [
    { label: '| Ver Reuniones', url: '/reuniones' },
    { label: '| Ver Productos', url: '/productos' },
    { label: '| Ir a Pedidos', url: '/pedidos' },
    { label: '| Ajustes de Cuenta', url: '/ajustes-usuario' },
  ];
  return (
    <MenuNav>
        <NavList items={routes} />
        <SpanUsuario>
            Bienvenid@: {usuario.nombre}
        </SpanUsuario>
    </MenuNav>
  );
};
