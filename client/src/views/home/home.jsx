import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  clearDetail,
  getByName,
  getPokemons,
  getTypes,
  orderPokemons,
  orderPokemonsByAttack,
  orderPokemonsByDefense,
  setFilterOrigin,
  setFilterType,
} from "../../redux/actions/actions";

import Paginado from "../../components/paginado/paginado";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import Filter from "../../components/filter/filter";
import styles from "./home.module.css";
const Home = () => {
  const pokemon = useSelector((state) => state.selected);
  const allTypes = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.filteredPokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexLastPokemon = currentPage * pokemonsPerPage;
  const indexFirstPokemon = indexLastPokemon - pokemonsPerPage;
  const currentPokemons = Array.isArray(allPokemons)
    ? allPokemons.slice(indexFirstPokemon, indexLastPokemon)
    : [];

  const [showSearchResults, setShowSearchResults] = useState(false);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const order = (event) => {
    dispatch(orderPokemons(event.target.value));
  };
  const orderByAttack = (event) => {
    dispatch(orderPokemonsByAttack(event.target.value));
  };

  const [searchString, setSearchString] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(searchString));
    setShowSearchResults(true);
  };

  const handleFilterType = (e) => {
    dispatch(setFilterType(e.target.value));
  };

  const handleFilterOrigin = (e) => {
    dispatch(setFilterOrigin(e.target.value));
  };

  const handleFilterDefense = (e) => {
    dispatch(orderPokemonsByDefense(e.target.value));
  };
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [allPokemons]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 7000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className={styles.home}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Filter
        allTypes={allTypes}
        order={order}
        handleFilterOrigin={handleFilterOrigin}
        orderByAttack={orderByAttack}
        handleFilterType={handleFilterType}
        handleFilterDefense={handleFilterDefense}
      />
      <Paginado
        className={styles.paginado}
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginated={paginated}
        currentPage={currentPage}
      />

      {!currentPokemons.length ? (
        <>
          {showError ? (
            <h2>0 Results found for the filters applied</h2>
          ) : (
            <div className={styles.loaderContainer}>
              <span className={styles.loader}></span>
            </div>
          )}
        </>
      ) : (
        <>
          {showSearchResults ? (
            <div>
              <Cards allPokemons={pokemon} />
              <button onClick={() => setShowSearchResults(false)}>
                Return
              </button>
            </div>
          ) : (
            <Cards allPokemons={currentPokemons} />
          )}
        </>
      )}

      <Paginado
        className={styles.paginado}
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginated={paginated}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
