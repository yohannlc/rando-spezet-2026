// // Fonction de popup à l'ouverure de la page
// window.addEventListener('DOMContentLoaded', function() {
//   var popup = document.getElementById('popup');
//   var closeButton = popup.querySelector('.close');

//   function hidePopup() {
//     popup.style.opacity = '0';
//     setTimeout(function() {
//       popup.style.display = 'none';
//     }, 500); // Durée de transition définie dans la propriété "transition" en CSS (0.5s)
//   }

//   popup.style.display = 'block';
//   closeButton.addEventListener('click', hidePopup);
//   setTimeout(hidePopup, 8000);
// });

let items = [];

addEventListenerLegendVTT();
addEventListenerLegendMarche();

function addEventListenerLegendVTT() {
  // Enregistrer les éléments de la légende dans une variable
  const legendItemsVTT = document.querySelectorAll('#legendCircuitsVTT div');

  for (let i of legendItemsVTT) {
    items.push(i);
  }

  // Ajouter un événement de clic à chaque élément de la légende
  legendItemsVTT.forEach(function(item, index) {
    item.addEventListener('click', function() {    
      switch(index) {
        case 0:
          tabStatesCircuits.stateCircuitVtt0[0] = !tabStatesCircuits.stateCircuitVtt0[0];
          setOnlyOneTrace('circuitVtt0', tabStatesCircuits.stateCircuitVtt0[0], item);
          break;
        case 1:
          tabStatesCircuits.stateCircuitVtt1[0] = !tabStatesCircuits.stateCircuitVtt1[0];
          setOnlyOneTrace('circuitVtt1', tabStatesCircuits.stateCircuitVtt1[0], item);
          break;
        case 2:
          tabStatesCircuits.stateCircuitVtt2[0] = !tabStatesCircuits.stateCircuitVtt2[0];
          setOnlyOneTrace('circuitVtt2', tabStatesCircuits.stateCircuitVtt2[0], item);
          break;
        case 3:
          tabStatesCircuits.stateCircuitVtt3[0] = !tabStatesCircuits.stateCircuitVtt3[0];
          setOnlyOneTrace('circuitVtt3', tabStatesCircuits.stateCircuitVtt3[0], item);
          break;
        case 4:
          tabStatesCircuits.stateCircuitVtt4[0] = !tabStatesCircuits.stateCircuitVtt4[0];
          setOnlyOneTrace('circuitVtt4', tabStatesCircuits.stateCircuitVtt4[0], item);
          break;
        case 5:
          tabStatesCircuits.stateCircuitVtt5[0] = !tabStatesCircuits.stateCircuitVtt5[0];
          setOnlyOneTrace('circuitVtt5', tabStatesCircuits.stateCircuitVtt5[0], item);
          break;
        default:
          return;
      }
    });
  });
}

function addEventListenerLegendMarche() {
  const legendItemsMarche = document.querySelectorAll('#legendCircuitsMarche div');

  for (let i of legendItemsMarche) {
    items.push(i);
  }

  // Ajouter un événement de clic à chaque élément de la légende
  legendItemsMarche.forEach(function(item, index) {
    item.addEventListener('click', function() {    
      switch(index) {
        case 0:
          tabStatesCircuits.stateCircuitMarche0[0] = !tabStatesCircuits.stateCircuitMarche0[0];
          setOnlyOneTrace('circuitMarche0', tabStatesCircuits.stateCircuitMarche0[0], item);
          break;
        case 1:
          tabStatesCircuits.stateCircuitMarche1[0] = !tabStatesCircuits.stateCircuitMarche1[0];
          setOnlyOneTrace('circuitMarche1', tabStatesCircuits.stateCircuitMarche1[0], item);
          break;
        case 2:
          tabStatesCircuits.stateCircuitMarche2[0] = !tabStatesCircuits.stateCircuitMarche2[0];
          setOnlyOneTrace('circuitMarche2', tabStatesCircuits.stateCircuitMarche2[0], item);
          break;
        default:
          return;
      }
    });
  });
}

// Voir si on a coché la case "Circuits Cliquables"
// let checkboxCircCliq = document.getElementById("cirqCliq");
// checkboxCircCliq.checked = false;
boolCircleCliq = false;