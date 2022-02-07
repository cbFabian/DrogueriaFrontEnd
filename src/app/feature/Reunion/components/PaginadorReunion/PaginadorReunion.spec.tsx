import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { PaginadorReunion } from 'app/feature/Reunion/components/PaginadorReunion';

describe('PaginadorReunion Test', () => {
  let componentWrapper: ShallowWrapper;

  afterEach(() => {
    componentWrapper.unmount();
  });

  it('should match snapshot', () => {
    componentWrapper = shallow(
      <PaginadorReunion
        cantidadTotalReuniones={11}
        onClickCambiarPagina={() => {}}
      />
    );
    expect(componentWrapper).toMatchSnapshot();
  });

  it('Renderizar con menos de 10 reuniones no debe pintar botones', () => {
    componentWrapper = shallow(
      <PaginadorReunion
        cantidadTotalReuniones={9}
        onClickCambiarPagina={() => {}}
      />
    );

    expect(componentWrapper.isEmptyRender()).toBeTruthy();
  });

  it('Renderizar con  20 reuniones debe pintar 2 botones', () => {
    componentWrapper = shallow(
      <PaginadorReunion
        cantidadTotalReuniones={20}
        onClickCambiarPagina={() => {}}
      />
    );
    const DOS = 2;
    const buttons = componentWrapper.find('button');
    expect(buttons.at(0).text()).toBe('1');
    expect(buttons.at(1).text()).toBe('2');
    expect(buttons.at(DOS).exists()).toBeFalsy();
  });
});

export {};
