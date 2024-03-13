import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FooterStyle } from './styledFooter';

export function Footer() {
  return (
    <FooterStyle>
      <p>
        Criado pelo desenvolvedor{' '}
        <span className="dev-name">Jocelito Climeres</span>
      </p>

      <div className="footer-icon">
        <a
          href="https://github.com/Jocelitoo"
          target="blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="footer-icon">Github</FaGithub>
        </a>

        <a
          href="https://www.linkedin.com/in/jocelito-climeres-a19014247/"
          target="blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="footer-icon">Github</FaLinkedin>
        </a>
      </div>
    </FooterStyle>
  );
}
