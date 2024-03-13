import styled from 'styled-components';

export const FooterStyle = styled.footer`
  background-color: var(--bg-color-2);
  padding: 16px 7vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  margin-top: 32px;

  .dev-name {
    color: var(--primary-color);
  }

  .footer-icon {
    display: flex;
    gap: 4px;
  }

  .footer-icon a .footer-icon {
    width: 44px;
    height: 44px;
    padding: 8px;
    fill: var(--font-color);
    transition: fill 0.5s;
  }

  .footer-icon a:hover .footer-icon {
    fill: var(--primary-color);
  }
`;
