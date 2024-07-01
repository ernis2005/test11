import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonsById } from '../../features/slice/pokemonSlice';
import Loader from '../../components/Loader/Loader';
import s from './page.module.scss';

const Id = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { pokemon, status, error } = useSelector(state => state.pokemon);
  useEffect(() => {
    dispatch(getPokemonsById(id));
  }, []);

  console.log(pokemon);
  if (status == 'loading') {
    return <Loader />;
  } else if (status == 'failed') {
    return <h2>{error}</h2>;
  } else {
    return (
      <div className={s.Page}>
        <div className={s.BlockImage}>
          <img
            src={pokemon?.sprites?.other?.dream_world?.front_default}
            alt={pokemon?.name}
          />

          <div className={s.BlockTitel}>
            <h1>{pokemon?.name}</h1>
            <h2>Статистика</h2>
            <ul>
              {pokemon?.stats?.map(stat => (
                <li key={stat.stat.name}>
                  {stat.stat.name} {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={s.BlockTitel}>
          <h2>Способности </h2>
          <ul>
            {pokemon?.abilities?.map(ability => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
        <div className={s.BlockTitel}>
          <h2>Типы</h2>
          <ul>
            {pokemon?.types?.map(type => (
              <li key={type.type.name}>{type.type.name}</li>
            ))}
          </ul>
        </div>

        <div className={s.BlockTitel}>
          <h2>Ходы</h2>
          <ul>
            {pokemon?.moves?.map(move => (
              <li key={move.move.name}>{move.move.name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default Id;
