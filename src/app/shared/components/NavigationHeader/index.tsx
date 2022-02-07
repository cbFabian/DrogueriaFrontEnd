import * as React from 'react';
import { HeaderNav, TitleH1 } from './styles';
import LogoCeiba from 'assets/img/logo-ceiba.png';
import { NavBrand } from './NavBrand';
import { NavList } from './NavList';

export const NavigationHeader: React.FC = () => {
  const routes = [
    { label: 'Home', url: '/home' },
    { label: 'Iniciar Sesión', url: '/usuario' },
  ];
  return (
    <HeaderNav>
      <NavBrand imgSrc={LogoCeiba} text="Ceiba Software"></NavBrand>
      <TitleH1>DeliverChefcito</TitleH1>
      <NavList items={routes} />
    </HeaderNav>
  );
};
