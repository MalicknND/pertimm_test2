const axios = require("axios");
const FormData = require("form-data");
const { discover } = require("./discover");

// start game
async function startGame(playerName) {
  const form = new FormData(); // create form data to send to the server
  form.append("player", playerName);

  const response = await axios.post(
    "https://hire-game-maze.pertimm.dev/start-game/",
    form,
    { headers: form.getHeaders() }
  );

  // Affiche les infos du démarrage
  console.log("🎮 Partie lancée !");
  console.log("👤 Joueur :", response.data.player);
  console.log(
    "📍 Position de départ :",
    `(${response.data.position_x}, ${response.data.position_y})`
  );
  console.log("🧭 URL Move :", response.data.url_move);
  console.log("🔍 URL Discover :", response.data.url_discover);

  // Découvre les cases autour du joueur
  await discover(response.data.url_discover);
}

// Test
startGame("malick");
