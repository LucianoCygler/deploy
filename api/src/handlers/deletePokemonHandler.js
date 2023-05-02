const deletePokemon = require("../controllers/deletePokemon");
const deletePokemonHandler = async (req, res) => {
  const { name } = req.params;
  try {
    const deletedPokemon = await deletePokemon(name);
    res.status(201).send(deletedPokemon);
  } catch (error) {
    res
      .status(500)
      .send(`Error al intentar eliminar el pokemon: ${error.message}`);
  }
};
module.exports = deletePokemonHandler;
