// Fonction qui permet de mettre l'opacité de tous les circuits à lineOpacityBackCircuit sauf celui en argument
function setOnlyOneTrace(circuitName, circuitState, circuitItem) {    
    resetAllTraces();
    stateLine(circuitName, circuitState, circuitItem);

    for (let i of Object.values(tabStatesCircuits)) { // Pour chaque circuit
        if (i[1] != circuitName) { // Si le circuit n'est pas celui en argument
            if (!(type !="all" && (i[1] == "circuitMarche2" || i[1] == "circuitMarche1" || i[1] == "circuitMarche0"))) {
                changeCircuitState(i[1], lineOpacityBackCircuit, lineWidthCircuit);
            }
        }
    }
}

function updateLegend(mapStyle) {
    const divLegend = document.getElementById("divLegendId");
    const divParams = document.getElementById("divParamsId");
    var divs = document.getElementsByClassName('legend-circuit');
    
    const applyBackgroundColor = (element, color) => {
        element.getElementsByTagName('span')[0].setAttribute('style', `background-color: ${color}; height: 3px;`);
    };

    const updateCircuitText = (div, circuit) => {
        let elevationRounded = Math.round(circuit.elevation);
        div.innerHTML = `<span style="background-color: ${circuit.colorOut}; height: 3px;"></span> ${circuit.length} km &#8599;${elevationRounded}m`;
    };

    const updatePointsColors = (color) => {
        document.getElementById("legendPoints").getElementsByTagName('span')[0].setAttribute('style', `background-color: ${color};`);
    }

    const updatePortionColors = (divs) => {
        /!/ // à changer, mettre les numeros de divs en dynamique selon la longueur des circuits
        applyBackgroundColor(divs[8], colorsPortions.Debrou_Sat);
        applyBackgroundColor(divs[9], colorsPortions.Souff_Sat);
        applyBackgroundColor(divs[10], colorsPortions.Tronco_Sat);
        applyBackgroundColor(divs[11], colorsPortions.PY_Sat);
        applyBackgroundColor(divs[11], colorsPortions.Cotes);
    };

    if (mapStyle == "satellite") {
        divLegend.classList.add("legend-satellite");
        divParams.classList.add("params-satellite");

        for (let i = 0; i < listeCircuitsVtt.length; i++) { 
            applyBackgroundColor( divs[i], listeCircuitsVtt[listeCircuitsVtt.length - 1 - i].colorSat);
        }

        for (let i = 0; i < listeCircuitsMarche.length; i++) {
            applyBackgroundColor(divs[i + listeCircuitsVtt.length], listeCircuitsMarche[listeCircuitsMarche.length - 1 - i].colorSat);
        }

        updatePointsColors(colorsRavito.sat);
    } else {
        divLegend.classList.remove("legend-satellite");
        divParams.classList.remove("params-satellite");

        for (let i = 0; i < listeCircuitsVtt.length; i++) { 
            let circuit = listeCircuitsVtt[listeCircuitsVtt.length - 1 - i];
            let div = divs[i];
            applyBackgroundColor(div, circuit.colorOut);
            updateCircuitText(div, circuit);
        }

        for (let i = 0; i < listeCircuitsMarche.length; i++) {
            applyBackgroundColor(divs[i + listeCircuitsVtt.length], listeCircuitsMarche[listeCircuitsMarche.length - 1 - i].colorOut);
        }

        // console.log(colorsRavito.out);
        updatePointsColors(colorsRavito.out);
    }
}

function resetAllTraces() {
    let j = 0;
    for (let circuit of Object.values(tabStatesCircuits)) {               // Pour chaque circuit
        if (circuit[0] == true) {                                         // Si la trace est activée
            circuit[0] = false;                                           // On remet l'état de la trace à false                              
            cacherDivTexteId();
        }
        // Si le type est "all" (donc VTT + marche) ou que le circuit actuel n'est pas un circuit marche
        if (type =="all" || (circuit[1] != "circuitMarche2" && circuit[1] != "circuitMarche1" && circuit[1] != "circuitMarche0")) {
            stateLine(circuit[1], circuit[0], items[j]);                  // On remet l'opacité de la ligne à la normale
        }
        j++;                                                              // Permet de suivre quel élément du tableau tabStatesCircuits on est en train de traiter
    }
}

// Fonction qui change le width de la line et sa légende en argument en bold et met reset le reste 
function stateLine(circuitName, state, item) {
    if (state) {
        changeCircuitState(circuitName, lineOpacityCircuit, lineWidthCircuit+offsetLineWithCircuit)
        item.classList.add('bold');
    } else {
        changeCircuitState(circuitName, lineOpacityCircuit, lineWidthCircuit);
        item.classList.remove('bold');
    }
}

function changeCircuitState(circuitName, opacity, width) {
    map.setPaintProperty(circuitName, 'line-opacity', opacity);
    map.setPaintProperty(circuitName, 'line-width', width);
    let i = 0;
    while (map.getLayer(circuitName + "_fleche" + i)) {
        map.setPaintProperty(circuitName + "_fleche" + i, 'line-opacity', opacity);
        map.setPaintProperty(circuitName + "_fleche" + i, 'line-width', width);
        i++;
    }
}

function changeSelonZoom(currentZoom) {
    if (currentZoom < 13) {
        changeLineWidthCircuit(lineWidthCircuit * lineWidthsCircuitByZoom.SmallZoom);
    } else if (currentZoom >= 13 && currentZoom < 14  ) {
        changeLineWidthCircuit(lineWidthCircuit * lineWidthsCircuitByZoom.MediumZoom);
    } else {
        changeLineWidthCircuit(lineWidthCircuit * lineWidthsCircuitByZoom.LargeZoom);
    }
}

