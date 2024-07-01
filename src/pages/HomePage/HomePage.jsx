import React, { useEffect, useState } from 'react';

import s from './page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPokemons,
  getPokemonsByType,
  getTypes,
} from '../../features/slice/pokemonSlice';
import Loader from '../../components/Loader/Loader';
import Card from '../../components/Card/Card';
import cm from 'classnames';

const HomePage = () => {
  const dispatch = useDispatch();
  const { pokemons, types, error, status } = useSelector(
    state => state.pokemon,
  );
  console.log(types, 'test');
  const [offset, setOffset] = React.useState(0);
  const [limit, setlimit] = React.useState(20);
  const [typeFilter, setTypeFilter] = useState(null);

  useEffect(() => {
    const data = {
      limit,
      offset,
    };
    dispatch(getPokemons(data));
    dispatch(getTypes());
  }, []);

  useEffect(() => {
    if (typeFilter == null) return;
    const data = {
      limit,
      offset,
      type: typeFilter,
    };
    dispatch(getPokemonsByType(data));
  }, [typeFilter]);
  useEffect(() => {
    if (typeFilter == null) {
      const data = {
        limit,
        offset,
      };
      dispatch(getPokemons(data));
    } else {
      const data = {
        limit,
        offset,
        type: typeFilter,
      };
      dispatch(getPokemonsByType(data));
    }
  }, [limit, offset]);
  console.log(pokemons);

  const handleLimit = e => {
    if (e == limit) return;
    setlimit(e);
    setOffset(0);
  };
  const handleTypeFilter = e => {
    if (e == typeFilter) return;
    setTypeFilter(e);
    setOffset(0);
  };
  if (status === 'loading') {
    return <Loader />;
  } else if (error) {
    return <h2>{error}</h2>;
  } else {
    return (
      <div className={s.page}>
        <div className={s.Filters}>
          <ul className={s.FilterLimitList}>
            <li
              className={cm({ activeLimit: limit == 20 })}
              onClick={() => handleLimit(20)}
            >
              20
            </li>
            <li
              className={cm({ activeLimit: limit == 50 })}
              onClick={() => handleLimit(50)}
            >
              50
            </li>
            <li
              className={cm({ activeLimit: limit == 100 })}
              onClick={() => handleLimit(100)}
            >
              100
            </li>
          </ul>
        </div>
        <div className={s.FilterType}>
          <ul className={s.FilterLimitList}>
            {types &&
              types.map((type, index) => (
                <li
                  onClick={() => handleTypeFilter(type.name)}
                  className={cm({ activeType: typeFilter == type.name })}
                  key={index}
                >
                  {type.name}
                </li>
              ))}
          </ul>
        </div>

        <div className={s.Cards}>
          {pokemons.length > 0 ? (
            pokemons.map((pokemon, index) => (
              <Card key={index} data={pokemon} />
            ))
          ) : (
            <p> не найдено</p>
          )}
        </div>
        <div className={s.BlockButtonList}>
          <button disabled={offset === 0} onClick={() => setOffset(offset - 1)}>
            -
          </button>
          <button>{offset + 1}</button>
          <button
            disabled={pokemons.length < limit}
            onClick={() => setOffset(offset + 1)}
          >
            +
          </button>
        </div>
      </div>
    );
  }
};

export default HomePage;
