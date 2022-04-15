import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import gamesContext from './AppContext';

function GamesProvider({ children }) {
  const [logged, setLogged] = useState({
    logged: false,
    name: '',
    lastName: '',
    email: '',
    avatar: '',
  });
  const [games, setGames] = useState([]);
  const [userGames, setUserGames] = useState({
    games: [],
    categoryId: '',
    page: 0,
  });
  const [genres, setgenres] = useState([]);
  const [searchContext, setSearchContext] = useState({
    searchBar: false,
    searchGenres: false,
    search: '',
    ordering: 'name',
    genre: '',
    page: 1,
  });
  const [collection, setCollection] = useState({
    categoriesId: 0,
    categories: [],
    game: {},
  });
  const contextValue = useMemo(() => ({
    logged,
    setLogged,
    searchContext,
    setSearchContext,
    games,
    setGames,
    genres,
    setgenres,
    collection,
    setCollection,
    userGames,
    setUserGames,
  }), [logged, searchContext, games, genres, collection, userGames]);

  return (
    <gamesContext.Provider value={contextValue}>
      { children }
    </gamesContext.Provider>
  );
}

GamesProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
};

export default GamesProvider;
