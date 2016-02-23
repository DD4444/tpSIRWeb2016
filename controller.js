
var editingMode = { butLine: 0, butRect: 1, butCircle: 2, butOval: 3 };

function Pencil(ctx, drawing, canvas) {
	this.currLineWidth = 1;
	this.currColour = '#000000';
	this.currFillColour = 'rgba(140,140,140,0)';
	this.fillColour = 'black';
	this.currentShape = 0;
	this.currentDash = [0];
	this.form = null;


	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	this.getCurrentShape = function(doc){
		this.currentShape = editingMode[doc.id];
	};

	this.getCurrentColor = function(doc){
		this.currColour = doc.value;
	};

	this.getCurrentFillColor = function(fill, unfill){
		this.fillColour = fill.value;
		if (unfill.checked === true){
			this.currFillColour = 'rgba(140,140,140,0)';
		}
		else{
			this.currFillColour = this.fillColour;
		}
	};

	this.getCurrentLineWidth = function(doc){
		if (doc.value > 50){
			doc.value = 50;
		}
		this.currLineWidth = doc.value;
	};

	this.getCurrentDash = function(docs){
		var curr = this;
		$(docs).each(function(i){
			var doc = this;
			$( ".mcanvas" ).each(function( index ) {
				curr.setDash(this, doc);
			});
			curr.currentDash = doc.id.split('-');
		});
	};

	this.setDash = function(elem, dash){
		var context = elem.getContext('2d');
		context.clearRect(0, 0, elem.width, elem.height);
		context.beginPath();
		context.lineWidth = 5;
		context.strokeStyle = "#000000";
		context.setLineDash(dash.id.split('-'));
		context.moveTo(1,80);
		context.lineTo(280,80);
		context.closePath();
		context.stroke();
	};

	this.DnD = new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function(){
		console.log(this.currLineWidth);
		console.log(this.currColour);
		console.log(this.currFillColour);
		console.log(this.fillColour);
		console.log(this.currentShape);
		console.log(this.currentDash);
		switch(this.currentShape) {
			case editingMode.butRect:
			this.form = new Rectangle(this.currLineWidth, this.currColour, this.currFillColour, this.currentDash, this.DnD.xbegin, this.DnD.ybegin, 1, 1);
			break;
			case editingMode.butLine:
			this.form = new Line(this.currLineWidth, this.currColour, this.currFillColour, this.currentDash, this.DnD.xbegin, this.DnD.ybegin, this.DnD.xbegin + 1, this.DnD.ybegin + 1);
			break;
			case editingMode.butCircle:
			this.form = new Circle(this.currLineWidth, this.currColour, this.currFillColour, this.currentDash, this.DnD.xbegin, this.DnD.ybegin, 1);
			break;
			case editingMode.butOval:
			this.form = new Oval(this.currLineWidth, this.currColour, this.currFillColour, this.currentDash, this.DnD.xbegin, this.DnD.ybegin, this.DnD.xbegin + 1, this.DnD.ybegin + 1);
			break;
			default:
			break;
		}
	}.bind(this);

	this.onInteractionUpdate = function(){
		var selection = new Rectangle(1, "#000000", 'rgba(140,140,140,0)', [1,2], this.DnD.xbegin , this.DnD.ybegin, this.DnD.xend - this.DnD.xbegin, this.DnD.yend - this.DnD.ybegin);
		switch(this.currentShape) {
			case editingMode.butRect:
			this.form = new Rectangle(this.currLineWidth, this.currColour, this.currFillColour, this.currentDash, this.DnD.xbegin, this.DnD.ybegin, this.DnD.xend - this.DnD.xbegin, this.DnD.yend - this.DnD.ybegin);
			selection = null;
			break;
			case editingMode.butLine:
			this.form = new Line(this.currLineWidth, this.currColour, this.currFillColour, this.currentDash, this.DnD.xbegin, this.DnD.ybegin, this.DnD.xend, this.DnD.yend);
			break;
			case editingMode.butCircle:
			var radius = Math.abs(Math.min(this.DnD.xend - this.DnD.xbegin, this.DnD.yend - this.DnD.ybegin));
			this.form = new Circle(this.currLineWidth, this.currColour, this.currFillColour, this.currentDash, this.DnD.xbegin + ((this.DnD.xend - this.DnD.xbegin)/2), this.DnD.ybegin + ((this.DnD.yend - this.DnD.ybegin)/2), radius/2);
			break;
			case editingMode.butOval:
			this.form = new Oval(this.currLineWidth, this.currColour, this.currFillColour, this.currentDash, this.DnD.xbegin, this.DnD.ybegin, this.DnD.xend, this.DnD.yend);
			break;
			default:
			break;
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.paint(ctx, canvas);
		this.form.paint(ctx, canvas);
		if (selection){
			selection.paint(ctx, canvas);
		}
	}.bind(this);

	this.onInteractionEnd = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.addForm(this.form);
		drawing.paint(ctx, canvas);
		this.editList();
	}.bind(this);

	this.removeForm = function(doc){
		drawing.removeForm(doc.id);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.paint(ctx, canvas);
		this.editList();
	}.bind(this);

	this.undo = function(){
		drawing.undo();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.paint(ctx, canvas);
		this.editList();
	}.bind(this);

	this.redo = function(){
		drawing.redo();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.paint(ctx, canvas);
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
