import { Search, Plus } from "lucide-react";
import { GraficoCake } from "./graficoCake";
import GraficoLine from './graficoLine';
import Tablas from "../dashboardempresa/table";


const mentores = 15;
const junior = 60;
const empresas = 25;
const columns = [
  {key:"nombre", label:"Nombre"},
  {key:"uactualizacion", label:"Última Actualización"},
  {key:"preguntas", label:"Preguntas"},
  {key:"rol", label:"Rol"},
  {key:"accion", label:""},
];
const data = [
  {nombre:"Encuesta 1 - Habilidades blandas importancia", uactualizaciones:"10/03/2023", preguntas:"15", rol:"Junior", accion:"..."},
  {nombre:"Encuesta 2 - Mejora en la Comunicación", uactualizaciones:"10/03/2023", preguntas:"10", rol:"Junior", accion:"..."},
  {nombre:"Encuesta 3 - Estrategias de Comunicación", uactualizaciones:"10/03/2023", preguntas:"5", rol:"Mentor", accion:"..."},
];


export function ContainerPrincipal() {
  return (
    <div className="flex-1 p-6 bg-[#0A082B] backdrop-blur-sm">
      <div className="flex flex-row h-80 w-full mb-4">
        <div className="border border-[#4F46E5] bg-[#070A4B40] rounded-lg h-full w-[55%] mr-5">
          <GraficoLine/>
        </div>
        <div className="border border-[#4F46E5] bg-[#070A4B40] rounded-lg h-full w-[50%] p-4">
          <h3>Distribución de roles</h3>
          <div className="h-[90%] w-full">
            <GraficoCake
              data={[mentores, junior, empresas] }
              labels={['Mentores','Junior','Empresas']}
              colors={['#A155B9','#7987FF','#F765A3']}
            />
          </div>
        </div>
      </div>
      <div className="border border-[#4F46E5] bg-[#070A4B40] rounded-lg h-[550px] p-4">
        <div className="h-10 mb-4 flex flex-row">
          <div className="border border-[#4F46E5] rounded-l-lg h-full w-104">
            <input type="text" className="w-full h-full p-2 rounded-lg border-none outline-none" placeholder="Escribe para buscar aquí..."/>
          </div>
          <div className="border border-[#4F46E5] rounded-r-lg h-full w-10 mr-56 text-[#4F46E5]">
            <button className="w-full h-full text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white rounded-r-lg flex items-center justify-center space-x-2"><Search/></button>
          </div>
          <div className="border border-[#4F46E5] rounded-lg h-full w-50">
            <button className="w-full h-full text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white rounded-lg flex items-center justify-center space-x-2">
              <Plus/>
              <span>Gestionar</span> 
            </button>
          </div>
        </div>
        <div className="border border-[#4F46E5]  rounded-lg h-[85%]">
          <Tablas columns={columns} data={data}/>
        </div>
      </div>
    </div>
  );
}
