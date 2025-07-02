const axios = require("axios");
const FormData = require("form-data");

// start game
async function startGame(playerName) {
  const form = new FormData(); // create form data to send to the server
  form.append("player", playerName);

  const response = await axios.post(
    "https://hire-game-maze.pertimm.dev/start-game/",
    form,
    { headers: form.getHeaders() }
  );

  return response.data;
}

// Test
startGame("malick")
  .then(console.log)
  .catch((err) => console.error(err.response?.data || err.message));
