import { Header } from '../../Header';
import st from './pageLoader.module.scss';

export const PageLoader = () => {
  return (
    <>
      <Header />
      <span className={st.loader}></span>
    </>
  );
};
