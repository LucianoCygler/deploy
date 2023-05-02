import React from "react";
import styles from "./paginado.module.css";

export default function Paginado({
  pokemonsPerPage,
  allPokemons,
  paginated,
  currentPage,
}) {
  const totalPages = Math.ceil(allPokemons / pokemonsPerPage);
  const pageLimit = 5;
  const halfPageLimit = Math.floor(pageLimit / 2);
  let startPage = currentPage - halfPageLimit;
  let endPage = currentPage + halfPageLimit;

  if (startPage < 1) {
    startPage = 1;
    endPage = startPage + pageLimit - 1;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - pageLimit + 1;
  }
  if (totalPages < pageLimit) {
    startPage = 1;
    endPage = totalPages;
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  const handleNext = () => {
    if (currentPage < totalPages) {
      paginated(currentPage + 1);
    }
  };
  const handleBack = () => {
    if (currentPage > 1) {
      paginated(currentPage - 1);
    }
  };
  const handleLast = () => {
    paginated(totalPages);
  };
  const handleFirst = () => {
    paginated(1);
  };
  return (
    <nav className={styles.container}>
      {totalPages > 1 && (
        <ul className={styles.paginadoContainer}>
          <li className={styles.pagina} onClick={handleFirst}>
            First
          </li>
          <li className={styles.pagina} onClick={handleBack}>
            Back
          </li>
          {pageNumbers.map((number) => (
            <li
              className={`${styles.pagina} ${
                currentPage === number ? styles.active : ""
              }`}
              onClick={() => paginated(number)}
            >
              <a>{number}</a>
            </li>
          ))}
          <li className={styles.pagina} onClick={handleNext}>
            Next
          </li>
          <li className={styles.pagina} onClick={handleLast}>
            Last
          </li>
        </ul>
      )}
    </nav>
  );
}
