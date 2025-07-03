const axios = require("axios");

/**
 * Découvre les cases autour du joueur
 * @param {string} urlDiscover - URL retournée par start-game ou move
 */
async function discover(urlDiscover) {
  try {
    const res = await axios.get(urlDiscover);
    console.log("🔍 Cases autour de toi :");
    res.data.forEach((cell) => {
      console.log(
        `📍 (${cell.x}, ${cell.y}) - ${cell.value} - move: ${cell.move}`
      );
    });
    return res.data;
  } catch (err) {
    console.error(
      "❌ Erreur pendant la découverte :",
      err.response?.data || err.message
    );
  }
}

module.exports = discover;
