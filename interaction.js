
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
        this.isPress = true;
        var initialPosition = getMousePosition(canvas, evt);
        this.xbegin = initialPosition.x;
        this.ybegin = initialPosition.y;
        this.toString();
        interactor.onInteractionStart();
    }.bind(this);

    this.onMove = function(evt){
        if (this.isPress === true){
            var finalPosition = getMousePosition(canvas, evt);
            this.xend = finalPosition.x;
            this.yend = finalPosition.y;
            this.toString();
            interactor.onInteractionUpdate();
        }
    }.bind(this);

    this.onUp = function(evt){
        this.isPress = false;
        interactor.onInteractionEnd();
        this.toString();
    }.bind(this);

    this.toString = function(){
        console.log(this.isPress + "\n" + this.xbegin + "\n" + this.ybegin + "\n" + this.xend + "\n" + this.yend );
    }.bind(this);

	// Associer les fonctions précédentes aux évènements du canvas.
    canvas.addEventListener('mousedown', this.onPress, false);
    canvas.addEventListener('mousemove', this.onMove, false);
    canvas.addEventListener('mouseup', this.onUp, false);

}


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
