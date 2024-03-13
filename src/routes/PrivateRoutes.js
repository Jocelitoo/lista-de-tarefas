import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivatesRoutes() {
  const isLoggedIn = useSelector((state) => state.LOGIN.isLoggedIn); // Acessa o redux store e pega o state isLoggedIn do loginSlice
  const prevPath = useLocation().pathname; // Pega a URL da página que o usuário estava quando clicou em algo que precisava estar logado para usar

  // Verifica se o usuário está logado, se sim Outlet renderizará a rota filha, se não o Navigate redirecionará o usuário para a rota de login enviando um state que será a URL atual da página, para que quando o usuário logar ele seja redirecionado para onde estavá através desse state que tem a URL
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={prevPath} />;
}
