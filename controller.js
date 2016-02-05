
var editingMode = { butLine: 0, butRect: 1, butCircle: 2 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 1;
	this.currColour = '#000000';
	this.currentShape = 0;
	this.form = null;


	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	this.getCurrentShape = function(doc){
		console.log(doc.id);
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
		console.log(this.currentShape);
		switch(this.currentShape) {
			case editingMode.butRect:
			this.form = new Rectangle(this.DnD.xbegin, this.DnD.ybegin, 0, 0, this.currLineWidth, this.currColour);
			break;
			case editingMode.butLine:
			this.form = new Line(this.DnD.xbegin, this.DnD.ybegin, this.DnD.xbegin, this.DnD.ybegin, this.currLineWidth, this.currColour);
			break;
			case editingMode.butCircle:
			this.form = new Circle(this.DnD.xbegin, this.DnD.ybegin, 1, this.currLineWidth, this.currColour);
			break;
			default:
			break;
		}
	}.bind(this);

	this.onInteractionUpdate = function(){
		switch(this.currentShape) {
			case editingMode.butRect:
			this.form = new Rectangle(this.DnD.xbegin, this.DnD.ybegin, this.DnD.xend - this.DnD.xbegin, this.DnD.yend - this.DnD.ybegin, this.currLineWidth, this.currColour);
			break;
			case editingMode.butLine:
			this.form = new Line(this.DnD.xbegin, this.DnD.ybegin, this.DnD.xend, this.DnD.yend, this.currLineWidth, this.currColour);
			break;
			case editingMode.butCircle:
			this.form = new Circle(this.DnD.xbegin, this.DnD.ybegin, Math.sqrt(Math.pow(this.DnD.xend - this.DnD.xbegin, 2) + Math.pow(this.DnD.yend - this.DnD.ybegin, 2)), this.currLineWidth, this.currColour);
			break;
			default:
			break;
		}
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
		drawing.removeForm(doc.id);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.paint(ctx);
		this.editList();
	}.bind(this);

	this.editList = function(){
		var forms = drawing.getForms();
		$('#shapeList tbody').html("");
		for (var i in forms) {
			var attr = forms[i].getAttributs();
			$('#shapeList').append("<tr><td>" + i + "</td><td>"+ attr.type + "</td><td>" + attr.thickness + "</td><td>" + attr.color + "</td><td>" + attr.xbegin +
			"</td><td>" + attr.ybegin + "</td><td>" + attr.xend + "</td><td>" + attr.yend + "</td><td>" + attr.width + "</td><td>" + attr.height + "</td><td>" +
			attr.radius + "</td><td><button id=\"" + i + "\" type=\"button\" class=\"btn btn-xs btn-danger delete-form\"><span class=\"glyphicon glyphicon-remove\">" +
			"</span></button></td></tr>");
		}
		this.DnD.attachEventsToDeleteButtons();
	}.bind(this);
}
