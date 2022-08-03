import React, { useEffect, useState } from "react";

import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../hooks/useDebounce";
import {
  useLazyGetUserRepositoriesQuery,
  useSearchUsersQuery,
} from "../store/github.api";

import "../style/home-page.css";

export const HomePage = () => {
  const [search, setSearch] = useState("vladilenm");
  const [dropdown, setDropdown] = useState(false);

  const debounced = useDebounce(search);

  const {
    isError,
    isLoading,
    data: usersList,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepositories, { data: usersRepos, isLoading: isReposLoading }] =
    useLazyGetUserRepositoriesQuery();

  const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { target } = event;
    setSearch(target.value);
  };

  const clickHandler = (username: string) => {
    setDropdown(false);
    fetchRepositories(username);
  };
  useEffect(() => {
    if (debounced.length > 3 && usersList?.length! > 0) {
      setDropdown(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div className="flex justify-center pt-10 h-screen mx-auto w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong!</p>
      )}
      <div className="relative w-[560px]">
        <input
          type="text"
          value={search}
          onChange={changeHandler}
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github user name..."
        />
        {dropdown && (
          <ul className="overFlow list-none absolute top-[42px] left-0 right-0 max-h-[100px]  shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {usersList?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="w-[560px]">
          {isReposLoading && (
            <p className="text-center">Repositories are loading...</p>
          )}
          {usersRepos?.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};
