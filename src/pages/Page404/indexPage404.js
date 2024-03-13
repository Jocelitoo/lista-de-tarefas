import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Section } from './styledPage404';

export default function Page404() {
  const [time, setTime] = useState(5); // Retorna um valor(time) e uma function para atualizar esse valor(setTime)
  const timeout = useRef(0);
  const navigate = useNavigate(); // Retorna um método usado para trocar a página

  // Depois de 5 segundos a página será redirecionada para a página Home('/')
  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setTime((t) => t - 1);
    }, 1000);

    if (time <= 0) {
      navigate('/', {
        state: `This is the redirect state: ${Math.random()}`, // Gera um state para a pagina que vai ser redirecionada
      });
    }

    return function clear() {
      clearTimeout(timeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <main>
      <Section>
        <h1>Essa página não existe</h1>

        <p>
          Redirecionando página para Home em:{' '}
          <span className="cronometro">{time}</span>{' '}
        </p>
      </Section>
    </main>
  );
}
