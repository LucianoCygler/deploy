const { Pokemon } = require("../db");

const deletePokemon = async (name) => {
  const pokemon = await Pokemon.findOne({ where: { name } });
  if (!pokemon) {
    throw new Error(`No se encontró un Pokemon con el nombre ${name}`);
  }
  await pokemon.destroy();
  return `${name} fue eliminado exitosamente.`;
};

module.exports = deletePokemon;
