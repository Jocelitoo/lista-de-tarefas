/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Section } from './styledLogin';
import { Loading } from '../../components/Loading/indexLoading';
import * as actions from '../../store/modules/login/loginActions'; // Importa todos os elementos exportados do arquivo authActions.js
import axios from '../../services/axios';

export default function Login() {
  const isLoggedIn = useSelector((state) => state.LOGIN.isLoggedIn); // Acessa o redux store e pega o initialState isLoggedIn do loginSlice --> Será usado pra saber se usuário está logado ou não
  // const isLoading = useSelector((state) => state.LOGIN.isLoading); // Acessa o redux store e pega o isLoading do loginSlice --> Será usado pra saber se está carregado ou não

  const dispatch = useDispatch(); // Dispara as types(ações) pro redux
  const navigate = useNavigate(); // Usado para navegar entre páginas
  const prevPath = useLocation().state || '/'; // Pega o state enviado para a rota /login que é a URL da página que o usuário estava antes de ir para a página de login. Se for "/", é pq o usuário clicou no btn pra fazer login. Se for outro link é pq o usuário clicou em algo que precisava estar logado para acessar e foi levado para a página de login, se estiver null é pq o usuário registrou a conta e foi redirecionado pra página de login então receberá '/'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirecionar usuário pra fora da página '/login', caso ele já esteja logado
  useEffect(() => {
    if (isLoggedIn) {
      navigate(prevPath);
    }
  }, [isLoggedIn, prevPath, navigate]);

  async function handleSubmit(event) {
    event.preventDefault(); // Impede que o formulário seja enviado

    // Validar os campos do formulário
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (password.length < 8 || password.length > 20) {
      formErrors = true;
      toast.error('Campo SENHA precisa ter entre 8 e 20 caracteres');
    }

    if (formErrors) return; // Se houver algum erro, esse IF será TRUE e terminará aqui a function handleSubmit

    // Logar usuário
    try {
      setIsLoading(true);

      const response = await axios.post('/tokens', {
        email,
        password,
      });

      actions.loginSucess({ ...response.data });

      axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      setIsLoading(false);
      toast.success('Usuário logado');
    } catch (e) {
      setIsLoading(false);

      if (e.response.data.errors) {
        // Verifica se tem alguma mensagem de erro enviado pelo res.json
        const { errors } = e.response.data;
        errors.map((error) => toast.error(error));
        return;
      }

      toast.error('Ocorreu um erro');
    }

    // dispatch(actions.loginRequest({ email, password })); // Executa a function loginRequest() que manda o type(ação) LOGIN/REQUEST para o redux e o Email e password são enviados pro payload dessa function
  }

  return (
    <main>
      <Loading isLoading={isLoading} />
      <Section>
        <div className="form-container">
          <h1>Entrar na conta</h1>

          <form action="#" method="POST" onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label htmlFor="password">
              Senha:
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <button type="submit" aria-label="Login">
              Login
            </button>
          </form>
        </div>
      </Section>
    </main>
  );
}
