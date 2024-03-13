import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import get from 'lodash';
import { useSelector } from 'react-redux';
import axios from '../../services/axios';
import { Section } from './styledRegister';
import { Loading } from '../../components/Loading/indexLoading';

export default function Register() {
  const isLoggedIn = useSelector((state) => state.LOGIN.isLoggedIn); // Acessa o redux store e pega o initialState isLoggedIn do loginSlice --> Será usado pra saber se usuário está logado ou não
  const navigate = useNavigate(); // Retorna um método usado para trocar a página

  const [name, setName] = useState(''); // Retorna a variável "name" e a function "setName" é usada para atualizar o valor de "name"
  const [email, setEmail] = useState(''); // Retorna a variável "email" e a function "setEmail" é usada para atualizar o valor de "email"
  const [password, setPassword] = useState(''); // Retorna a variável "password" e a function "setPassword" é usada para atualizar o valor de "password"
  const [isLoading, setIsLoading] = useState(false);

  // Redirecionar usuário para fora da página '/register' caso ele esteja logado
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  async function handleSubmit(event) {
    event.preventDefault(); // Impede que o formulário seja enviado

    // Validar os campos do formulário
    let formErrors = false;

    if (name.length < 2 || name.length > 20) {
      formErrors = true;
      toast.error('Campo NOME precisa ter entre 2 e 20 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (password.length < 8 || password.length > 20) {
      formErrors = true;
      toast.error('Campo SENHA precisa ter entre 8 e 20 caracteres');
    }

    if (formErrors) return; // Se houver algum erro, esse IF será TRUE e terminará aqui a function handleSubmit

    try {
      setIsLoading(true);

      // Criar o usuário
      await axios.post('/users', {
        name,
        email,
        password,
      });

      setIsLoading(false);
      toast.success('Usuário criado com sucesso');
      navigate('/login'); // Leva o usuário para a página /login
    } catch (e) {
      const errors = get(e, 'response.data.errors', []); // Se dentro de (e) NÃO tiver 'response.data.errors', errors receberá []

      errors.map((error) => toast.error(error)); // Pega os erros no backend
    }
  }

  return (
    <main>
      <Loading isLoading={isLoading} />
      <Section>
        <div className="form-container">
          <h1>Criar conta</h1>

          <form action="#" method="POST" onSubmit={handleSubmit}>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

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

            <button type="submit" aria-label="Criar novo usuário">
              Criar
            </button>
          </form>
        </div>
      </Section>
    </main>
  );
}
