import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { Button } from 'app/shared/components/Button';
import { FormikHelpers } from 'formik/dist/types';
import { Input } from 'app/shared/components/Input';
import { Usuario } from '../../models/Usuario';
import { SpanError } from './styles';
import { useFormik } from 'formik';
import { MostrarMensajeUsuario } from '../MostrarMensajeUsuario';

const MINIMOCARACTERES = 4;
interface FormValues {
    nombre: string;
    clave: string;
    confirmarClave: string;
}

interface FormCrearUsuarioProp {
    onSubmit: (payload: Usuario) => any;
    irInicioSesion: () => void;
    disabled?: boolean;
    formTitle: string;
    mensajeErrorCreacion: string;
    initialValues?: FormValues;
}

const validationSchema = Yup.object().shape<FormValues>({
    nombre: Yup.string().required('El campo nombre es requerido.'),
    clave: Yup.string().required('El campo clave es requerido.')
    .min(MINIMOCARACTERES, 'Numero minimo de caracteres es 4'),
    confirmarClave: Yup.string().oneOf([Yup.ref('clave'), undefined], 'Error, La clave no coincide')
    .required('El campo de confirmar clave es requerido.')
    .min(MINIMOCARACTERES, 'Numero minimo de caracteres es 4'),
});

export const FormCrearUsuario: React.FC<FormCrearUsuarioProp> = ({
    onSubmit,
    irInicioSesion,
    disabled,
    formTitle,
    mensajeErrorCreacion,
    initialValues = {
        nombre: '',
        clave: '',
        confirmarClave: '',
    },
}) => {
    const handleSubmit = (
        values: FormValues,
        { resetForm }: FormikHelpers<FormValues>
    ) => {
        onSubmit({
            nombre: values.nombre,
            clave: values.clave,
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
            <MostrarMensajeUsuario 
                mensaje={mensajeErrorCreacion}
            />
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
                name="clave"
                placeholder="Clave"
                value={formik.values.clave}
                onChange={formik.handleChange} 
            />
            {formik.touched.clave && formik.errors.clave && (
                <SpanError>{formik.errors.clave}</SpanError>
            )}
            <Input
                disabled={disabled}
                name="confirmarClave"
                placeholder="Confirme la Clave"
                value={formik.values.confirmarClave}
                onChange={formik.handleChange} 
            />
            {formik.touched.confirmarClave && formik.errors.confirmarClave && (
                <SpanError>{formik.errors.confirmarClave}</SpanError>
            )}
            <Button type="submit">Registrar</Button>
        </form>
    );
};

FormCrearUsuario.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    formTitle: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    mensajeErrorCreacion: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        clave: PropTypes.string.isRequired,
        confirmarClave: PropTypes.string.isRequired,
    }),
};
