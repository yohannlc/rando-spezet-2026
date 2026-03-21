function addCircuitsVTT() {
    if ( mapStyle == 'outdoor') {
        for (let i = 0; i < listeCircuitsVtt.length; i++) {
            drawPortion(listeCircuitsVtt[i].id, "circuit", listeCircuitsVtt[i].coords, lineWidthCircuit, lineOpacityCircuit, listeCircuitsVtt[i].colorOut);
        }
    } else {
        for (let i = 0; i < listeCircuitsVtt.length; i++) {
            drawPortion(listeCircuitsVtt[i].id, "circuit", listeCircuitsVtt[i].coords, lineWidthCircuit, lineOpacityCircuit, listeCircuitsVtt[i].colorSat);
        }
    }
}

function addCircuitsMarche() {
    if ( mapStyle == 'outdoor') {
        for (let i = 0; i < listeCircuitsMarche.length; i++) {
            drawPortion(listeCircuitsMarche[i].id, "circuit", listeCircuitsMarche[i].coords, lineWidthCircuit, lineOpacityCircuit, listeCircuitsMarche[i].colorOut);
        }
    } else {
        for (let i = 0; i < listeCircuitsMarche.length; i++) {
            drawPortion(listeCircuitsMarche[i].id, "circuit", listeCircuitsMarche[i].coords, lineWidthCircuit, lineOpacityCircuit, listeCircuitsMarche[i].colorSat);
        }
    }

    //display la div d'id =legendCircuitsMarche
    const divTexteId = document.getElementById("legendCircuitsMarche");
    divTexteId.classList.add("show");
}
  
function removeCircuitsMarche() {
    for (let i = 0; i < listeCircuitsMarche.length; i++) {
        map.removeLayer(listeCircuitsMarche[i].id);
        map.removeSource(listeCircuitsMarche[i].id);
    }

    //hide la div d'id =legendCircuitsMarche
    const divTexteId = document.getElementById("legendCircuitsMarche");
    divTexteId.classList.remove("show");
}

function removeCircuitsVTT() {
    for (let i = 0; i < listeCircuitsVtt.length; i++) {
        map.removeLayer(listeCircuitsVtt[i].id);
        map.removeSource(listeCircuitsVtt[i].id);
    }
}