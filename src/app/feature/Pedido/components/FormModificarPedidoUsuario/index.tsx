import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { Button } from 'app/shared/components/Button';
import { FormikHelpers } from 'formik/dist/types';
import { Input } from 'app/shared/components/Input';
import { Pedido } from '../../../Pedido/models/Pedido';
import { PedidoListar } from '../../../Pedido/models/PedidoListar';
import { SpanError, Select } from './styles';
import { useFormik } from 'formik';
import { Producto } from 'app/feature/Producto/models/Producto';
import { Usuario } from 'app/feature/Usuario/models/Usuario';
import { Reunion } from 'app/feature/Reunion/models/Reunion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { MostrarMensaje } from '../MostrarMensaje';
import { constantes } from 'app/shared/utils/constantes';
import { calcularValores } from 'app/shared/utils/calcularValores';
import { MostrarMensajeError } from '../MostrarMensajeError';
import { Link } from 'react-router-dom';

const {
    HORAS24,
    HORA15,
    HORA19,
    MINUTOS60,
    SEGUNDOS60,
    MILISEGUNDOS,
    HORAMINIMA,
    HORAMAXIMA,
} = constantes;
const fechaDeHoy: Date = new Date();
const fechaDiaSiguiente: Date = new Date(fechaDeHoy.getTime() + (HORAS24 * MINUTOS60 * SEGUNDOS60 * MILISEGUNDOS));
const fechaYHoraInicialModif: Date = new Date(fechaDiaSiguiente.setHours(HORA15,0,0));
const fechaYHoraMaxModif: Date = new Date(fechaDiaSiguiente.setHours(HORA19,0,0));

interface FormValues {
    producto: string;
    reunion: string;
    fechaRealizacion: string;
    direccion: string;
    valorTotal: number;
    horasDeServicio: number;
}

interface FormModificarPedidoUsuarioProp {
  onSubmit: (pedidoListar: PedidoListar, payload: Pedido) => any;
  disabled?: boolean;
  formTitle: string;
  productos: Producto[];
  usuarios: Usuario[];
  reuniones: Reunion[];
  pedidoListar: PedidoListar;
  mensajeModificar: string;
  mensajeExcepcion: string;
  esFestivo: boolean;
  initialValues?: FormValues;
}

const validationSchema = Yup.object().shape<FormValues>({
    producto: Yup.string().required('El Producto es requerido.'),
    reunion: Yup.string().required('La Reunion es requerida.'),
    fechaRealizacion: Yup.string().required('La Fecha  de Realizacion es requerida.'),
    direccion: Yup.string().required('El campo Direccion es requerido.'),
    valorTotal: Yup.number().required('El campo Valor Total es requerido.')
    .positive('El valor del pedido no puede ser 0'),
    horasDeServicio: Yup.number().required('El campo Horas de Servicio es requerido.')
    .positive().integer()
    .min(HORAMINIMA, 'Minimo 4 horas')
    .max(HORAMAXIMA, 'Maximo 8 horas'),
});

