let map;
updateMapStyle();

// Fonction pour changer le style de la map
function updateMapStyle() {
  let checkboxMapStyle = document.getElementById("mapStyleCheckbox").checked;

  if (checkboxMapStyle == true) {
    mapStyleUrl = "mapbox://styles/yohannlc/cm8hha9d9002301s89a41db9x";
    mapStyle = "satellite"
  } else {
    mapStyleUrl = "mapbox://styles/yohannlc/cm8hbqqxj003t01s57dlx3iya";
    mapStyle = "outdoor"
  }

  // Si on change de carte en cours d'éxécution, il faut supprimer l'ancienne, sinon, c'est qu'on est au 1er chargement et on a rien à remove.
  if (map != undefined) {
    map.remove();
  }

  map = createMap(mapStyleUrl);
  updateConstantsByMapStyle(mapStyle);
  updateLegend(mapStyle);

  // Attente de changement de la valeur currentZoom = map.getZoom();
  map.on('zoomend', function() {
    var currentZoom = map.getZoom();
    changeSelonZoom(currentZoom);
  });

  // Lors d'un click n'importe où sur la carte
  map.on('click', function(e) {
    resetAllTraces();
  });
}

// Création de la map
function createMap(myMapStyleUrl) {
  mapboxgl.accessToken = 'pk.eyJ1IjoieW9oYW5ubGMiLCJhIjoiY2xnczI4cHJ1MGF4dDNsb2NienBja3pxbCJ9.pmfEZTINyfbOowGB0I77QA';
  let map = new mapboxgl.Map({
    container: 'map',
    style: myMapStyleUrl,
    center: [
      -3.72794317895395,
      48.17354630561118
    ],
    zoom: zoomStart,
  });

  // Ajouter les contrôles à la carte
  if (smartphone != true) {
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.addControl(new mapboxgl.ScaleControl());
  }
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  // Ajout des traces (circuits et portions)
  map.on('load', () => {
    if (type == "all") {
      addCircuitsMarche();
      addRavitosMarche();
    }
    addCircuitsVTT();
    addRavitosVTT();
    // addFlechesCircuitsVTT();
    if (type == "all") {
      addFlechesCircuitsMarche();
    }
    // if (tooglePortions == "vttAvecPo") {addPortions();}
  });

  return map;
}

/*
  // Attente de changement de la valeur currentZoom = map.getZoom();
  map.on('zoomend', function() {
    var currentZoom = map.getZoom();
    console.log(currentZoom);
    // changer la lineWidth des portions en fonction du zoom
    if (currentZoom < 13) {
      changeLineWidthCircuit(lineWitdhCircuit);
    } else if (currentZoom >= 13 && currentZoom < 14  ) {
      changeLineWidthCircuit(lineWitdhCircuit * 0.8);
    } else {
      changeLineWidthCircuit(lineWitdhCircuit * 0.6);
    }
  });

  // Lors d'un click n'importe où sur la carte
  map.on('click', function(e) {
    console.log("Reset");
    resetAllTraces();
  });
*/