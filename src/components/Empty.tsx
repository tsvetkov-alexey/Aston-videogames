import tumbleWeed from '../assets/img/tumbleweed.png';

export const Empty = () => {
  return (
    <div className="empty">
      <img src={tumbleWeed} alt="tumbleweed" />
      <h2>There is nothing here, bruh</h2>
    </div>
  );
};
