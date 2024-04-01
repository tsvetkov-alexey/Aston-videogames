import st from './NotFound.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={st.root}>
      <h1>
        <span>😕</span>
        <br />
        There is nothing here
      </h1>
      <p className={st.description}>Moreover this page doesn't exist</p>
    </div>
  );
};
