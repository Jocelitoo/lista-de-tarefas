import styled from 'styled-components';

// CSS para a tag <section>
export const Section = styled.section`
  height: 70vh;
  justify-content: center;
  padding: 0;
  background-color: transparent;
  color: var(--font-color);

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: var(--bg-color-2);
    border-radius: 4px;
    padding: 16px;
    width: 100%;
    max-width: 500px;
  }

  .form-container h1 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  form label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  form label:has(input:focus) {
    color: var(--primary-color);
  }

  form label input {
    background-color: #fff;
    padding: 8px;
    border-radius: 4px;
    font-size: 16px;
  }

  form label input:focus {
    outline: 2px solid var(--primary-color);
  }

  form button {
    margin-left: 50%;
    transform: translateX(-50%);
    max-width: 130px;
  }

  form a {
    text-align: center;
    text-decoration: underline;
  }
`;
