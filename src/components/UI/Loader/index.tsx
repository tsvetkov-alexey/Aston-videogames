import st from './loader.module.scss';
import React from 'react';

export const Loader: React.FC = () => {
  return <span className={st.loader}></span>;
};
