import { useDispatch } from "react-redux";
import { resetFilter } from "../../redux/actions/actions";
import styles from "./filter.module.css";

const Filter = ({
  types,
  handleFilterType,
  handleFilterOrigin,
  order,
  handleFilterDefense,
  orderByAttack,
}) => {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetFilter());
    document.getElementById("filter-form").reset();
  };
  return (
    <form id="filter-form" className={styles.contenedortodos}>
      <div>
        <h2 className={styles.filterby}>Filter by:</h2>
      </div>

      <div>
        <span>Types </span>
        <div className={styles.selectContainer}>
          <select onChange={handleFilterType}>
            <option value="All">All</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <span>Origin </span>
        <div className={styles.selectContainer}>
          <select name="" onChange={handleFilterOrigin}>
            <option value="All">All</option>
            <option value="DataBase">DataBase</option>
            <option value="Api">Api</option>
          </select>
        </div>
      </div>
      <div>
        <span>Order a-z </span>
        <div className={styles.selectContainer}>
          <select
            name=""
            onChange={order}
            className={styles.selectororder}
            defaultValue=""
          >
            <option value=""></option>
            <option value="ascendente">Ascending</option>
            <option value="descendente">Descending</option>
          </select>
        </div>
      </div>
      <div>
        <span>by attack</span>
        <div className={styles.selectContainer}>
          <select name="" onChange={orderByAttack} defaultValue="">
            <option value=""></option>
            <option value="ascendente">Ascending</option>
            <option value="descendente">Descending</option>
          </select>
        </div>
      </div>
      <div>
        <span>by defense</span>
        <div className={styles.selectContainer}>
          <select onChange={handleFilterDefense} defaultValue="">
            <option value=""></option>
            <option value="ascendente">Ascending</option>
            <option value="descendente">Descending</option>
          </select>
        </div>
      </div>
      <div>
        <button onClick={handleReset}>Reset Filters</button>
      </div>
    </form>
  );
};
export default Filter;
