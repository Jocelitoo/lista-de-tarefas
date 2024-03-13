/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import { FaHome, FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get, set } from 'lodash';
import { HeaderStyle } from './styledHeader';

import * as actions from '../../store/modules/login/loginActions'; // Importa todos os elementos exportados do arquivo loginActions.js
import axios from '../../services/axios';

export function Header() {
  const isLoggedIn = useSelector((state) => state.LOGIN.isLoggedIn); // Acessa o redux store e pega o initialState isLoggedIn do loginSlice --> Será usado pra saber se usuário está logado ou não
  const loggedUser = useSelector((state) => state.LOGIN.user);
  const dispatch = useDispatch(); // Dispara as types(ações) pro redux

  const [navbarIsClosed, setNavbarIsClosed] = useState(true); // Cria a variável 'navbarIsClosed' e a function 'setNavbarIsClosed' para alterar seu valor. Seu valor padrão é 'true'
  const [userPicUrl, setUserPicUrl] = useState('');
  const [theme, setTheme] = useState('darkmode');

  const html = document.querySelector('html');
  const storedTheme = localStorage.getItem('theme') || 'darkmode'; // Pega o tema salvo no localstorage. Se n estiver salvo no localStorage, receberá o valor padrão de 'darkmode'
  html.classList = storedTheme;

  // Verificar se o usuário tem alguma foto
  useEffect(() => {
    async function getPic() {
      if (isLoggedIn) {
        const response = await axios.get(`/users/${loggedUser.id}`);
        const findUserPicUrl = get(response, 'data.usuário.fotos[0].url', '');
        if (findUserPicUrl) setUserPicUrl(findUserPicUrl);
      }
    }

    getPic();
  }, [isLoggedIn, loggedUser]);

  function handleShowNav() {
    setNavbarIsClosed(!navbarIsClosed);
  }

  function handleChooseTheme(event) {
    if (theme === 'darkmode') {
      setTheme('lightmode');
      localStorage.setItem('theme', 'lightmode');
      return;
    }

    if (theme === 'lightmode') {
      setTheme('darkmode');
      localStorage.setItem('theme', 'darkmode'); // Colocaremos no localStorage para que quando o usuário recarregar a página permanecer o tema
    }
  }

  function handleLogout() {
    dispatch(actions.loginFailure()); // Executa a function loginFailure() que manda o type(ação) LOGIN/FAILURE para o redux e lá é executado o reducer de nome LOGIN/FAILURE que vai pegar todos os estados globais com os dados do usuário e transforma-los no estado global inicial que n possui nenhum dado. Ou seja, se os dados do usuário são tirados do estado global, temos um logout
    toast.success('Usuário deslogado');
  }

  return (
    <HeaderStyle>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/" aria-label="Home">
              <FaHome className="home" />
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <button
                type="button"
                aria-label="Mostrar menu"
                className="config-btn"
                onClick={handleShowNav}
              >
                {userPicUrl ? (
                  <img
                    src={userPicUrl}
                    className="user-pic"
                    alt="Foto do usuário"
                  />
                ) : (
                  <FaUserCircle className="user-pic" />
                )}
                <FaGear className="config-icon" />
              </button>
              <ul className={navbarIsClosed ? 'hidden-nav' : 'show-nav'}>
                <li>
                  <Link
                    to="/editar"
                    aria-label="editar conta"
                    onClick={(event) => setNavbarIsClosed(true)}
                  >
                    Editar conta
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={(event) => handleChooseTheme(event)}
                    className="theme-btn"
                  >
                    <div className="theme-icon-container">
                      <FaSun
                        className={`theme-icon  ${storedTheme === 'lightmode' ? 'sun' : ''}`}
                      >
                        Sol
                      </FaSun>
                      <FaMoon
                        className={`theme-icon  ${storedTheme === 'darkmode' ? 'moon' : ''}`}
                      >
                        Lua
                      </FaMoon>
                    </div>
                  </button>
                </li>

                <li>
                  <Link to="/" aria-label="Sair" onClick={handleLogout}>
                    Sair
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <ul className="logged-out-nav">
              <li className="nav-txt">
                <Link to="/login" aria-label="Login">
                  Login
                </Link>
              </li>

              <li className="nav-txt">
                <Link to="/register" aria-label="Criar conta">
                  Registrar-se
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </HeaderStyle>
  );
}
