import { Reunion } from 'app/feature/Reunion/models/Reunion';
import { axiosIntance } from '../config/AxiosConfig';

export const ReunionRepositorio = {
  consultarPorPagina: () => 
    axiosIntance.get('/reuniones'),
  crearReunion: ({tipo, precio}: Reunion) => 
    axiosIntance.post('/reuniones', { tipo, precio}),
};
