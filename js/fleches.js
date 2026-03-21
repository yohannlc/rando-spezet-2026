function getAngleFleche(current_coords, next_coords) {
    let angle = 0;
    if (current_coords[0] < next_coords[0] && current_coords[1] < next_coords[1]) {
        angle = Math.atan((next_coords[1] - current_coords[1]) / (next_coords[0] - current_coords[0])) * 180 / Math.PI;
    } else if (current_coords[0] < next_coords[0] && current_coords[1] > next_coords[1]) {
        angle = Math.atan((next_coords[1] - current_coords[1]) / (next_coords[0] - current_coords[0])) * 180 / Math.PI;
    } else if (current_coords[0] > next_coords[0] && current_coords[1] < next_coords[1]) {
        angle = Math.atan((next_coords[1] - current_coords[1]) / (next_coords[0] - current_coords[0])) * 180 / Math.PI + 180;
    } else if (current_coords[0] > next_coords[0] && current_coords[1] > next_coords[1]) {
        angle = Math.atan((next_coords[1] - current_coords[1]) / (next_coords[0] - current_coords[0])) * 180 / Math.PI + 180;
    } else if (current_coords[0] == next_coords[0] && current_coords[1] < next_coords[1]) {
        angle = 90;
    } else if (current_coords[0] == next_coords[0] && current_coords[1] > next_coords[1]) {
        angle = 270;
    } else if (current_coords[0] < next_coords[0] && current_coords[1] == next_coords[1]) {
        angle = 0;
    } else if (current_coords[0] > next_coords[0] && current_coords[1] == next_coords[1]) {
        angle = 180;
    }
    return angle;
}

function getFlechesByEuclidienneDistance(listeCircuitsVttWithCoords, distanceBetweenFleches) {
    let listeFlechesCircuits = [] // [[x, y, angle], ...]
    for (let i = 0; i < listeCircuitsVttWithCoords.length; i++) {
        let last_retained_coords = listeCircuitsVttWithCoords[i].coords[0];
        let somme_distance = 0;

        // On parcourt les coordonnées du circuit sauf les 50 dernières
        for (let j = 0; j < listeCircuitsVttWithCoords[i].coords.length - 50; j++) {
            current_coords = listeCircuitsVttWithCoords[i].coords[j];

            // Ajout de la distance entre les deux points à la somme
            somme_distance += Math.sqrt((current_coords[0] - last_retained_coords[0]) ** 2 + (current_coords[1] - last_retained_coords[1]) ** 2);

            // Si la somme des distances est supérieure à la fréquence des flèches, on ajoute une flèche
            if (somme_distance > distanceBetweenFleches) {

                next_coords = listeCircuitsVttWithCoords[i].coords[j + 1];

                let angle = getAngleFleche(current_coords, next_coords);

                middleCoords = [(current_coords[0] + next_coords[0]) / 2, (current_coords[1] + next_coords[1]) / 2];
                
                circuitName = listeCircuitsVttWithCoords[i].id;
                listeFlechesCircuits.push([middleCoords[0], middleCoords[1], angle, circuitName]);

                // On réinitialise la somme des distances
                somme_distance = 0;
                // On garde les coordonnées actuelles pour les comparer avec les prochaines
                last_retained_coords = current_coords;
            }
        }
    }

    return listeFlechesCircuits;
}

function getFlechesChoosingCoords(listeCircuitsWithCoords, listeChoosenFleches) {
    let listeFlechesCircuitsVtt = [] // [[x, y, angle], ...]

    for (let i = 0; i < listeCircuitsWithCoords.length; i++) {

        // On parcourt les coordonnées du circuit sauf les 20 dernières
        for (let j = 0; j < listeCircuitsWithCoords[i].coords.length - 20; j++) {
            current_coords = listeCircuitsWithCoords[i].coords[j];

            // Si c'est un point choisi, on ajoute une flèche
            if (listeChoosenFleches[i].points.includes(j)) {

                next_coords = listeCircuitsWithCoords[i].coords[j + 1];

                let angle = getAngleFleche(current_coords, next_coords);

                middleCoords = [(current_coords[0] + next_coords[0]) / 2, (current_coords[1] + next_coords[1]) / 2];
                
                circuitName = listeCircuitsWithCoords[i].id;
                listeFlechesCircuitsVtt.push([middleCoords[0], middleCoords[1], angle, circuitName]);
            }
        }
    }

    return listeFlechesCircuitsVtt;
}

// Dessiner les flèches selon le tableau listeFlechesCircuitsVtt
function calculateFlecheCoords(listeFlechesCircuits) {
    let listeFlechesCircuitsWithCoords = [];

    for (let i = 0; i < listeFlechesCircuits.length; i++) {
        let x = listeFlechesCircuits[i][0];
        let y = listeFlechesCircuits[i][1];
        let angle = listeFlechesCircuits[i][2];

        // Calcul des coordonnées des points de départ et d'arrivée des flèches
        let xf1 = x + longueurFleche * Math.cos((angle + angleFleche) * Math.PI / 180);
        let yf1 = y + longueurFleche * Math.sin((angle + angleFleche) * Math.PI / 180);

        let xf2 = x;
        let yf2 = y;

        let xf3 = x + longueurFleche * Math.cos((angle - angleFleche) * Math.PI / 180);
        let yf3 = y + longueurFleche * Math.sin((angle - angleFleche) * Math.PI / 180);

        circuitName = listeFlechesCircuits[i][3];
        listeFlechesCircuitsWithCoords.push([xf1, yf1, xf2, yf2, xf3, yf3, circuitName]);
    }

    return listeFlechesCircuitsWithCoords;
}


