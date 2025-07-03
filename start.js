const axios = require("axios");
const FormData = require("form-data");
const discover = require("./discover");
const move = require("./move");

async function startGame(playerName) {
  try {
    const form = new FormData();
    form.append("player", playerName);

    const res = await axios.post(
      "https://hire-game-maze.pertimm.dev/start-game/",
      form,
      { headers: form.getHeaders() }
    );

    console.log("🎮 Partie lancée !");
    console.log("👤 Joueur :", res.data.player);
    console.log(
      "📍 Position de départ :",
      `(${res.data.position_x}, ${res.data.position_y})`
    );
    console.log("🧭 URL Move :", res.data.url_move);
    console.log("🔍 URL Discover :", res.data.url_discover);

    const cases = await discover(res.data.url_discover);

    const next = cases.find((cell) => cell.move && cell.value === "path");

    if (!next) {
      console.log("❗Aucune case sûre autour !");
      return;
    }

    await move(res.data.url_move, next.x, next.y);
  } catch (err) {
    console.error(
      "❌ Erreur de démarrage :",
      err.response?.data || err.message
    );
  }
}

startGame("malick");
