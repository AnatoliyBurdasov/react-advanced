import { MouseEvent, useState } from "react";

import { Button } from "./Button";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavorites, removeFavorites } = useActions();
  const { favorites } = useAppSelector(({ github }) => github);
  const [isFavorite, setFavorite] = useState(favorites.includes(repo.html_url));

  const addToFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavorites(repo.html_url);
    setFavorite(true);
  };

  const removeFromFavorites = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavorites(repo.html_url);
    setFavorite(false);
  };
  return (
    <div className="border py-3 px-5 rounded my-2 hover:shadow-md hover:bg-gray-100 transition-all cursor-pointer">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-center font-bold">{repo.full_name}</h2>
        <p className="text-lg">Id: {repo.owner.id}</p>
        <p className="text-sm">
          Fork: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">Description: {repo?.description}</p>
        {!isFavorite && (
          <Button color="yellow" onClick={addToFavorite} marginR={2}>
            Add to favorites
          </Button>
        )}
        {isFavorite && (
          <Button color="red" onClick={removeFromFavorites}>
            Remove from favorites
          </Button>
        )}
      </a>
    </div>
  );
};
