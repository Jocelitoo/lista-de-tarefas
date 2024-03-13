import styled from 'styled-components';

export const HeaderStyle = styled.header`
  padding: 8px 7vw;
  background-color: var(--bg-color-2);
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;

  .nav-list {
    display: flex;
    justify-content: space-between;
  }

  li {
    display: flex;
    align-items: center;
  }

  .home {
    width: 48px;
    height: 44px;
    padding: 8px;
    display: inline-block;
    color: var(--font-color);
    transition: color 0.5s;
  }

  .home:hover,
  .home:focus {
    color: var(--primary-color);
  }

  .hidden-nav {
    display: none;
    transform: scaleY(0);
  }

  .show-nav {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2;
    width: 100%;
  }

  .show-nav li {
    background-color: var(--bg-color-2);
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .show-nav li:not(li:last-child) {
    border-bottom: 1px solid #0d0d0d;
  }

  .show-nav li a {
    width: 100%;
    padding: 15px 0;
    color: var(--font-color);
    transition: color 0.5s;
  }

  .show-nav li a:hover,
  .show-nav li a:focus {
    color: var(--primary-color);
  }

  .logged-out-nav {
    display: flex;
    gap: 8px;
  }

  .logged-out-nav .nav-txt {
    position: relative;
  }

  .logged-out-nav .nav-txt a {
    padding: 15px 8px;
    border-radius: 4px;
    color: var(--font-color);
    transition: color 0.5s;
  }

  .logged-out-nav .nav-txt a:hover,
  .logged-out-nav .nav-txt a:focus {
    color: var(--primary-color);
  }

  .logged-out-nav .nav-txt a::before {
    content: '';
    display: block;
    width: 0%;
    height: 1px;
    background-color: var(--primary-color);
    position: absolute;
    left: 8px;
    bottom: 20%;
  }

  .logged-out-nav .nav-txt a:hover::before,
  .logged-out-nav .nav-txt a:focus::before {
    animation: linkAnimation 0.5s forwards;
  }

  @keyframes linkAnimation {
    0% {
      width: 0%;
    }

    100% {
      width: calc(100% - 16px);
    }
  }

  button {
    padding: 0;
    position: relative;
    background-color: transparent;
  }

  .user-pic {
    width: 44px;
    height: 44px;
    padding: 8px;
    border-radius: 50%;
  }

  .config-icon {
    fill: var(--font-color);
    width: 12px;
    height: 12px;
    transform: rotate(180deg);
    position: absolute;
    right: 5%;
    bottom: 10%;
    transition: transform 0.5s;
  }

  button:hover .config-icon {
    transform: rotate(360deg);
  }

  .theme-btn {
    color: #fff;

    padding: 8px 0;
  }

  .config-btn:hover,
  .theme-btn:hover,
  .config-btn:focus,
  .theme-btn:focus {
    background-color: transparent;
  }

  .theme-icon-container {
    display: flex;
    gap: 16px;
    border-radius: 16px;
    padding: 6px 8px;
    background-color: #0d0d0d;
  }

  .theme-icon {
    filter: brightness(0.3);
  }

  .sun {
    filter: brightness(1);
  }

  .moon {
    filter: brightness(1);
  }

  @media (min-width: 520px) {
    .show-nav {
      width: 200px;
      left: auto;
      right: 0;
      border-radius: 0 0 8px 8px;
      overflow: hidden;
    }
  }
`;