// Utiliser drawPortion pour dessiner les flèches
function drawFlechesVtt(listeFlechesCircuitsVtt) {
    for (let i = 0; i < listeFlechesCircuitsVtt.length; i++) {
        // Définir la couleur en fonction du nom du circuit et du tableau colorsCircuitsOut
        let circuitName = listeFlechesCircuitsVtt[i][6];
        for (let j = 0; j < listeCircuitsVtt.length; j++) {
            if (listeCircuitsVtt[j].id == circuitName) {
                if (mapStyle == 'mapbox://styles/mapbox/outdoors-v12') {
                    color = listeCircuitsVtt[j].colorOut;
                } else {
                    color = listeCircuitsVtt[j].colorSat;
                }
            }
        }
        

        drawPortion(
            circuitName + "_" + "fleche" + i,
            "fleche",
            [
                [
                    listeFlechesCircuitsVtt[i][0],
                    listeFlechesCircuitsVtt[i][1],
                    100
                ],
                [
                    listeFlechesCircuitsVtt[i][2],
                    listeFlechesCircuitsVtt[i][3],
                    100
                ],
                [
                    listeFlechesCircuitsVtt[i][4],
                    listeFlechesCircuitsVtt[i][5],
                    100
                ]
            ],
            lineWidthFleche,
            1,
            color
        );
    }
}

function drawFlechesMarche(listeFlechesCircuitsMarche) {
    for (let i = 0; i < listeFlechesCircuitsMarche.length; i++) {
        // Définir la couleur en fonction du nom du circuit et du tableau colorsCircuitsOut
        let circuitName = listeFlechesCircuitsMarche[i][6];
        for (let j = 0; j < listeCircuitsMarche.length; j++) {
            if (listeCircuitsMarche[j].id == circuitName) {
                if (mapStyle == 'mapbox://styles/mapbox/outdoors-v12') {
                    color = listeCircuitsMarche[j].colorOut;
                } else {
                    color = listeCircuitsMarche[j].colorSat;
                }
            }
        }
        

        drawPortion(
            circuitName + "_" + "fleche" + i,
            "fleche",
            [
                [
                    listeFlechesCircuitsMarche[i][0],
                    listeFlechesCircuitsMarche[i][1],
                    100
                ],
                [
                    listeFlechesCircuitsMarche[i][2],
                    listeFlechesCircuitsMarche[i][3],
                    100
                ],
                [
                    listeFlechesCircuitsMarche[i][4],
                    listeFlechesCircuitsMarche[i][5],
                    100
                ]
            ],
            lineWidthFleche,
            1,
            color
        );
    }
}

function addFlecheForACircuit(circuitName) {
    let listeFlechesCircuitsVtt = [] // [[x, y, angle], ...]

    // listeFlechesCircuitsVtt = getFlechesByEuclidienneDistance(listeCircuitsVtt, distanceBetweenFleches);
    listeFlechesCircuitsVtt = getFlechesChoosingCoords(listeCircuitsVtt, listeChoosenFlechesVtt);
    listeFlechesCircuitsVtt = calculateFlecheCoords(listeFlechesCircuitsVtt);

    let listeFlechesCircuit = listeFlechesCircuitsVtt.filter(fleche => fleche[6] == circuitName);
    drawFlechesVtt(listeFlechesCircuit);

    let listeFlechesCircuitsMarche = []

    listeFlechesCircuitsMarche = getFlechesChoosingCoords(listeCircuitsMarche, listeChoosenFlechesMarche);
    listeFlechesCircuitsMarche = calculateFlecheCoords(listeFlechesCircuitsMarche);

    let listeFlechesCircuitMarche = listeFlechesCircuitsMarche.filter(fleche => fleche[6] == circuitName);
    drawFlechesMarche(listeFlechesCircuitMarche);
}

function removeFlecheCircuitsMarche() {
    for (let i = 0; i < listeCircuitsMarche.length; i++) {
        for (let j = 0; j < listeChoosenFlechesMarche[i].points.length; j++) {
            map.removeLayer(listeCircuitsMarche[i].id + "_fleche" + j);
            map.removeSource(listeCircuitsMarche[i].id + "_fleche" + j);
        }
    }
}

// Fonction pour ajouter les flèches
function addFlechesCircuitsVTT() {
    for (let i = 0; i < listeCircuitsVtt.length; i++) {
        addFlecheForACircuit(listeCircuitsVtt[i].id);
    }
}

function addFlechesCircuitsMarche() {
    for (let i = 0; i < listeCircuitsMarche.length; i++) {
        addFlecheForACircuit(listeCircuitsMarche[i].id);
    }
}