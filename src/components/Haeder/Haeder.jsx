import React from 'react';
import s from './page.module.scss';
import { NavLink } from 'react-router-dom';
function Haeder() {
  return (
    <div className={s.Haeder}>
      <NavLink to="/">
        <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" />
      </NavLink>
      <div className={s.Search}>
        <NavLink to={'/search'}>search</NavLink>
      </div>
    </div>
  );
}

export default Haeder;
