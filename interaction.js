
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'
    this.xbegin = 0;
    this.ybegin = 0;
    this.xend = 0;
    this.yend = 0;
    this.isPress = false;

    // Developper les 3 fonctions gérant les événements
    this.onPress = function(evt){
        if (this.isPress === false){
            this.isPress = true;
            var initialPosition = getMousePosition(canvas, evt);
            this.xbegin = initialPosition.x;
            this.ybegin = initialPosition.y;
            interactor.onInteractionStart();
        }
    }.bind(this);

    this.onMove = function(evt){
        if (this.isPress === true){
            var finalPosition = getMousePosition(canvas, evt);
            this.xend = finalPosition.x;
            this.yend = finalPosition.y;
            interactor.onInteractionUpdate();
        }
    }.bind(this);

    this.onUp = function(evt){
        if (this.isPress === true){
            this.isPress = false;
            interactor.onInteractionEnd();
        }
    }.bind(this);

    // Associer les fonctions précédentes aux évènements du canvas.
    canvas.addEventListener('mousedown', this.onPress, false);
    canvas.addEventListener('mousemove', this.onMove, false);
    canvas.addEventListener('mouseup', this.onUp, false);

    addEventListenerList(document.getElementsByName('mx'), 'click', function(){
        interactor.getCurrentShape(this);
    });

    document.getElementById('colour').addEventListener('input', function(){
        interactor.getCurrentColor(this);
    });
    document.getElementById('fillcolour').addEventListener('input', function(){
        interactor.getCurrentFillColor(this, document.getElementById('unfillcolour'));
    });

    document.getElementById('unfillcolour').addEventListener('click', function(){
        interactor.getCurrentFillColor(document.getElementById('fillcolour'), this);
    });

    document.getElementById('spinnerWidth').addEventListener('change', function(){
        interactor.getCurrentLineWidth(this);
    });

    document.getElementById('butUndo').addEventListener('click', function(){
        interactor.undo();
    });

    document.getElementById('butRedo').addEventListener('click', function(){
        interactor.redo();
    });

    addEventListenerList(document.getElementsByClassName('apcanvas'), 'click', function(){
        interactor.getCurrentDash(this.getElementsByTagName('canvas'));
    });

    this.attachEventsToDeleteButtons = function(){
        addEventListenerList(document.getElementsByClassName('delete-form'), 'click', function(){
            interactor.removeForm(this);
        });
    };
}

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Ajouter un évènement et sa fonction à une liste d'éléments
function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}