// Fonction pour changer l'épaissseur des portions
function changeLineWidthCircuit(lineWidth) {
    for (let i = 0; i < listeCircuitsVtt.length; i++) {
        map.setPaintProperty(listeCircuitsVtt[i].id, 'line-width', lineWidth);
    }
    
    if (type == "all") {
        for (let i = 0; i < listeCircuitsMarche.length; i++) {
            map.setPaintProperty(listeCircuitsMarche[i].id, 'line-width', lineWidth);
        }
    }
}

// Gérer l'affichage de la popup de texte
function afficherDivTexteId(portionName) {
    // Sépare le mot en lettre et en chiffre
    const match = portionName.match(/^([a-zA-Z]+)(\d+)?([a-zA-Z\s]*)/);
    if (!match) {
      // La chaîne ne correspond pas au format attendu
      return;
    }
    const lettre = match[1];
    const chiffre = match[2] || "";
    const texte = match[3] ? match[3].replace(/\d+/g, '').trim() : "";
    
    // Met la première lettre de chaque mot en majuscule
    const lettreMajuscule = lettre.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const texteMajuscule = texte.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Affiche le texte dans l'élément HTML
    const textId = document.getElementById("textId");
    textId.innerHTML = `${lettreMajuscule} ${chiffre} ${texteMajuscule}`;
    
    // Affiche la description dans une autre balise HTML
    const descriptionId = document.getElementById("descriptionId");
    if (descriptions.hasOwnProperty(portionName)) {
      descriptionId.innerHTML = descriptions[portionName];
    } else {
      descriptionId.innerHTML = "";
    }
    
    // Affiche la div
    const divTexteId = document.getElementById("divTexteId");
    divTexteId.classList.add("show");
}

function cacherDivTexteId() { // Fonction pour cacher
    divTexteId.classList.remove("show");
}

function updateConstantsByMapStyle(mapStyle) {
    if (mapStyle == "outdoor") {;
        if (type == 'all') {
            lineWidthCircuit = lineWidthsCircuit.All_Out;
            offset = offsetsCircuits.All_Out;
        } else {
            lineWidthCircuit = lineWidthsCircuit.NotAll_Out;
            offset = offsetsCircuits.NotAll_Out;
        }

        colorDebrou = colorsPortions.Debrou_Out;
        colorSouff = colorsPortions.Souff_Out;
        colorPY = colorsPortions.PY_Out;
        colorTronco = colorsPortions.Tronco_Out;

        colorRavito = colorsRavito.out;
    } else {
        if (type == 'all') {
            lineWidthCircuit = lineWidthsCircuit.All_Sat;
            offset = offsetsCircuits.All_Sat;
        } else {
            lineWidthCircuit = lineWidthsCircuit.NotAll_Sat;
            offset = offsetsCircuits.NotAll_Sat;
        }

        colorDebrou = colorsPortions.Debrou_Sat;
        colorSouff = colorsPortions.Souff_Sat;
        colorPY = colorsPortions.PY_Sat;
        colorTronco = colorsPortions.Tronco_Sat;

        colorRavito = colorsRavito.sat;
    }
}

// Fonction qui change le type de d'affichage
function toggleMarcheDisplay(checkboxTypeAll) {
    if (checkboxTypeAll.checked) {
        type = 'all';
        addCircuitsMarche();
        // addFlechesCircuitsMarche();
        addRavitosMarche();
    } else {
        type = 'notAll';
        removeCircuitsMarche();
        // removeFlecheCircuitsMarche();
        removeRavitosMarche();
    }
}

function togglePortionsDisplay(checkbox) {
    if (checkbox.checked) {
        typePortions = 'vttAvecPo';
        addPortions();
        addLegendPortions();
    } else {
        typePortions = 'vttSansPo';
        removePortions();
        removeLegendPortions();
    }
}

function changeCheckboxCircCliq() {
    if (document.getElementById("cirqCliq").checked == true) {
        boolCircleCliq = true;
    } else {
        boolCircleCliq = false;
        resetAllTraces();
    }
}

function addLegendPortions() {
    const textPortionsDivId = document.getElementById("legendPortions");
    textPortionsDivId.classList.add("show");
}

function removeLegendPortions() {
    const divTexteId = document.getElementById("legendPortions");
    divTexteId.classList.remove("show");
}

// Fonction qui permet de cliquer sur les circuits
function circuitsClick(circuitName, map) {
    map.on('click', circuitName, function(e) {                // Lors d'un click sur le circuit
        if(boolCircleCliq) {                                      // Si la case "Circuits Cliquables" est cochée
        for (let i of Object.values(tabStatesCircuits)) {         // Pour chaque circuit du tableau tabStatesCircuits
            if (i[1] == circuitName) {                                // Si le nom du circuit est le même que celui du circuit cliqué
            if (i[0] == false) {                                      // Si le circuit n'est pas activé
                i[0] = true;                                              // On active le circuit
                afficherDivTexteId(circuitName);                          // On affiche le texte du circuit
                //stateLine(e.features[0].properties.name, i[0], items[Object.values(tabStatesCircuits).indexOf(i)]); // On met en gras le texte de la légende
                setOnlyOneTrace(e.features[0].properties.name, i[0], items[Object.values(tabStatesCircuits).indexOf(i)])
            } else {                                                  // Sinon
                i[0] = false;                                             // On désactive le circuit
                cacherDivTexteId();                                       // On cache le texte du circuit
                //stateLine(e.features[0].properties.name, i[0], items[Object.values(tabStatesCircuits).indexOf(i)]); // On met en normal le texte de la légende
                setOnlyOneTrace(e.features[0].properties.name, i[0], items[Object.values(tabStatesCircuits).indexOf(i)])
            }
            }
        }
        }
    });
}