export const FormModificarPedidoUsuario: React.FC<FormModificarPedidoUsuarioProp> = ({
    onSubmit,
    disabled,
    formTitle,
    usuarios,
    productos,
    reuniones,
    pedidoListar,
    mensajeModificar,
    mensajeExcepcion,
    esFestivo,
    initialValues = {
        producto: '',
        reunion: '',
        fechaRealizacion: '',
        direccion: '',
        valorTotal: 0,
        horasDeServicio: 0,
  },
}) => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
) => {
        onSubmit(pedidoListar, {
            usuario: usuarios[0],
            producto: JSON.parse(values.producto),
            reunion: JSON.parse(values.reunion),
            fechaRealizacion: new Date(fechaInicio).toISOString(),
            direccion: values.direccion,
            valorTotal: calcularValores(values.producto, values.reunion, esFestivo),
            horasDeServicio: values.horasDeServicio,
        });
        resetForm();
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:handleSubmit,
    });
    let valor = calcularValores(formik.values.producto, formik.values.reunion, esFestivo);
    formik.values.valorTotal = valor;
    const [fechaInicio, setfechaInicio] = useState(new Date(fechaDiaSiguiente.setHours(HORA15,0,0)));
    const fechaRealizacion = (fecha: Date) => {
         formik.values.fechaRealizacion = !fecha
        ? new Date(fechaDiaSiguiente).toString()
        : fecha.toString();
        return formik.values.fechaRealizacion;
    };
    return(
        <form onSubmit= {formik.handleSubmit}>
            <h2>{formTitle}</h2>
            <MostrarMensaje 
                mensaje={mensajeModificar}
            />
            <MostrarMensajeError
                mensajeError={mensajeExcepcion} 
            />
            <label>
            Modifique el Producto{' '}
            </label>
            <Select
                name="producto"
                onChange={formik.handleChange}>
                {productos.map((producto) => (
                    <option 
                        key={producto.nombre} 
                        value={JSON.stringify(producto)}
                        >
                            {producto.nombre}
                    </option>
                ))}
            </Select>
            {formik.touched.producto && formik.errors.producto && (
                <SpanError>{formik.errors.producto}</SpanError>
            )}
            <label>
                Cambie el Tipo de Reunión:{' '}
            </label>
            <Select 
                name="reunion"  
                onChange={formik.handleChange}>
                {reuniones.map((reunion) => (
                    <option 
                        key={reunion.tipo} 
                        value={JSON.stringify(reunion)}
                        >
                            {reunion.tipo}
                    </option>
                ))}
            </Select>
            {formik.touched.reunion && formik.errors.reunion && (
                <SpanError>{formik.errors.reunion}</SpanError>
            )}
            <label>
                Modifique la fecha y hora del evento:
            </label>
            <DatePicker
                name="fechaRealizacion" 
                selected={fechaInicio}
                onChange={(date) => {!date ? new Date(): setfechaInicio(date);}}
                showTimeSelect
                minTime={fechaYHoraInicialModif}
                maxTime={fechaYHoraMaxModif}
                minDate={fechaYHoraInicialModif}
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            {formik.touched.fechaRealizacion && formik.errors.fechaRealizacion && (
                <SpanError>{formik.errors.fechaRealizacion}</SpanError>
            )}
            <Input 
                type="hidden"
                name="fechaRealizacionAux"
                value={fechaRealizacion(fechaInicio)}
                onChange={formik.handleChange}
            />
            <Input
                disabled={disabled}
                name="direccion"
                placeholder="Ingrese la Dirección del evento. (Solo en Medellín)"
                value={formik.values.direccion}
                onChange={formik.handleChange} 
            />
            {formik.touched.direccion && formik.errors.direccion && (
                <SpanError>{formik.errors.direccion}</SpanError>
            )}
            <Input
                type="number"
                disabled={disabled}
                name="horasDeServicio"
                placeholder="Ingrese el numero Horas del servicio, (minimo 4 horas)"
                value={formik.values.horasDeServicio}
                onChange={formik.handleChange} 
            />
            {formik.touched.horasDeServicio && formik.errors.horasDeServicio && (
                <SpanError>{formik.errors.horasDeServicio}</SpanError>
            )}
            <label 
                htmlFor="valorTotalPedido">
                    Valor total de su pedido a modificar:{formik.values.valorTotal}
            </label>
            {formik.touched.valorTotal && formik.errors.valorTotal && (
                <SpanError>{formik.errors.valorTotal}</SpanError>
            )}
            <Button type="submit">Modificar Pedido</Button>
            <Link to='/pedidos' replace={true}>
                <Button>
                    Regresar
                </Button>
            </Link>
        </form>
    );
};

FormModificarPedidoUsuario.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    formTitle: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    initialValues: PropTypes.shape({
        producto: PropTypes.string.isRequired,
        reunion: PropTypes.string.isRequired,
        fechaRealizacion: PropTypes.string.isRequired,
        direccion: PropTypes.string.isRequired,
        valorTotal: PropTypes.number.isRequired,
        horasDeServicio: PropTypes.number.isRequired,
    }),
};
