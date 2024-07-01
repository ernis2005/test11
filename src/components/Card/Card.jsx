import React from 'react';
import s from './page.module.scss';
import { Link } from 'react-router-dom';

const Card = ({ data }) => {
  return (
    <Link to={`/id/${data.id}`} className={s.Card}>
      <img src={data.avatar} alt={data.avatar} />
      <p>{data.name}</p>
      <div className={s.Types}>
        {data.types.map((type, index) => (
          <p key={index}>{type}</p>
        ))}
      </div>
    </Link>
  );
};

export default Card;
