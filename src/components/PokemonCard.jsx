import { use } from "react";
import styles from "./pokemoncard.module.css";

async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

export const PokemonCard = (props) => {
  const { selectedPokemon, clearHandler, parentUrl } = props;
  const pokemonUrl = parentUrl + selectedPokemon;
  console.log(pokemonUrl);
  const data = use(fetchData(pokemonUrl));
  console.log(data);
  return (
    <div className={styles.card}>
      <div className={styles.headerBar}>
        <h1>{selectedPokemon}</h1>
        <div onClick={clearHandler} className={styles.closeBtn}>
          X
        </div>
      </div>
      <img
        src={data.sprites.front_default}
        alt={selectedPokemon}
        className={styles.pokeImage}
      />
      <h3>Base Stats:</h3>
      <div className={styles.pokeCardStats}>
        {data.stats.map((stat, statIndex) => {
          return (
            <div key={statIndex}>
              <p>
                <b>{stat.stat.name}: </b>
                {stat.base_stat}
              </p>
            </div>
          );
        })}
      </div>
      <h3>Types: </h3>
      <div className={styles.pokeCardTypes}>
        {data.types.map((type, typeIndex) => {
          return (
            <div key={typeIndex}>
              <h4>{type.type.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
