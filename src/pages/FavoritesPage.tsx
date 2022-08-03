import { useAppSelector } from "../hooks/redux";

export const FavoritesPage = () => {
  const { favorites } = useAppSelector(({ github }) => github);
  if (favorites.length === 0) {
    return <p className="text-center">No items...</p>;
  }

  return (
    <div className="flex justify-center pt-10 h-screen mx-auto w-screen">
      <ul className="list-none">
        {favorites?.map((favorit, index) => (
          <li key={`${favorit}_${index}`}>
            <a href={favorit} target="_blank">
              {favorit}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
