import { use, useState } from "react";
import styles from "./pokemongrid.module.css";

async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

export const PokemonGrid = (props) => {
  const { handleSelectPokemon, url } = props;
  const [search, setSearch] = useState("");
  let data;
  if (localStorage.getItem("pokemon-cards")) {
    data = JSON.parse(localStorage.getItem("pokemon-cards"));
    console.log("Fetched From Cache", data);
  } else {
    console.log("Fetched From API");
    const data = use(fetchData(url));
    localStorage.setItem("pokemon-cards", JSON.stringify(data));
  }

  return (
    <div className={styles.pokemonGrid}>
      <h1 className={styles.header}>My Pokemon</h1>
      <div className={styles.listContainer}>
        <input
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchBar}
        />
        <div className={styles.pokeList}>
          {data.results
            .filter((val) => {
              return val.name.includes(search);
            })
            .map((pokemon, pokemonIndex) => {
              return (
                <div
                  onClick={handleSelectPokemon(pokemon.name)}
                  key={pokemonIndex}
                  className={styles.pokemon}
                >
                  {pokemon.name}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
