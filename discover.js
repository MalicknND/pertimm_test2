const axios = require("axios");

/**
 * Découvre les cases autour du joueur
 * @param {string} urlDiscover - URL retournée par start-game ou move
 */

async function discover(urlDiscover) {
  try {
    const response = await axios.get(urlDiscover);
    console.log("Cases autour du joueur :", response.data);
    response.data.forEach((cell) => {
      console.log(`${cell.x},${cell.y} - ${cell.move} - ${cell.value}`);
    });
  } catch (error) {
    console.error(
      "Erreur lors de la découverte des cases :",
      error.response?.data || error.message
    );
  }
}

module.exports = { discover };
