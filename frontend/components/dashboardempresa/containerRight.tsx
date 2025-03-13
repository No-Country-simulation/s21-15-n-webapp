import { Mail, Phone, Linkedin } from "lucide-react";
import Image from "next/image";


// Interface para los datos
interface ProfileData {
  name: string;
  role: string;
  stack: string[];
  softSkills: string[];
  contact: {
    email: string;
    linkedin: string;
    phone: string;
  };
  avatar: string;
}

// Props del componente
interface Props {
  profile: ProfileData;
}

export function ContainerRight({ profile }: Props) {
  return (
    <div className="h-screen w-[350px] bg-[#000115] backdrop-blur-sm p-4 rounded-l-lg items-center mr-4">
      {/* Avatar */}
      <div className="border border-gray-600 backdrop-blur-sm rounded-lg h-40 w-40 mb-4 ml-20">
        <Image 
            src={profile.avatar} 
            alt="avatar"
            width={160} // Ajustá el tamaño según tu diseño
            height={160}
            className="w-full h-full rounded-lg object-cover"
        />
      </div>

      {/* Nombre y Rol */}
      <div className="bg-[#12142A] backdrop-blur-sm rounded-lg h-20 mb-3 p-4 text-center text-xl">
        <h3>{profile.name}</h3>
        <span className="text-[15px]">{profile.role}</span>
      </div>

      {/* Stack y Habilidades Blandas */}
      <div className="bg-[#12142A] backdrop-blur-sm rounded-lg h-80 mb-3 p-3 overflow-y-auto">
        <h3 className="text-lg mb-2">Stack tecnológico:</h3>
        {profile.stack.map((tech, index) => (
          <p key={index}>{tech}</p>
        ))}
        <br />
        <h3 className="text-lg mb-2">Habilidades Blandas:</h3>
        {profile.softSkills.map((skill, index) => (
          <p key={index}>{skill}</p>
        ))}
      </div>

      {/* Contacto */}
      <div className="bg-[#12142A] backdrop-blur-sm rounded-lg h-50 p-4 overflow-y-auto">
        <h3 className="text-lg mb-2">Contacto:</h3>
        <p className="flex items-center justify-start space-x-2">
          <Mail /> <span>{profile.contact.email}</span>
        </p>
        <p className="flex items-center justify-start space-x-2">
          <Linkedin /> <span>{profile.contact.linkedin}</span>
        </p>
        <p className="flex items-center justify-start space-x-2">
          <Phone /> <span>{profile.contact.phone}</span>
        </p>
      </div>
    </div>
  );
}
