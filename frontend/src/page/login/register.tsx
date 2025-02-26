
const Register = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="bg-[#000115] w-1/2 h-screen rounded-r-3xl text-white p-4 relative flex flex-col items-center justify-center mb-10">
        {/* Logo y nombre en línea */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://raw.githubusercontent.com/No-Country-simulation/s21-15-n-webapp/1857a87229a6361b345560c4be845b64247ec09b/frontend/src/assets/rocket.png"
              alt="StartPerks"
              className="w-6 h-6"
            />
            <span className="text-xl">StartPerks</span>
          </a>
        </div>
        {/* Contenido centrado */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-4xl mb-4">Da el primer paso hacia tu éxito</h2>
          <p className="max-w-[400px] mx-auto">
          Regístrate en StartPerks y comienza a ganar puntos, desbloquear mentorías y transformar tu carrera
          </p>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <div className="w-3/4">
            <h2 className="text-2xl font-semibold text-center mb-6">Regístrarse</h2>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Correo electrónico</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000115]"
                placeholder="nombre@ejemplo.com"
              />
            </div>

            {/* Contraseña */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000115]"
                placeholder="••••••••"
              />
            </div>
            {/* Confirma Contraseña */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000115]"
                placeholder="••••••••"
              />
            </div>

            {/* Botón de Iniciar Sesión */}
            <button
              type="submit"
              className="w-full bg-[#000115] text-white py-2 rounded-lg hover:bg-[#000115cc] transition duration-300 mb-4"
            >
              Registrarse
            </button>

            {/* Separador */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t"></div>
              <span className="mx-2 text-sm text-gray-500">o</span>
              <div className="flex-1 border-t"></div>
            </div>

            {/* Botón de Google */}
            <button
              className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span>Registrarse con Google</span>
            </button>

            {/* Link de "Ya tienes cuenta" */}
            <div className="text-center mt-4 text-sm text-gray-600">
              ¿Ya tenes tienes cuenta?{" "}
              <a href="./login" className="text-[#000115] font-medium hover:underline">
                Entra aquí
              </a>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Register