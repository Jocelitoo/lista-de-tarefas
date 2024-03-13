import styled from 'styled-components';

export const Main = styled.main`
  section {
    padding: 0;
  }

  .home-container {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 700px;
  }

  .home-container h1 {
    text-align: center;
  }

  .name {
    color: var(--primary-color);
  }

  .task-input {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 25px;
  }

  .task-input input {
    width: 100%;
    max-width: 300px;
    font-size: 16px;
    padding: 8px;
    border-radius: 4px;
    outline: 1px solid var(--font-color);
  }

  .task-input input:focus {
    outline: 2px solid var(--primary-color);
  }

  .task-input .input-btn {
    padding: 8px;
    border-radius: 4px;
  }

  .task-list {
    display: flex;
    margin-top: 50px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .task-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: var(--bg-color-2);
    border-radius: 4px;
    width: 100%;
    max-width: 600px;
  }

  .task-list li div {
    display: flex;
    gap: 8px;
  }

  .task-list li div button {
    padding: 8px;
    border-radius: 0;
  }
`;
