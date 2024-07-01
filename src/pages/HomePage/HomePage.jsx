import React, { useEffect } from 'react';

import s from './page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes } from '../../features/slice/pokemonSlice';
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

  useEffect(() => {
    const data = {
      limit,
      offset,
    };
    dispatch(getPokemons(data));
    dispatch(getTypes());
  }, []);
  useEffect(() => {
    const data = {
      limit,
      offset,
    };
    dispatch(getPokemons(data));
  }, [limit, offset]);
  console.log(pokemons);
  const handleLimit = e => {
    if (e == limit) {
      alert('limit already selected');
      return;
    } else {
      setlimit(e);
      setOffset(0);
    }
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
        <div className={s.Cards}>
          {pokemons &&
            pokemons.map((pokemon, index) => (
              <Card key={index} data={pokemon} />
            ))}
        </div>
        <div className={s.BlockButtonList}>
          <button disabled={offset === 0} onClick={() => setOffset(offset - 1)}>
            -
          </button>
          <button>{offset + 1}</button>
          <button onClick={() => setOffset(offset + 1)}>+</button>
        </div>
      </div>
    );
  }
};

export default HomePage;
