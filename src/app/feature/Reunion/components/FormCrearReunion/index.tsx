import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { Button } from 'app/shared/components/Button';
import { FormikHelpers } from 'formik/dist/types';
import { Input } from 'app/shared/components/Input';
import { Reunion } from '../../models/Reunion';
import { SpanError } from './styles';
import { useFormik } from 'formik';

interface FormValues {
    tipo: string;
    precio: string;
}

interface FormCrearReunionProp {
    onSubmit: (payload: Reunion) => any;
    disabled?: boolean;
    formTitle: string;
    initialValues?: FormValues;
}

const validationSchema = Yup.object().shape<FormValues>({
    tipo: Yup.string().required('El campo tipo es requerido.'),
    precio: Yup.string().required('El campo precio es requerido.'),
});

export const FormCrearReunion: React.FC<FormCrearReunionProp> = ({
    onSubmit,
    disabled,
    formTitle,
    initialValues = {
        tipo: '',
        precio: '',
    },
}) => {
    const handleSubmit = (
        values: FormValues,
        { resetForm }: FormikHelpers<FormValues>
    ) => {
        onSubmit({
            tipo: values.tipo,
            precio: parseInt(values.precio, 10),
        });
        resetForm();
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:handleSubmit,
    });

    return(
        <form onSubmit= {formik.handleSubmit}>
            <h2>{formTitle}</h2>
            <Input
                disabled={disabled}
                name="tipo"
                placeholder="Tipo"
                value={formik.values.tipo}
                onChange={formik.handleChange} 
            />
            {formik.touched.tipo && formik.errors.tipo && (
                <SpanError>{formik.errors.tipo}</SpanError>
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
            <Button type="submit">Registrar</Button>
        </form>
    );
};

FormCrearReunion.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    formTitle: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    initialValues: PropTypes.shape({
        tipo: PropTypes.string.isRequired,
        precio: PropTypes.string.isRequired,
    }),
};
