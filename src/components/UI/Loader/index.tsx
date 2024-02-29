import { Header } from '../../Header';
import st from './loader.module.scss';
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <>
      <Header />
      <span className={st.loader}></span>
    </>
  );
};
