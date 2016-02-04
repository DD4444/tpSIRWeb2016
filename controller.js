
var editingMode = { butRect: 0, butLine: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 1;
	this.currColour = '#000000';
	this.currentShape = 1;
	this.form = null;


	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	this.getCurrentShape = function(doc){
		console.log(doc.id);
		this.currentShape = editingMode[doc.id];
		console.log(this.currentShape);
	}.bind(this);

	this.getCurrentColor = function(doc){
		this.currColour = doc.value;
	};

	this.getCurrentLineWidth = function(doc){
		console.log(doc.value);
		this.currLineWidth = doc.value;
	};

	this.DnD = new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function(){
		this.form = (this.currentShape === editingMode.butRect) ?
		new Rectangle(this.DnD.xbegin, this.DnD.ybegin, 0, 0, this.currLineWidth, this.currColour) :
		new Line(this.DnD.xbegin, this.DnD.ybegin, this.DnD.xbegin, this.DnD.ybegin, this.currLineWidth, this.currColour);
	}.bind(this);

	this.onInteractionUpdate = function(){
		// if (this.currentShape === editingMode.rect){
		// 	// ctx.clearRect(this.DnD.xbegin - this.currLineWidth, this.DnD.ybegin - this.currLineWidth, this.DnD.xend - this.DnD.xbegin + this.currLineWidth, this.DnD.yend - this.DnD.ybegin + this.currLineWidth);
		// 	this.form.setFinalX(this.DnD.xend - this.DnD.xbegin);
		// 	this.form.setFinalY(this.DnD.yend - this.DnD.ybegin);
		// }
		this.form = (this.currentShape === editingMode.butRect) ?
		new Rectangle(this.DnD.xbegin, this.DnD.ybegin, this.DnD.xend - this.DnD.xbegin, this.DnD.yend - this.DnD.ybegin, this.currLineWidth, this.currColour) :
		new Line(this.DnD.xbegin, this.DnD.ybegin, this.DnD.xend, this.DnD.yend, this.currLineWidth, this.currColour);
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.paint(ctx);
		this.form.paint(ctx);
	}.bind(this);

	this.onInteractionEnd = function(){
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.addForm(this.form);
		drawing.paint(ctx);
	}.bind(this);
}
