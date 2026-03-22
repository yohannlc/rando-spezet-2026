let typePortions = 'vttSansPo'; // état initial : on affiche les circuits VTT sans portions

let checkboxTypeAll = document.getElementById("typeAllCliq").checked;
let type;
if (checkboxTypeAll) {
  type = 'all';
} else {
  type = 'vttSansPo';
}

let checkboxMapStyle = document.getElementById("mapStyleCheckbox")  ;

// Savoir quel est le type d'appareil (pc ou smartphone)
let smartphone = false; //par défaut, on considère que c'est un pc
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { //si c'est un smartphone
  smartphone = true;
}

// Zoom de départ en fonction du support
let zoomStart = 12.3; //zoom d'un pc pour voir tous les circuits
if (smartphone == true) {
  zoomStart = 10.8; //zoom d'un smartphone pour voir tous les circuits
}

/* --------------------------------- Circuits --------------------------------- */

// Liste des circuits VTT avec ces coordonnées
const listeCircuitsVtt = [
  { id: "circuitVtt5", coords: coordsCircuitVtt5, length: metaDatasCircuitVtt5.longueur, elevation: metaDatasCircuitVtt5.denivele, colorOut: 'rgb(0, 0, 0)', colorSat: 'rgb(255, 255, 255)'},
  { id: "circuitVtt4", coords: coordsCircuitVtt4, length: metaDatasCircuitVtt4.longueur, elevation: metaDatasCircuitVtt4.denivele, colorOut: 'rgb(255, 0, 0)', colorSat: 'rgb(255, 0, 0)'},
  { id: "circuitVtt3", coords: coordsCircuitVtt3, length: metaDatasCircuitVtt3.longueur, elevation: metaDatasCircuitVtt3.denivele, colorOut: 'rgb(196, 94, 189)', colorSat: 'rgb(196, 94, 189)'},
  { id: "circuitVtt2", coords: coordsCircuitVtt2, length: metaDatasCircuitVtt2.longueur, elevation: metaDatasCircuitVtt2.denivele, colorOut: 'rgb(255, 228, 0)', colorSat: 'rgb(255, 228, 0)'},
  { id: "circuitVtt1", coords: coordsCircuitVtt1, length: metaDatasCircuitVtt1.longueur, elevation: metaDatasCircuitVtt1.denivele, colorOut: 'rgb(6, 167, 199)', colorSat: 'rgb(6, 167, 199)'},
  { id: "circuitVtt0", coords: coordsCircuitVtt0, length: metaDatasCircuitVtt0.longueur, elevation: metaDatasCircuitVtt0.denivele, colorOut: 'rgb(0, 153, 36)', colorSat: 'rgb(49, 215, 107)'},
];
const listeCircuitsMarche = [
  { id: "circuitMarche2", coords: coordsCircuitMarche2, colorOut: 'rgb(236, 121, 75)', colorSat: 'rgb(236, 121, 75)'},
  { id: "circuitMarche1", coords: coordsCircuitMarche1, colorOut: 'rgb(174, 69, 255)', colorSat: 'rgb(174, 69, 255)'},
  { id: "circuitMarche0", coords: coordsCircuitMarche0, colorOut: 'rgb(58, 44, 189)', colorSat: 'rgb(58, 44, 189)'}
];

let tabStatesCircuits = {
  stateCircuitVtt0: [false, listeCircuitsVtt[0].id],
  stateCircuitVtt1: [false, listeCircuitsVtt[1].id],
  stateCircuitVtt2: [false, listeCircuitsVtt[2].id],
  stateCircuitVtt3: [false, listeCircuitsVtt[3].id],
  stateCircuitVtt4: [false, listeCircuitsVtt[4].id],
  stateCircuitVtt5: [false, listeCircuitsVtt[5].id],

  stateCircuitMarche0: [false, listeCircuitsMarche[0].id],
  stateCircuitMarche1: [false, listeCircuitsMarche[1].id],
  stateCircuitMarche2: [false, listeCircuitsMarche[2].id]
};

const lineWidthsCircuit = {
  All_Out: 2.5,
  All_Sat: 3.5, // 3.5 pour screen sinon 4
  NotAll_Out: 5,
  NotAll_Sat: 3.5 // 3.5 pour screen sinon 4
};

const lineWidthsCircuitByZoom = {
  SmallZoom: 1,
  MediumZoom: 1,
  LargeZoom: 1
}

const offsetsCircuits = {
  All_Out: 0.00006, // 0.0002 pour screen sinon 0.00006
  All_Sat: 0.00006, // 0.0002 pour screen sinon 0.00006
  NotAll_Out: 0.00004, // 0.0002 pour screen sinon 0.00004
  NotAll_Sat: 0.00004 // 0.0002 pour screen sinon 0.00004
};

let lineOpacityCircuit = 1;
let lineOpacityBackCircuit = 0.15;
let offsetLineWithCircuit = 1.2;

if (checkboxMapStyle == true) {
  lineWidthCircuit = type == 'all' ? lineWidthsCircuit.All_Sat : lineWidthsCircuit.NotAll_Sat;
  offset = type == 'all' ? offsetsCircuits.All_Sat : offsetsCircuits.NotAll_Sat;
} else {
  lineWidthCircuit = type == 'all' ? lineWidthsCircuit.All_Out : lineWidthsCircuit.NotAll_Out;
  offset = type == 'all' ? offsetsCircuits.All_Out : offsetsCircuits.NotAll_Out;
}

