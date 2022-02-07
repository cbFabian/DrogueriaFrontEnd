import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { Button } from 'app/shared/components/Button';
import { FormikHelpers } from 'formik/dist/types';
import { Input } from 'app/shared/components/Input';
import { Producto } from '../../models/Producto';
import { SpanError } from './styles';
import { useFormik } from 'formik';

interface FormValues {
  nombre: string;
  precio: string;
  detalle: string;
}

interface FormCrearProductoProp {
  onSubmit: (payload: Producto) => any;
  disabled?: boolean;
  formTitle: string;
  initialValues?: FormValues;
}

const validationSchema = Yup.object().shape<FormValues>({
  nombre: Yup.string().required('El campo nombre es requerido.'),
  precio: Yup.string().required('El campo precio es requerido.'),
  detalle: Yup.string().required('El campo detalle es requerido.'),
});

export const FormCrearProducto: React.FC<FormCrearProductoProp> = ({
  onSubmit,
  disabled,
  formTitle,
  initialValues = {
    nombre: '',
    precio: '',
    detalle: '',
  },
}) => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    onSubmit({
      nombre: values.nombre,
      precio: parseInt(values.precio, 10),
      detalle: values.detalle,
    });
    resetForm();
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>{formTitle}</h2>
      <Input
        disabled={disabled}
        name="nombre"
        placeholder="Nombre"
        value={formik.values.nombre}
        onChange={formik.handleChange}
      />
      {formik.touched.nombre && formik.errors.nombre && (
        <SpanError>{formik.errors.nombre}</SpanError>
      )}
      <Input
        disabled={disabled}
        name="precio"
        placeholder="Precio"
        value={formik.values.precio}
        onChange={formik.handleChange}
      />
      {formik.touched.precio && formik.errors.precio && (
        <SpanError>{formik.errors.precio}</SpanError>
      )}
      <Input
        disabled={disabled}
        name="detalle"
        placeholder="Detalle"
        value={formik.values.detalle}
        onChange={formik.handleChange}
      />
      {formik.touched.detalle && formik.errors.detalle && (
        <SpanError>{formik.errors.detalle}</SpanError>
      )}
      <Button type="submit">Registrar Producto</Button>
    </form>
  );
};

FormCrearProducto.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formTitle: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  initialValues: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.string.isRequired,
    detalle: PropTypes.string.isRequired,
  }),
};
