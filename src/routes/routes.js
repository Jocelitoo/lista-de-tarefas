import { Routes, Route } from 'react-router-dom';
import PrivatesRoutes from './PrivateRoutes';

import Editar from '../pages/Editar/indexEditar';
import Home from '../pages/Home/indexHome';
import Login from '../pages/Login/indexLogin';
import Page404 from '../pages/Page404/indexPage404';
import Register from '../pages/Register/indexRegister';

export function RoutesFunction() {
  return (
    <Routes>
      <Route element={<PrivatesRoutes />}>
        {/* Aqui dentro irão todas as rotas que só podem ser acessadas se o usuário estiver logado, PrivatesRoutes fará a verificação se o usuário está logado */}

        {/* A rota(URL) "/editar" ira renderizar a página Editar */}
        <Route path="/editar" element={<Editar />} />
      </Route>

      {/* A rota(URL) "/" ira renderizar a página Home */}
      <Route path="/" element={<Home />} />

      {/* A rota(URL) "/login" ira renderizar a página Login */}
      <Route path="/login" element={<Login />} />

      {/* A rota(URL) "/register" ira renderizar a página Login */}
      <Route path="/register" element={<Register />} />

      {/* Qualquer rota(URL) que não estiver configurada em routes.js ira renderizar a página de erro Page404  */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
