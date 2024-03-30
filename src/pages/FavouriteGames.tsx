import { Empty } from '../components/Empty';
import { Header } from '../components/Header';
import { LikedGame } from '../components/LikedGame';
import { selectFavouriteGames } from '../redux/favourite/slice';
import { useSelector } from 'react-redux';

export const FavouriteGames = () => {
  const favouriteGames = useSelector(selectFavouriteGames);

  const sortedFavouriteGames = favouriteGames
    ? favouriteGames.concat().sort((a, b) => {
        if (a.timestamp && b.timestamp) {
          return a.timestamp.seconds - b.timestamp.seconds;
        }
        return 0;
      })
    : null;

  const likedGames = sortedFavouriteGames
    ? sortedFavouriteGames.map((obj, index) => (
        <LikedGame key={`${obj.gameId}-${index}`} {...obj} />
      ))
    : null;

  return (
    <>
      <Header />
      <div className="favourite-block">
        <h1>Here is what you liked</h1>
        <div className="fav-cards">
          {likedGames && likedGames.length > 0 ? likedGames : <Empty />}
        </div>
      </div>
    </>
  );
};
