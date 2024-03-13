import axios from 'axios';

export default axios.create({
  baseURL: 'https://api-lista-tarefas.vercel.app', // Link da API
});
