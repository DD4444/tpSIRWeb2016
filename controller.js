
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function(){
		var form = (this.currentShape === 0) ? new Rectangle(Dnd.xbegin, Dnd.yBegin, Dnd.xend - Dnd.xBegin, Dnd.yend - Dnd.ybegin, this.currLineWidth, this.currColour) : new Line(Dnd.xbegin, Dnd.yBegin, Dnd.xend, Dnd.yend, this.currLineWidth, this.currColour);
	}.bind(this);
}
