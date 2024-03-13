/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';
import { LoadingContainer } from './styledLoading';

export function Loading({ isLoading }) {
  if (!isLoading) return <></>;

  return (
    <LoadingContainer>
      <div className="background" />

      <div className="loading-text">
        <h1>Carregando...</h1>
      </div>

      <div className="loading-bar">
        <div className="line-box">
          <div className="line" />
        </div>
      </div>
    </LoadingContainer>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
