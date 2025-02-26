const LoginPage = () => {
  return (
    <div className="h-screen flex">
      {/* Sección izquierda */}
      <div className="w-1/2 bg-[#000115] text-white flex flex-col items-center justify-center p-10 rounded-r-3xl">
        {/* Logo y Nombre */}
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
        <div className="text-left w-3/4">
          <h1 className="text-3xl font-semibold text-center mb-4">Impulsa tu carrera en tecnología</h1>
          <p className="text-gray-300 text-center">
            Únete a StartPerks y transforma tu futuro profesional a través de simulaciones laborales y mentorías.
          </p>
        </div>
      </div>

      {/* Sección derecha */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>

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

          {/* Botón de Iniciar Sesión */}
          <button
            type="submit"
            className="w-full bg-[#000115] text-white py-2 rounded-lg hover:bg-[#000115cc] transition duration-300 mb-4"
          >
            Continuar
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
            <span>Iniciar sesión con Google</span>
          </button>

          {/* Link de "¿Olvidaste tu contraseña?" */}
          <div className="text-center mt-4">
            <a href="" className="text-sm text-[#000115] hover:underline">
              ¿Olvidaste tu contraseña? Haz clic aquí
            </a>
          </div>

          {/* Link de "Regístrate aquí" */}
          <div className="text-center mt-4 text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <a href="./register" className="text-[#000115] font-medium hover:underline">
              Regístrate aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
