function drawPortion(portionName, portionType, portionCoordinates, portionLineWitdh, portionLineOpacity, portionColor) {
  map.addSource(portionName, {
      'type': 'geojson',
      'data': {
        "type": "Feature",
        "properties": {
          "name": portionName
        },
        "geometry": {
          "coordinates": portionCoordinates,
          "type": "LineString"
        }
      }
    });
    map.addLayer({
      'id': portionName,
      'type': 'line',
      'source': portionName,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': portionColor,
        'line-width': portionLineWitdh,
        'line-opacity': portionLineOpacity
      }
    });
  
    if(portionType === "circuit") {
      circuitHoverEnter(portionName);
      circuitHoverLeave(portionName);
      // draw fleches en même temps que les circuits
      // addFlecheForACircuit(portionName);
    } else if(portionType === "fleche") {
      // Nothing
      return;
    } else {
      portionsHoverEnter(portionName);
      portionsHoverLeave(portionName);
      //portionsClick(portionName);
    }
}

function addPortions() {
  // Boucle for sur listePortions pour drawPortions
  for (let i = 0; i < listePortions.length; i++) {
    drawPortion(listePortions[i].id, listePortions[i].type, listePortions[i].coords, lineWitdhPortions, lineOpacityPortions, listePortions[i].color);
  }
}

function removePortion(portionName) {
  map.removeLayer(portionName);
  map.removeSource(portionName);
}
  
function removePortions() {
  removePortion("verger1");
  removePortion("verger2");
  removePortion("herbeAvantPoulancerf");
  removePortion("avantKermariou");
  removePortion("henry");
  removePortion("derriereCudel");
  removePortion("avantGaecNormand");
  removePortion("taquetDuPeintre");
  removePortion("apresCudel");
  removePortion("cozic1");
  removePortion("halageAvantPasserelle");
  removePortion("palae");
}