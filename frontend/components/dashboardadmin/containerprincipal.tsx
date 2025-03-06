import { Search, SlidersHorizontal } from "lucide-react";

export function ContainerPrincipal() {
  return (
    <div className="flex-1 p-6">
      <div className="flex flex-row h-50 w-full mb-4">
        <div className="border border-[#4F46E5] rounded-lg h-full w-[55%] mr-5"></div>
        <div className="border border-[#4F46E5] rounded-lg h-full w-[50%]"></div>
      </div>
      <div className="h-[30%] mb-4">
        <div className="border border-[#4F46E5] rounded-lg h-full"></div>
      </div>
      <div className="border border-[#4F46E5] rounded-lg h-[45%] p-4">
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
              <SlidersHorizontal/>
            </button>
          </div>
        </div>
        <div className="border border-[#4F46E5] rounded-lg h-[85%]">
        </div>
      </div>
    </div>
  );
}
