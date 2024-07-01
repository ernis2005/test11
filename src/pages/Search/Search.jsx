import React, { useState } from "react";
import s from "./page.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { getPokemonsByName } from "../../features/slice/searchSlice";

const Search = () => {
  const [searchParams, setSearchParams] = useState();
  const dispatch = useDispatch();
  const { error, searchPokemons, status } = useSelector(
    (state) => state.search
  );

  console.log(searchPokemons, status);
  const handele = () => {
    dispatch(getPokemonsByName(searchParams));
  };
  const pokemon = searchPokemons;

  return (
    <div className={s.pages}>
      <div className={s.Inputs}>
        <input
          type="text"
          onChange={(e) => setSearchParams(e.target.value)}
          placeholder="search"
        />
        <button onClick={() => handele()}> search</button>
      </div>
      {status == "loading" && <Loader />}
      {status == "success" && (
        <div>
          {" "}
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
                  {pokemon?.stats?.map((stat) => (
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
                {pokemon?.abilities?.map((ability) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
            <div className={s.BlockTitel}>
              <h2>Типы</h2>
              <ul>
                {pokemon?.types?.map((type) => (
                  <li key={type.type.name}>{type.type.name}</li>
                ))}
              </ul>
            </div>

            <div className={s.BlockTitel}>
              <h2>Ходы</h2>
              <ul>
                {pokemon?.moves?.map((move) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {status == "failed" && <div>{error}</div>}
    </div>
  );
};

export default Search;
