import styled from 'styled-components';

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .background {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
  }

  .loading-text {
    z-index: 2;
    color: #fff;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }

  .loading-bar {
    z-index: 2;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .line-box {
    border: 2px solid #fff;
    padding: 2px;
    min-width: 230px;
    border-radius: 20px;
  }

  .line {
    height: 20px;
    border-radius: 20px;
    background-color: var(--primary-color);
    animation: loading 5s forwards infinite cubic-bezier(0, 0, 0, 0);
  }

  @keyframes loading {
    0% {
      width: 0%;
    }

    100% {
      width: 100%;
    }
  }
`;
