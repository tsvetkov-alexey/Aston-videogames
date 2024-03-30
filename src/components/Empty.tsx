import tumbleWeed from '../assets/img/tumbleweed.png';

export const Empty = () => {
  return (
    <div className="empty">
      <img src={tumbleWeed} alt="tumbleweed" />
      <h2>For this moment this page is empty, but its content is all up to you</h2>
    </div>
  );
};
