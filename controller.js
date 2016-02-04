
var editingMode = { butRect: 0, butLine: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 1;
	this.currColour = '#000000';
	this.currentShape = 1;
	this.form = null;


	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	this.getCurrentShape = function(doc){
		this.currentShape = editingMode[doc.id];
	}.bind(this);

	this.getCurrentColor = function(doc){
		this.currColour = doc.value;
	};

	this.getCurrentLineWidth = function(doc){
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
		this.form = (this.currentShape === editingMode.butRect) ?
		new Rectangle(this.DnD.xbegin, this.DnD.ybegin, this.DnD.xend - this.DnD.xbegin, this.DnD.yend - this.DnD.ybegin, this.currLineWidth, this.currColour) :
		new Line(this.DnD.xbegin, this.DnD.ybegin, this.DnD.xend, this.DnD.yend, this.currLineWidth, this.currColour);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.paint(ctx);
		this.form.paint(ctx);
	}.bind(this);

	this.onInteractionEnd = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.addForm(this.form);
		drawing.paint(ctx);
		this.editList();
	}.bind(this);

	this.removeForm = function(doc){
		console.log(doc);
	}.bind(this);

	this.editList = function(){
		var forms = drawing.getForms();
		$('#shapeList tbody').html("");
		for (var i in forms) {
			var attr = forms[i].getAttributs();
			$('#shapeList').append("<tr><td>" + i + "</td><td>"+ attr.type + "</td><td>" + attr.thickness + "</td><td>" + attr.color + "</td><td>" + attr.xbegin +
			"</td><td>" + attr.ybegin + "</td><td>" + attr.xend + "</td><td>" + attr.yend + "</td><td><button id=\"" + i + "\" type=\"button\" class=\"btn btn-xs btn-danger delete-form\">" +
			"<span class=\"glyphicon glyphicon-remove\"></span></button></td></tr>");
		}
	}.bind(this);
}
