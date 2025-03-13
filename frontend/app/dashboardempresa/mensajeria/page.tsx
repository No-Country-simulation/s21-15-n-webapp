"use client"
import { useState } from "react";
import { SideBar } from "@/components/dashboardempresa/sidebar";
import Image from "next/image";
import { Search, SendHorizonal } from "lucide-react";

//Array con posibles destinatarios
const destinatarios = [
    { nombre: "Sofía Hernández", value: "sofia.hernandez" },
    { nombre: "Carlos Pérez", value: "carlos.perez" },
    { nombre: "Mariana Gómez", value: "mariana.gomez" },
    { nombre: "Juan Ramírez", value: "juan.ramirez" },
    { nombre: "Lucía Fernández", value: "lucia.fernandez" },
    { nombre: "Matías López", value: "matias.lopez" },
    { nombre: "Ana Torres", value: "ana.torres" },
    { nombre: "Diego Morales", value: "diego.morales" },
    { nombre: "Valentina Ríos", value: "valentina.rios" },
    { nombre: "Tomás Sánchez", value: "tomas.sanchez" }
];

// Array de mensajes
const mensajes = [
    {
        avatar: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
        nombre: "Sofía Hernández",
        mensaje: "Hola Pedro, muchas gracias por conta...",
        fecha: "Hace 2 días",
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        nombre: "Carlos Pérez",
        mensaje: "¿Podemos agendar una reunión?",
        fecha: "Hace 1 día",
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
        nombre: "Mariana Gómez",
        mensaje: "Te envié los archivos solicitados.",
        fecha: "Hace 3 horas",
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        nombre: "Juan Ramírez",
        mensaje: "Quedamos para mañana a las 10 AM.",
        fecha: "Hace 5 minutos",
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/512/236/236831.png",
        nombre: "Lucía Fernández",
        mensaje: "Me gustaría coordinar una llamada.",
        fecha: "Hace 4 días",
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/512/201/201634.png",
        nombre: "Matías López",
        mensaje: "He compartido los documentos en Drive.",
        fecha: "Hace 6 horas",
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
        nombre: "Ana Torres",
        mensaje: "Confirmo la reunión del jueves.",
        fecha: "Hace 1 semana",
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
        nombre: "Diego Morales",
        mensaje: "¿Puedes revisar el informe adjunto?",
        fecha: "Hace 2 días",
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
        nombre: "Valentina Ríos",
        mensaje: "Te he dejado algunos comentarios.",
        fecha: "Hace 3 días",
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png",
        nombre: "Tomás Sánchez",
        mensaje: "Quisiera saber más sobre el proyecto.",
        fecha: "Hace 8 horas",
    }
];

export default function Page() {
  // Estado para la búsqueda
  const [searchText, setSearchText] = useState("");
  const [mensaje, setMensaje] = useState(""); // Estado para almacenar el mensaje escrito
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el cartel de éxito

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Función para manejar el cambio en el textarea
  const handleMensajeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMensaje(event.target.value);
  };

  // Función para simular el envío del mensaje
  const handleEnviarMensaje = () => {
    if (mensaje.trim() === "") return; // No enviar si está vacío

    console.log("Mensaje enviado:", mensaje); 
    setSuccessMessage(""); // Limpiar cualquier mensaje anterior

    // Simular un envío con retraso
    setTimeout(() => {
      setSuccessMessage("¡Mensaje enviado con éxito!");
      setMensaje(""); // Limpiar textarea después de enviar
      // Limpiar el mensaje de éxito después de 3 segundos más
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 3000); // Mostrar el mensaje de éxito a los 3 segundos
  };

  // Filtrar los mensajes según el texto de búsqueda
  const filteredMessages = mensajes.filter(
    (msg) =>
      msg.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      msg.mensaje.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="bg-[#0A082B] backdrop-blur-sm min-h-screen min-w-screen relative text-white">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0A082B] backdrop-blur-sm z-10">
        <SideBar />
      </aside>

      <main className="ml-64 flex h-screen p-4">
        {/* Sección de mensajes */}
        <div className="bg-[#12112D] backdrop-blur-sm border border-[#4F46E5] rounded-lg w-[35%] mr-4 p-3 overflow-y-auto">
          <div className="text-xl">
            <h2>Mensajes</h2>
          </div>

          {/* Input de búsqueda */}
          <div className="h-[40px] flex mb-4 mt-4">
            <button className="h-full text-[#4F46E5] hover:bg-[#4F46E5] border border-[#4F46E5] hover:text-white rounded-l-lg flex items-center justify-center space-x-2 w-[35px]">
              <Search />
            </button>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              className="border border-[#4F46E5] rounded-r-lg w-full focus:border-[#4F46E5]"
              placeholder="  Buscar.."
            />
          </div>

          {/* Mapeo directo de mensajes filtrados */}
          {filteredMessages.map((msg, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 hover:bg-[#1A2038] transition-all border-y border-y-[#4F46E5]"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={msg.avatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm">{msg.nombre}</h3>
                <p className="text-gray-400 text-xs truncate">{msg.mensaje}</p>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">{msg.fecha}</span>
            </div>
          ))}
        </div>

        {/* Sección de conversación */}
        <div className="border border-[#4F46E5] rounded-lg w-[65%] bg-[#12112D] backdrop-blur-sm p-4 relative">
          <div className="flex mb-5 mt-15">
            <h2 className="text-lg mr-3 ml-2 text-white">PARA:</h2>
            <select
                name="destinatario"
                id="destinatario"
                className="border border-[#4F46E5] rounded-lg w-full bg-transparent text-white text-sm"
            >
                <option value="" className="bg-[#12112D] ">Seleccionar destinatario</option>
                {destinatarios.map((dest, idx) => (
                    <option key={idx} value={dest.value} className="bg-[#12112D] ">
                    {dest.nombre}
                    </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <textarea
              value={mensaje}
              onChange={handleMensajeChange}
              className="border border-[#4F46E5] rounded-lg w-full h-[400px] p-2 bg-transparent text-white resize-none overflow-auto focus:outline-none"
              placeholder="Escribe aquí tu mensaje..."
            ></textarea>
          </div>
          <div
            className="text-[#4F46E5] hover:bg-[#4F46E5] border border-[#4F46E5] hover:text-white rounded-lg flex items-center justify-center space-x-2 w-[150px] h-[40px] ml-auto cursor-pointer"
            onClick={handleEnviarMensaje}
          >
            <SendHorizonal />
            <span>Enviar</span>
          </div>

          {/* Cartel de mensaje enviado */}
          {successMessage && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all">
              {successMessage}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
