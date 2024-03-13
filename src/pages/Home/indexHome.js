/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading/indexLoading';
import axios from '../../services/axios';
import { Main } from './styledHome';

export default function Home() {
  const isLoggedIn = useSelector((state) => state.LOGIN.isLoggedIn); // Acessa o redux store e pega o isLoggedIn do loginSlice --> Será usado pra verificar se o usuário está logado
  const loggedUserId = useSelector((state) => state.LOGIN.user.id); // Acessa o redux store e pega o id do initialState user do loginSlice --> Será usado pra pegar o id do usuário logado
  const userName = useSelector((state) => state.LOGIN.user.name);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]); // Cria a variável 'tasks' e a function 'setTasks' para alterar o valor da variável 'tasks'. Seu valor padrão é '[]'
  const [taskContent, setTaskContent] = useState(''); // Cria a variável 'taskContent' e a function 'setTaskContent' para alterar o valor da variável 'taskContent'. Seu valor padrão é ''
  const [editingTask, setEditingTask] = useState(false); // Cria a variável 'editingTask' e a function 'setEditingTask' para alterar o valor da variável 'editingTask'. Seu valor padrão é 'false'
  const [editingTaskId, setEditingTaskId] = useState(0); // Cria a variável 'editingTaskId' e a function 'setEditingTaskId' para alterar o valor da variável 'editingTaskId'. Seu valor padrão é '0'
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      // Verificar se o usuário está logado para fazer a requisição
      if (loggedUserId) {
        setIsLoading(true);
        const response = await axios.get(`/users/${loggedUserId}`); // Executa a requisição 'SHOW' de 'Task'
        setTasks(response.data.usuário.tasks);
        setIsLoading(false);
      }
    }

    getData();
  }, [loggedUserId]); // Use o [] para evitar que o código fique executando infinitamente

  // Ordenar as tasks(tarefas) de acordo com seu id de baixo pra cima
  function ordenarPorId(a, b) {
    return a.id - b.id;
  }

  tasks.sort(ordenarPorId);

  // Limpar o array de tarefas quando o usuário deslogar
  if (!loggedUserId && tasks.length > 0) {
    location.reload();
  }

  async function handleCreateTask(event, ownerId, content) {
    // Validar se o usuário está logado
    if (!isLoggedIn) {
      navigate('/login');
      return toast.info(
        'Você precisar estar logado para criar uma nova tarefa'
      );
    }

    // Validar a task(tarefa)
    if (taskContent.length < 2 || taskContent.length > 40)
      return toast.error('A tarefa precisa ter entre 2 e 40 caracteres');

    try {
      setIsLoading(true);
      // Criar a task(tarefa)
      await axios.post(`/tasks`, { ownerId, content }); // Executa a requisição 'STORE' de 'Task'

      // Pegar a lista atualizada com a nova task(tarefa)
      const response = await axios.get(`/users/${loggedUserId}`);
      setTasks(response.data.usuário.tasks);

      // Limpar o imput depois que a task(tarefa) for criada
      setTaskContent('');
      setIsLoading(false);

      return toast.success('Tarefa criada com sucesso');
    } catch (e) {
      const errors = get(e, 'response.data.errors', []); // Se dentro de (e) NÃO tiver 'response.data.errors', errors receberá []

      errors.map((error) => toast.error(error)); // Pega os erros no backend

      return '';
    }
  }

  function handleEditTask(event, id, content) {
    // Colocar o conteúdo da tarefa editada no input, alterar o btn de criação para o btn de edição e colocar o id da task na variável 'editingTaskId'
    setTaskContent(content);
    setEditingTask(true);
    setEditingTaskId(id);
  }

  function cancelHandleEditTask() {
    // Limpar o conteúdo da tarefa editada no input, alterar o btn de criação para o btn de edição e colocar o id da task na variável 'editingTaskId'
    setTaskContent('');
    setEditingTask(false);
    setEditingTaskId(0);
  }

  async function handleUpdateTask() {
    try {
      setIsLoading(true);
      // Atualizar task(tarefa)
      await axios.put(`/tasks/${editingTaskId}`, { content: taskContent }); // Executa a requisição 'UPDATE' de 'Task'

      // Desativar o 'modo de edição de tarefas' e limpar o input
      setEditingTask(false);
      setTaskContent('');

      // Pegar a lista atualizada com a task(tarefa) atualizada
      const response = await axios.get(`/users/${loggedUserId}`);
      setTasks(response.data.usuário.tasks);
      setIsLoading(false);

      return toast.success('Tarefa editada com sucesso');
    } catch (e) {
      const errors = get(e, 'response.data.errors', []); // Se dentro de (e) NÃO tiver 'response.data.errors', errors receberá []

      errors.map((error) => toast.error(error)); // Pega os erros no backend

      return '';
    }
  }

  async function handleDeleteTask(event, id) {
    try {
      setIsLoading(true);
      // Deletar task
      await axios.delete(`/tasks/${id}`); // Executa a requisição 'DELETE' de 'Task'

      // Pegar a lista atualizada sem a task(tarefa) deletada
      const response = await axios.get(`/users/${loggedUserId}`);
      setTasks(response.data.usuário.tasks);

      setIsLoading(false);
      return toast.success('Tarefa deletada com sucesso');
    } catch (e) {
      const errors = get(e, 'response.data.errors', []); // Se dentro de (e) NÃO tiver 'response.data.errors', errors receberá []

      errors.map((error) => toast.error(error)); // Pega os erros no backend

      return '';
    }
  }

  return (
    <Main>
      <Loading isLoading={isLoading} />

      <section>
        <div className="home-container">
          {isLoggedIn ? (
            <h1>
              Bem vindo(a) <span className="name">{userName}</span>, <br /> crie
              já suas tarefas{' '}
            </h1>
          ) : (
            <h1>Lista de tarefas</h1>
          )}
          <div className="task-input">
            <input
              type="text"
              placeholder="Digite aqui sua tarefa"
              value={taskContent}
              onKeyUp={(event) => {
                if (event.keyCode === 13 && !editingTask) {
                  handleCreateTask(event, loggedUserId, taskContent);
                } else if (event.keyCode === 13 && editingTask) {
                  handleUpdateTask(event, loggedUserId, taskContent);
                }
              }}
              onChange={(event) => setTaskContent(event.target.value)}
            />
            {editingTask ? (
              <button
                type="button"
                onClick={(event) => handleUpdateTask(event)}
                className="input-btn"
              >
                <FaEdit>Editar</FaEdit>
              </button>
            ) : (
              <button
                type="button"
                onClick={(event) =>
                  handleCreateTask(event, loggedUserId, taskContent)
                }
                className="input-btn"
              >
                <FaPlus>Adicionar</FaPlus>
              </button>
            )}
          </div>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={String(task.id)}>
                <p>{task.content}</p>
                <div>
                  {editingTask && editingTaskId === task.id ? (
                    <button
                      type="button"
                      onClick={(event) => cancelHandleEditTask(event)}
                    >
                      <IoClose>Cancelar</IoClose>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(event) => {
                        handleEditTask(event, task.id, task.content);
                        const input =
                          event.currentTarget.parentNode.parentNode.parentNode
                            .previousSibling.childNodes[0];
                        input.focus();
                      }}
                    >
                      <FaEdit>Editar</FaEdit>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(event) => handleDeleteTask(event, task.id)}
                  >
                    <FaTrash>Remover</FaTrash>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Main>
  );
}
