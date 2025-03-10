import { Mail, Phone, Linkedin } from "lucide-react";


export function ContainerRight(){
    return(
        <div className="h-screen w-[350px] bg-[#000115] backdrop-blur-sm p-4 rounded-l-lg items-center mr-4">
            <div className="border border-gray-600 backdrop-blur-sm rounded-lg h-40 w-40 mb-4 ml-20">
                <img src="https://images.unsplash.com/photo-1635805737707-575885ab0820?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tYnJlJTIwYXJhbmF8ZW58MHx8MHx8fDA%3D" alt="avatar" className="w-full h-full rounded-lg"/>
            </div>
            <div className=" bg-[#12142A] backdrop-blur-sm rounded-lg h-20 mb-3 p-4 text-center text-xl">
                <h3>EL PEPE </h3>
                <span className="text-[15px] ">Diseñador grafico</span>
            </div>
            <div className="bg-[#12142A] backdrop-blur-sm rounded-lg h-80 mb-3 p-3 overflow-y-auto">
                <h3 className="text-lg mb-2">Stack tecnologico:</h3>
                <p>figma</p>
                <p>figma</p>
                <p>figma</p>
                <p>figma</p>
                <br />
                <h3 className="text-lg mb-2">Habilidades Blandas</h3>
                <p>Empatia</p>
                <p>Empatia</p>
                <p>Empatia</p>
            </div>
            <div className="bg-[#12142A] backdrop-blur-sm rounded-lg h-50 p-4 overflow-y-auto">
                <h3 className="text-lg mb-2">Contacto:</h3>
                <p className="flex items-center justify-start space-x-2"><Mail/> Correo:</p>
                <p>V</p>
                <p className="flex items-center justify-start space-x-2"><Linkedin/> Linkedln:</p>
                <p>v</p>
                <p className="flex items-center justify-start space-x-2"><Phone/> Telefono:</p>
                <p>v</p>
            </div>
        </div>
    );
};