// Décalage des traces
let signe = 1;
let j = 0;
for (let i = 0; i < listeCircuitsVtt.length; i++) {
  // Centré au milieu, la trace du milieu de tableau sera au milieu (coordonnées non décalées)
  // let currentOffset = (offset * i)-offset*(listeCircuitsVtt.length/2);

  // Le premier au milieu, les autres autour
  if ((i+1)%2 == 0) {
    j++;
  }
  signe = signe * -1;
  let currentOffset = (offset * j)*signe;
  
  for (let j = 0; j < listeCircuitsVtt[i].coords.length; j++) {
    listeCircuitsVtt[i].coords[j][0] += currentOffset;
    listeCircuitsVtt[i].coords[j][1] += currentOffset;
  }
}

for (let i = 0; i < listeCircuitsMarche[0].coords.length; i++) {
  listeCircuitsMarche[0].coords[i][0] += offset*1.5;
  listeCircuitsMarche[0].coords[i][1] += offset*1.5;
}
for (let i = 0; i < listeCircuitsMarche[1].coords.length; i++) {
  listeCircuitsMarche[1].coords[i][0] += offset*2.5;
  listeCircuitsMarche[1].coords[i][1] += offset*2.5;
}
for (let i = 0; i < listeCircuitsMarche[2].coords.length; i++) {
  listeCircuitsMarche[2].coords[i][0] += offset*3;
  listeCircuitsMarche[2].coords[i][1] += offset*3;
}


/* --------------------------------- Portions --------------------------------- */

let lineWitdhPortions = 15;
let lineWitdhPortionsPoly = 20;
let lineOpacityPortions = 0.6;

const colorsPortions = {
  Debrou_Out: "rgb(0, 174, 255)",
  Debrou_Sat: "rgb(0, 255, 255)",
  Souff_Out: "rgb(184, 21, 21)",
  Souff_Sat: "rgb(255, 0, 0)",
  PY_Out: "rgb(255, 255, 0)",
  PY_Sat: "rgb(255, 255, 0)",
  Tronco_Out: "rgb(88, 61, 21)",
  Tronco_Sat: "rgb(244, 214, 148)",
  Cotes: "rgb(0, 255, 162)"
};

lineOpacityPortions_Out = 0.6;
lineOpacityPortions_Sat = 0.8;

if (checkboxMapStyle == true) {
  colorTronco = colorsPortions.Tronco_Sat;
  lineOpacityPortions = lineOpacityPortions_Sat;
} else {
  colorTronco = colorsPortions.Tronco_Out;
  lineOpacityPortions = lineOpacityPortions_Out;
}

const descriptions = {
  "verger1": "Faire les côtés avec une débroussailleuse",
  "verger2": "Faire les côtés avec une débroussailleuse",
  "ravitoTerrePleinBoisBernard": "28 - 13<sup>e</sup> km<br>32 - 14<sup>e</sup> km<br>37 - 14<sup>e</sup> km<br>42 - 14<sup>e</sup> km<br>50 - 14<sup>e</sup> km",
  "ravitoBallTrap": "37 - 21<sup>e</sup> km<br>42 - 23<sup>e</sup> km<br>50 - 26<sup>e</sup> km",
  "ravitoTrevillyIzela": "18 - 10<sup>e</sup> km<br>28 - 21<sup>e</sup> km<br>32 - 23<sup>e</sup> km<br>37 - 29<sup>e</sup> km<br>42 - 33<sup>e</sup> km<br>50 - 39<sup>e</sup> km",
};

const listePortions = [
  { id: "verger1", type: "cotes", coords: verger1, color: colorsPortions.cotes, descriptions: descriptions["verger1"] },
  { id: "verger2", type: "cotes", coords: verger2, color: colorsPortions.cotes, descriptions: descriptions["verger2"] }
];

let tabStatesPortions = [
  "verger1",false,
  "verger2",false,
  "stang1",false,
  "champLise",false,
  "cozic1",false,
  "kerbellec1",false,
  "kerbellec2",false,
  "kerbellec3",false,
  "saintGoazec1",false,
  "saintGoazec3",false,
  "halage1",false,
  "boisRuisseauCrann",false,
  "remonterVersPalae",false,
  "descenteKerdaffret",false,
  "parcALapin",false,
]

/* --------------------------------- Points --------------------------------- */

const circlesRadius = { 
  out: 10, 
  sat: 10
};

const colorsRavito = {
  sat: "rgb(247, 130, 34)",
  out: "rgb(0, 72, 255)"
}

if (checkboxMapStyle == true) {
  colorRavito = colorsRavito.sat;
  circleRadius = circlesRadius.sat;
} else {
  colorRavito = colorsRavito.out;
  circleRadius = circlesRadius.out;
}

/* --------------------------------- Flèches --------------------------------- */

const distanceBetweenFleches = 0.6;
const longueurFleche = 0.001;
const angleFleche = 145;
const lineWidthFleche = 5;

const listeChoosenFlechesVtt = [
  { id: listeCircuitsVtt[0].id, points: [645, 945, 1360, 1915] },
  { id: listeCircuitsVtt[1].id, points: [250, 858, 1410, 1650] },
  { id: listeCircuitsVtt[2].id, points: [300, 450, 645, 1400] },
  { id: listeCircuitsVtt[3].id, points: [125, 985] },
  { id: listeCircuitsVtt[4].id, points: [250, 525] },
  { id: listeCircuitsVtt[5].id, points: [43, 258, 600, 785] },
]

const listeChoosenFlechesMarche = [
  { id: listeCircuitsMarche[0].id, points: [25, 141, 251, 332] },
  { id: listeCircuitsMarche[1].id, points: [25, 67, 162, 230, 312] },
  { id: listeCircuitsMarche[2].id, points: [25, 138, 175] }
]