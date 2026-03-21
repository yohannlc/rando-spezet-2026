// Fonctions pour gérer le hover sur les portions
function portionsHoverEnter(portion) {
    map.on('mouseenter', portion, function(e) {        
        map.getCanvas().style.cursor = 'pointer';

        afficherDivTexteId(portion);
        
        if (portion.includes("Goazec")) {
            map.setPaintProperty(portion, 'line-width', lineWitdhPortionsPoly+10);
        } else {
            map.setPaintProperty(portion, 'line-width', lineWitdhPortions+10);
        }
    });
}

function portionsHoverLeave(portion) {
    map.on('mouseleave', portion, function(e) {        
        let ok = true;
        // si un des bools de tabStatesPortions est à true, on ne fait rien
        for (let i = 0; i < tabStatesPortions.length; i+=2) {
            if (tabStatesPortions[i+1] == true) {
                ok = false;
            }
        }
        if (ok) {
            cacherDivTexteId();
            map.getCanvas().style.cursor = '';
            if (portion.includes("Goazec")) {
                map.setPaintProperty(portion, 'line-width', lineWitdhPortionsPoly);
            } else {
                map.setPaintProperty(portion, 'line-width', lineWitdhPortions);
            }
        }
    });
}

// Fonctions pour gérer le hover sur les circuits (pas utilisé, il faut cliquer sur le circuit pour l'activer)
function circuitHoverEnter(portion) {
    map.on('mouseenter', portion, function(e) {
        if (!boolCircleCliq) {
            return;
        }
        map.getCanvas().style.cursor = 'pointer';
        //si on veut qu'un texte apparaisse quand on passe la souris dessus du circuit
        //afficherDivTexteId();
        //si on veut que la trace grossisse quand on passe la souris dessus
        //map.setPaintProperty(portion, 'line-width', lineWitdhCircuit+5);
    });
}

function circuitHoverLeave(portion) {
    map.on('mouseleave', portion, function(e) {
        if (!boolCircleCliq) {
            return;
        }
        map.getCanvas().style.cursor = '';
        //cacherDivTexteId();
        //map.setPaintProperty(portion, 'line-width', lineWitdhCircuit);
    });
}

// Fonctions pour gérer le hover sur les points
function pointHoverEnter(point) {
    map.on('mouseenter', point, function(e) {
        map.getCanvas().style.cursor = 'pointer';
        map.setPaintProperty(point, 'circle-radius', circleRadius+3);
        afficherDivTexteId(point);
    });
}

function pointHoverLeave(point) {
    map.on('mouseleave', point, function(e) {
        map.getCanvas().style.cursor = '';
        map.setPaintProperty(point, 'circle-radius', circleRadius);
        cacherDivTexteId();
    });
}