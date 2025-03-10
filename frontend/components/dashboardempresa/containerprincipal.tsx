
import { Search, Plus } from "lucide-react";
import Tablas from "./table";

const columns = [
  {key:"nombre", label:"Nombre"},
  {key:"uactualizacion", label:"Última Actualización"},
  {key:"rol", label:"Rol"},
  {key:"accion", label:""},
];
const data = [
  {nombre:"Juan Carlos", uactualizaciones:"10/03/2023", rol:"Diseñador", accion:"..."},
  {nombre:"Alexa", uactualizaciones:"10/03/2023", rol:"Front End", accion:"..."},
  {nombre:"Marisol", uactualizaciones:"10/03/2023", rol:"Diseñador", accion:"..."},
  {nombre:"Daniel ", uactualizaciones:"10/03/2023", rol:"Diseñador", accion:"..."},
  {nombre:"Daniel", uactualizaciones:"10/03/2023", rol:"Diseñador", accion:"..."},
  {nombre:"Marcela", uactualizaciones:"10/03/2023", rol:"Diseñador", accion:"..."},
  {nombre:"Laura", uactualizaciones:"10/03/2023", rol:"Front End", accion:"..."},
  {nombre:"Norma", uactualizaciones:"10/03/2023", rol:"Front End", accion:"..."},
  {nombre:"Patricia", uactualizaciones:"10/03/2023", rol:"Back end", accion:"..."},
  {nombre:"Daniel ", uactualizaciones:"10/03/2023", rol:"Diseñador", accion:"..."},
  {nombre:"Daniel", uactualizaciones:"10/03/2023", rol:"Diseñador", accion:"..."},
  {nombre:"Marcela", uactualizaciones:"10/03/2023", rol:"Diseñador", accion:"..."},
  {nombre:"Laura", uactualizaciones:"10/03/2023", rol:"Front End", accion:"..."},
  {nombre:"Norma", uactualizaciones:"10/03/2023", rol:"Front End", accion:"..."},
  {nombre:"Patricia", uactualizaciones:"10/03/2023", rol:"Back end", accion:"..."},
];

export function ContainerPrincipal() {
  return (
    <div className="flex-1 p-6">
      <div className="flex flex-row h-50 w-full mb-4">
        <div className="border border-[#4F46E5] rounded-lg h-full w-[25%] mr-5"></div>
        <div className="border border-[#4F46E5] rounded-lg h-full w-[80%]"></div>
      </div>
      <div className="border border-[#4F46E5] rounded-lg h-[85%] p-4">
        <div className="h-10 mb-4 flex flex-row">
          <div className="border border-[#4F46E5] rounded-lg h-full w-104 mr-3">
            <input type="text" className="w-full h-full p-2 rounded-lg border-none outline-none" placeholder="Escribe para buscar aquí..."/>
          </div>
          <div className="border border-[#4F46E5] rounded-lg h-full w-10 mr-5 text-[#4F46E5]">
            <button className="w-full h-full text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white rounded-lg flex items-center justify-center space-x-2"><Search/></button>
          </div>
          <div className="border border-[#4F46E5] rounded-lg h-full w-50">
            <button className="w-full h-full text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white rounded-lg flex items-center justify-center space-x-2">
              <span>Filtros</span> 
              <Plus/>
            </button>
          </div>
        </div>
        <div className="border border-[#4F46E5] rounded-lg h-[550px]">
          <Tablas columns={columns} data={data}/>
        </div>
      </div>
    </div>
  );
}
