/* eslint-disable no-restricted-globals */
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Section } from './styledEditar';
import { Loading } from '../../components/Loading/indexLoading';
import axios from '../../services/axios';

import * as actions from '../../store/modules/login/loginActions'; // Importa todos os elementos exportados do arquivo authActions.js

export default function Editar() {
  const loggedUser = useSelector((state) => state.LOGIN.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userPic, setUserPic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(loggedUser.name);
    setEmail(loggedUser.email);
  }, [setName, setEmail, loggedUser]);

  // Verificar se o usuário tem alguma foto
  useEffect(() => {
    async function getPic() {
      setIsLoading(true);
      const response = await axios.get(`/users/${loggedUser.id}`);
      const findUserPic = get(response, 'data.usuário.fotos[0]', '');
      if (findUserPic) setUserPic(findUserPic);
      setIsLoading(false);
    }

    getPic();
  }, [loggedUser]);

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

    if (password.length > 0) {
      // Validação do password só será necessário se o usuário quiser altera-la, se estiver vazio é pq o usuário não quer altera-la
      if (password.length < 8 || password.length > 20) {
        formErrors = true;
        toast.error('Campo SENHA precisa ter entre 8 e 20 caracteres');
      }
    }

    if (formErrors) return; // Se houver algum erro, esse IF será TRUE e terminará aqui a function handleSubmit

    // Identificar se houve mudança de email
    let editedEmail = false;

    if (email !== loggedUser.email) {
      editedEmail = true;
    }

    // Atualizar dados do usuário
    try {
      setIsLoading(true);
      let response = {};

      if (password) {
        response = await axios.put(`/users`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.put(`/users`, {
          name,
          email,
        });
      }

      dispatch(actions.editSucess(response.data));

      // Deslogar o usuário em caso de mudança no email
      if (editedEmail) {
        dispatch(actions.loginFailure());
        navigate('/login');
        setIsLoading(false);
        toast.success('Conta editada, faça login novamente');
        return;
      }

      setIsLoading(false);
      toast.success('Conta editada com sucesso');
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
  }

  async function handleChoosePic(event) {
    const fotoFile = event.target.files[0]; // Pega o arquivo foto

    // Criar na mão o formulário necessário para enviar a img
    const formData = new FormData();
    formData.append('foto', fotoFile);

    try {
      // Enviar a img para o cloudinary e base de dados
      setIsLoading(true);
      const result = await axios.post('/fotos', formData, {
        headers: {
          'Content-Type': 'multipart-form-data',
        },
      });

      // Atualizar a img do usuário
      setUserPic(result.data.dados);

      setIsLoading(false);
      location.reload();
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
  }

  return (
    <main>
      <Loading isLoading={isLoading} />
      <Section>
        <div className="form-container">
          <h1>Editar conta</h1>

          <div className="pic-container">
            {userPic ? (
              <img src={userPic.url} alt="Foto do perfil" className="pic" />
            ) : (
              <FaUserCircle className="pic" />
            )}

            <label
              htmlFor="file-input"
              className="file-label "
              title={userPic ? 'Trocar foto' : 'Adicionar foto'}
            >
              <FaEdit className="icon">Editar</FaEdit>
              <input type="file" id="file-input" onChange={handleChoosePic} />
            </label>
          </div>

          <form
            action="#"
            method="POST"
            onSubmit={(event) => handleSubmit(event)}
          >
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
              Editar
            </button>
          </form>
        </div>
      </Section>
    </main>
  );
}
