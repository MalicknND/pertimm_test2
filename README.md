# 🎮 Test Technique Pertimm - Niveau 2
## Jeu de Labyrinthe Automatisé

Ce projet implémente une solution automatisée pour résoudre le jeu de labyrinthe du test technique de niveau 2 de Pertimm. L'objectif est de démontrer les capacités à manipuler des APIs REST, architecturer une solution logicielle et implémenter une approche d'intelligence artificielle.

## 🎯 Objectifs du Test Technique

Ce test technique de niveau 2 évalue vos aptitudes à :
- **Manipuler des verbes HTTP** (GET et POST) pour dialoguer avec un serveur REST
- **Architecturer une solution logicielle** de manière modulaire et maintenable
- **Utiliser un langage de programmation** pour mettre en place une approche d'intelligence artificielle
- **Résoudre un labyrinthe** en utilisant le moins de déplacements possible tout en évitant les pièges

## 🎮 Présentation du Jeu

Le jeu est un labyrinthe qui comprend :
- **Départ** : Position par défaut du joueur (X:0, Y:0)
- **Arrivée** : Position gagnante (case "stop")
- **Murs** : Positions infranchissables (case "wall")
- **Pièges** : Positions entraînant une défaite (case "trap")
- **Chemins** : Positions libres pour se déplacer (case "path")

### Système de coordonnées
- **X** : Position sur l'axe des abscisses (horizontal)
- **Y** : Position sur l'axe des ordonnées (vertical)
- **Origine** : (X:0, Y:0) en haut à gauche
- **Direction** : X augmente vers la droite, Y augmente vers le bas

## 🚀 Fonctionnalités Implémentées

Le projet comprend trois modules principaux qui correspondent aux actions du jeu :

1. **🎮 Démarrage de partie** (`start.js`) - Initialise une nouvelle partie
2. **🔍 Découverte** (`discover.js`) - Explore les cases environnantes
3. **🚶 Déplacement** (`move.js`) - Effectue les mouvements du joueur

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Axios** - Client HTTP pour les requêtes API
- **Form-data** - Gestion des données de formulaire multipart
- **Async/Await** - Gestion asynchrone des requêtes

## 📋 Prérequis

- Node.js 14+ 
- npm ou yarn

## 🚀 Installation et démarrage

1. **Cloner le projet**
   ```bash
   git clone https://github.com/MalicknND/pertimm_test2
   cd pertimm_test2
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le jeu**
   ```bash
   node start.js
   ```

## 📁 Structure du projet

```
pertimm_test2/
├── start.js          # Point d'entrée - démarrage de partie
├── discover.js       # Module de découverte des cases
├── move.js           # Module de déplacement du joueur
├── package.json      # Dépendances du projet
├── package-lock.json # Verrouillage des versions
└── README.md         # Documentation
```

## 🔧 API Documentation

### Base URL
```
https://hire-game-maze.pertimm.dev/
```

### 1. 🎮 Start Game - Démarrage de partie

**Endpoint :** `POST /start-game/`

**Paramètres :**
- `player` (string) : malick

**Réponse :**
```json
{
  "player": "nom_du_joueur",
  "position_x": 0,
  "position_y": 0,
  "dead": false,
  "win": false,
  "url_move": "https://hire-game-maze.pertimm.dev/malick/move/",
  "url_discover": "https://hire-game-maze.pertimm.dev/malick/discover/"
}
```

### 2. 🔍 Discover - Découverte de la Map

**Endpoint :** `GET {url_discover}`

**Réponse :**
```json
[
  {
    "x": 0,
    "y": 1,
    "move": true,
    "value": "path"
  },
  {
    "x": 1,
    "y": 0,
    "move": false,
    "value": "wall"
  }
]
```

**Types de cases possibles :**
- `wall` : Mur infranchissable
- `path` : Chemin libre
- `trap` : Piège (défaite)
- `home` : Position de départ
- `stop` : Arrivée (victoire)

### 3. 🚶 Move - Déplacement

**Endpoint :** `POST {url_move}`

**Paramètres :**
- `position_x` (int) : Nouvelle position X
- `position_y` (int) : Nouvelle position Y

**Réponse :**
```json
{
  "player": "nom_du_joueur",
  "message" : "Move forbidden. Be patient"
  "position_x": 1,
  "position_y": 0,
  "dead": false,
  "win": false,
  "url_move": "https://hire-game-maze.pertimm.dev/malick/move/",
  "url_discover": "https://hire-game-maze.pertimm.dev/malick/discover/"
}
```

## 🧠 Algorithme de Résolution Implémenté

L'algorithme actuel implémente une stratégie simple mais efficace :

### Logique de sélection
```javascript
const next = cases.find((cell) => cell.move && cell.value === "path");
```

Cette approche :
1. **Filtre les cases accessibles** (`cell.move === true`)
2. **Privilégie les chemins sûrs** (`cell.value === "path"`)
3. **Évite les pièges** (ne sélectionne jamais `trap`)
4. **Ignore les murs** (ne sélectionne jamais `wall`)

### Flux d'exécution
1. **Démarrage** : Initialise la partie et récupère les URLs d'action
2. **Découverte** : Explore les cases environnantes
3. **Sélection** : Choisit la première case "path" disponible
4. **Déplacement** : Effectue le mouvement sélectionné
5. **Répétition** : Continue jusqu'à victoire ou défaite

## 🎮 Utilisation

### Démarrage simple
```bash
node start.js
```

### Modification du nom de joueur
Dans `start.js`, modifiez la dernière ligne :
```javascript
startGame("votre_nom_de_joueur");
```

### Exécution manuelle des modules
```bash
# Découverte (nécessite une URL valide)
node discover.js

# Déplacement (nécessite une URL et des coordonnées valides)
node move.js
```

## 📈 Exemple de sortie

```
🎮 Partie lancée !
👤 Joueur : malick
📍 Position de départ : (0, 0)
🧭 URL Move : https://hire-game-maze.pertimm.dev/move/...
🔍 URL Discover : https://hire-game-maze.pertimm.dev/discover/...

🔍 Cases autour de toi :
📍 (0, 1) - path - move: true
📍 (1, 0) - wall - move: false

📤 Envoi move vers : https://hire-game-maze.pertimm.dev/move/... { position_x: 0, position_y: 1 }
🚶 Déplacement vers (0, 1)
📍 Nouvelle position : (0, 1)
```

## 🚨 Gestion d'erreurs

Le projet inclut une gestion d'erreurs robuste :

- **Erreurs réseau** : Affichage des messages d'erreur HTTP
- **Erreurs de validation** : Gestion des réponses d'erreur de l'API
- **Cases bloquées** : Détection de l'absence de mouvements possibles
- **États de fin** : Gestion de la victoire et de la défaite


---

Ce projet est créé dans le cadre du test technique de niveau 2 de Pertimm.

---

**Développé avec ❤️ pour le test technique Pertimm - Niveau 2**

*Solution automatisée pour le jeu de labyrinthe utilisant l'API REST Pertimm* 