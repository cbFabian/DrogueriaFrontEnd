import styled from 'styled-components';

export const SpanError = styled.span`
  color: #f62d2d;
  font-weight: bold;
  font-size: 12px;
`;

export const Select = styled.select`
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 8px;
  padding: 8px 4px;
  display: block;
  width: 100%;
  &[disabled] {
    opacity: 0.3;
  }
`;

export const H2ModificarPedido = styled.h2`
  color: #32cd32;
  font-weight: bold;
  text-align: center;
`;
