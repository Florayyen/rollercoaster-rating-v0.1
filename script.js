// Achterbahn-Datenbank mit Bildern
const achterbahnen = [
  { 
    name: "Wildfire", 
    park: "Kolmården Wildlife Park", 
    elo: 1200, 
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/WildfireKolm%C3%A5rden2017.jpg" 
  },
  { 
    name: "Kingda Ka", 
    park: "Six Flags Great Adventure", 
    elo: 1200, 
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Kingda_Ka.jpg" 
  },
  { 
    name: "Taron", 
    park: "Phantasialand", 
    elo: 1200, 
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Taron-1.jpg" 
  },
  { 
    name: "The Ride to Happiness", 
    park: "Plopsaland De Panne", 
    elo: 1200, 
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Plopsaland_De_Panne_-_The_Ride_to_Happiness_by_Tomorrowland_%28B080%29.JPG" 
  },
  { 
    name: "Helix", 
    park: "Liseberg", 
    elo: 1200, 
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Helix%2C_Liseberg_2014-04-26_03_%28crop%29.jpg" 
  }
];

// DOM-Elemente abrufen
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const rankingList = document.getElementById("ranking-list");

// Zufällige Auswahl von zwei Achterbahnen
function pickTwoRandom(list) {
  let index1 = Math.floor(Math.random() * list.length);
  let index2;
  do {
    index2 = Math.floor(Math.random() * list.length);
  } while (index1 === index2);
  return [list[index1], list[index2]];
}

// Zwei Achterbahnen anzeigen
function showRandomChoices() {
  const [a, b] = pickTwoRandom(achterbahnen);

  // Option 1 mit Bild und Text
  option1.innerHTML = `
    <img src="${a.image}" alt="${a.name}" />
    <div>${a.name}<br>${a.park}</div>
  `;
  // Option 2 mit Bild und Text
  option2.innerHTML = `
    <img src="${b.image}" alt="${b.name}" />
    <div>${b.name}<br>${b.park}</div>
  `;

  // Klick-Handler setzen
  option1.onclick = () => vote(a, b);
  option2.onclick = () => vote(b, a);
}

// Abstimmung verarbeiten und ELO-Werte anpassen
function vote(winner, loser) {
  calculateElo(winner, loser);
  updateRanking();
  showRandomChoices();
}

// ELO-Berechnung
function calculateElo(winner, loser) {
  const k = 32;
  const expectedWinner = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
  const expectedLoser = 1 - expectedWinner;

  winner.elo += Math.round(k * expectedLoser);
  loser.elo -= Math.round(k * expectedLoser);
}

// Ranking aktualisieren
function updateRanking() {
  rankingList.innerHTML = ""; // Bestehende Liste leeren

  // Top 10 sortieren und anzeigen
  const top10 = [...achterbahnen]
    .sort((a, b) => b.elo - a.elo)
    .slice(0, 10);

  top10.forEach((bahn, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${bahn.name} (${bahn.park}): ${bahn.elo}`;
    rankingList.appendChild(li);
  });
}

// Initiale Anzeige
updateRanking();
showRandomChoices();
