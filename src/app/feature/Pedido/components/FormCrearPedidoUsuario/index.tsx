import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { Button } from 'app/shared/components/Button';
import { FormikHelpers } from 'formik/dist/types';
import { Input } from 'app/shared/components/Input';
import { Pedido } from '../../../Pedido/models/Pedido';
import { SpanError, Select, H2EsFestivo } from './styles';
import { useFormik } from 'formik';
import { Producto } from 'app/feature/Producto/models/Producto';
import { Usuario } from 'app/feature/Usuario/models/Usuario';
import { Reunion } from 'app/feature/Reunion/models/Reunion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { MostrarMensaje } from '../MostrarMensaje/index';
import { MostrarMensajeError } from '../MostrarMensajeError';
import { constantes } from 'app/shared/utils/constantes';
import { calcularValores } from 'app/shared/utils/calcularValores';

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
const fechaYHoraInicial: Date = new Date(fechaDiaSiguiente.setHours(HORA15,0,0));
const fechaYHoraMax: Date = new Date(fechaDiaSiguiente.setHours(HORA19,0,0));

interface FormValues {
    producto: string;
    reunion: string;
    fechaRealizacion: string;
    direccion: string;
    valorTotal: number;
    horasDeServicio: number;
}

interface FormCrearPedidoUsuarioProp {
  onSubmit: (payload: Pedido) => any;
  validarDiaFestivo: (fechaFestivo: Date) => void;
  disabled?: boolean;
  formTitle: string;
  productos: Producto[];
  usuarioPedido: Usuario;
  reuniones: Reunion[];
  mensajePedido: string;
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

export const FormCrearPedidoUsuario: React.FC<FormCrearPedidoUsuarioProp> = ({
    onSubmit,
    validarDiaFestivo,
    disabled,
    formTitle,
    usuarioPedido,
    productos,
    reuniones,
    mensajePedido,
    mensajeExcepcion,
    esFestivo,
    initialValues = {
        producto: JSON.stringify(productos[0]),
        reunion: JSON.stringify(reuniones[0]),
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
        onSubmit({
            usuario: usuarioPedido,
            producto: JSON.parse(values.producto),
            reunion: JSON.parse(values.reunion),
            fechaRealizacion: fechaInicio.toISOString(),
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
    formik.values.fechaRealizacion = !fechaInicio
        ? ''
        : fechaInicio.toString();
    useEffect(() => {
        validarDiaFestivo(fechaInicio);
      },[validarDiaFestivo, fechaInicio]);
    return(
        <form onSubmit= {formik.handleSubmit}>
            <h2>{formTitle}</h2>
            <MostrarMensaje 
                mensaje={mensajePedido}
            />
            <MostrarMensajeError
                mensajeError={mensajeExcepcion} 
            />
            {esFestivo && 
                <H2EsFestivo>
                    El día seleccionado es festivo, se cobra el doble
                </H2EsFestivo>}
            <label>
                Productos Disponibles:{' '}
            </label>
            <Select
                value={formik.values.producto}
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
                Tipos de Reuniones:{' '}
            </label>
            <Select
                 value={formik.values.reunion}
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
                Fecha y hora de inicio del evento:
            </label>
            <DatePicker
                name="fechaRealizacion" 
                selected={fechaInicio}
                onChange={(date) => {!date ? new Date(): setfechaInicio(date);}}
                showTimeSelect
                minTime={fechaYHoraInicial}
                maxTime={fechaYHoraMax}
                minDate={fechaYHoraInicial}
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            {formik.touched.fechaRealizacion && formik.errors.fechaRealizacion && (
                <SpanError>{formik.errors.fechaRealizacion}</SpanError>
            )}                
            <Input 
                type="hidden"
                name="fechaRealizacionAux"
                value={formik.values.fechaRealizacion}
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
                    Valor total de su pedido:{formik.values.valorTotal}
            </label>
            {formik.touched.valorTotal && formik.errors.valorTotal && (
                <SpanError>{formik.errors.valorTotal}</SpanError>
            )}            
            <Button type="submit">Hacer Pedido</Button>
        </form>
    );
};

FormCrearPedidoUsuario.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    validarDiaFestivo: PropTypes.func.isRequired,
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
