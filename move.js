const axios = require("axios");
const FormData = require("form-data");

async function move(urlMove, x, y) {
  try {
    // use form data to send the move to the server
    const form = new FormData();
    form.append("position_x", x);
    form.append("position_y", y);

    console.log("📤 Envoi move vers :", urlMove, {
      position_x: x,
      position_y: y,
    });

    const res = await axios.post(urlMove, form, {
      headers: form.getHeaders(),
    });

    console.log(`🚶 Déplacement vers (${x}, ${y})`);
    if (res.data.dead) {
      console.log("💀 Tu es tombé dans un piège !");
    } else if (res.data.win) {
      console.log("🎉 Tu as gagné !");
    } else {
      console.log(
        "📍 Nouvelle position :",
        `(${res.data.position_x}, ${res.data.position_y})`
      );
    }

    return res.data;
  } catch (err) {
    console.error(
      "❌ Erreur pendant le déplacement du joueur :",
      err.response?.data || err.message
    );
  }
}

module.exports = move;
