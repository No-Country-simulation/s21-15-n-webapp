/**
 * @fileoverview Configuración de rutas principales de la aplicación 
 * @module Routes
 * @version 1.0.0
 */

import { Home } from "../page/home/home";
import Landing from "../page/landing/landing";
import Layaud from "../page/layaud/layaud";
import Login from "../page/login/login";
import Register from "../page/login/register";
import { createBrowserRouter } from 'react-router-dom';


/**
 * @constant
 * @type {import('react-router-dom').RouteObject[]}
 * @description Router principal que contiene todas las rutas de la aplicación
 */

const router = createBrowserRouter([
    {
        path:"/",
        element: <Landing/>,
        errorElement: <div>Ups! Algo salió mal</div>
    },
    {
        path:"/ingreso",
        children:[
            {
                path:"login",
                element: <Login/>,
            },
            {
                path:"register",
                element:<Register/>,
            }
        ],
        errorElement:<div>Ups! Algo salió mal</div>
    },
    {
        path:"/junior",
        element:<Layaud/>,
        children:[
            {
                path:"home",
                element:<Home/>
            }
        ],
        errorElement:<div>Ups! Algo salió mal</div>
    }
])

export default router;