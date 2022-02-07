import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { Button } from 'app/shared/components/Button';
import { FormikHelpers } from 'formik/dist/types';
import { Input } from 'app/shared/components/Input';
import { CambioClaveUsuario } from '../../models/CambioClaveUsuario';
import { H2Error, SpanError } from './styles';
import { useFormik } from 'formik';
import { Usuario } from '../../models/Usuario';
import { Link } from 'react-router-dom';

const MINIMOCARACTERES = 4;
interface FormValues {
    claveActual: string;
    claveNueva: string;
    confirmarclaveNueva: string;
}

interface FormActualizarContrasenaProp {
    onSubmit: (payload: CambioClaveUsuario) => any;
    borrarMensajeError: () => void;
    disabled?: boolean;
    formTitle: string;
    usuario: Usuario;
    mensajeError: string;
    initialValues?: FormValues;
}

const validationSchema = Yup.object().shape<FormValues>({
    claveActual: Yup.string().required('El campo clave actual es requerido.'),
    claveNueva: Yup.string().required('El campo de nueva clave es requerido.')
    .min(MINIMOCARACTERES, 'Numero minimo de caracteres es 4'),
    confirmarclaveNueva: Yup.string().oneOf([Yup.ref('claveNueva'), undefined], 'Error, La nueva clave no coincide')
    .required('El campo de confirmar nueva clave es requerido.')
    .min(MINIMOCARACTERES, 'Numero minimo de caracteres es 4'),
});

export const FormActualizarContrasena: React.FC<FormActualizarContrasenaProp> = ({
    onSubmit,
    borrarMensajeError,
    disabled,
    formTitle,
    usuario,
    mensajeError,
    initialValues = {
        claveActual: '',
        claveNueva: '',
        confirmarclaveNueva: '',
    },
}) => {
    const handleSubmit = (
        values: FormValues,
        { resetForm }: FormikHelpers<FormValues>
    ) => {
        onSubmit({
            nombre: usuario.nombre,
            claveActual: values.claveActual,
            claveNueva: values.claveNueva,
        });
        resetForm();
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:handleSubmit,
    });
    if (mensajeError.length > 0) {
        return (
            <div>
                <H2Error>
                    {mensajeError}
                </H2Error>
                <Link to='/ajustes' replace={true}>
                    <Button onClick={borrarMensajeError}>
                        <span role='img' aria-labelledby='regresar'>
                            ⬅️Regresar⬅️
                        </span>
                    </Button>
                </Link>
            </div>
        );
    }
    return(
        <form onSubmit= {formik.handleSubmit}>
            <h2>{formTitle}</h2>
            <Input
                disabled={disabled}
                name="claveActual"
                placeholder="Clave Actual"
                value={formik.values.claveActual}
                onChange={formik.handleChange} 
            />
            {formik.touched.claveActual && formik.errors.claveActual && (
                <SpanError>{formik.errors.claveActual}</SpanError>
            )}
            <Input
                disabled={disabled}
                name="claveNueva"
                placeholder="Ingrese la nueva Clave"
                value={formik.values.claveNueva}
                onChange={formik.handleChange} 
            />
            {formik.touched.claveNueva && formik.errors.claveNueva && (
                <SpanError>{formik.errors.claveNueva}</SpanError>
            )}
            <Input
                disabled={disabled}
                name="confirmarclaveNueva"
                placeholder="Confirme la Nueva Clave"
                value={formik.values.confirmarclaveNueva}
                onChange={formik.handleChange} 
            />
            {formik.touched.confirmarclaveNueva && formik.errors.confirmarclaveNueva && (
                <SpanError>{formik.errors.confirmarclaveNueva}</SpanError>
            )}
            <Button type="submit">Actualizar</Button>
        </form>
    );
};

FormActualizarContrasena.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    formTitle: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    mensajeError: PropTypes.string.isRequired,
    usuario: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        clave: PropTypes.string.isRequired,
    }).isRequired,
    initialValues: PropTypes.shape({
        claveActual: PropTypes.string.isRequired,
        claveNueva: PropTypes.string.isRequired,
        confirmarclaveNueva: PropTypes.string.isRequired,
    }),
};
