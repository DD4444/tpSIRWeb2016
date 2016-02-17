
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

function Drawing(){
    this.forms = Array();
    this.previous = Array();
    this.follows = Array();

    this.addForm = function(form){
        this.previous.push(this.forms.slice(0));
        this.forms.push(form);
    }.bind(this);

    this.getForms = function(){
        return this.forms;
    }.bind(this);

    this.removeForm = function(id){
        this.previous.push(this.forms.slice(0));
        this.forms.splice(id,1);
    }.bind(this);

    this.undo = function(){
        if (this.previous.length > 0){
            this.follows.push(this.forms.slice(0));
            this.forms = this.previous.pop().slice(0);
        }
    }.bind(this);

    this.redo = function(){
        if (this.follows.length > 0){
            this.previous.push(this.forms.slice(0));
            this.forms = this.follows.pop().slice(0);
        }
    }.bind(this);
}

function Form(thick, color, fill, dash, x, y){
    this.thick = thick;
    this.color = color;
    this.fillColor = fill;
    this.dash = dash;
    this.x = x;
    this.y = y;

    this.getColor = function(){
        return this.color;
    }.bind(this);

    this.getFillColor = function(){
        return this.fillColor;
    }.bind(this);

    this.getThick = function(){
        return this.thick;
    }.bind(this);

    this.getDash = function(){
        return this.dash;
    }.bind(this);

    this.getInitX = function(){
        return this.x;
    }.bind(this);

    this.getInitY = function(){
        return this.y;
    }.bind(this);
}

function Rectangle( thick, color, fill, dash, x, y, width, height){
    Form.call(this, thick, color, fill, dash, x, y);
    this.width = width;
    this.height = height;
    this.type = "Rectangle";

    this.getWidth = function(){
        return this.width;
    }.bind(this);

    this.getHeight = function(){
        return this.height;
    }.bind(this);

    this.getAttributs = function(){
        return {
            thickness : this.thick,
            color : this.color,
            xbegin : Math.round(this.x),
            ybegin : Math.round(this.y),
            xend : Math.round(this.x + this.width),
            yend : Math.round(this.y + this.height),
            width : Math.abs(this.width),
            height : Math.abs(this.height),
            radius: "none",
            type : this.type
        };
    }.bind(this);
}
Rectangle.prototype = new Form();

function Line(thick, color, fill, dash, x, y, x2, y2){
    Form.call(this, thick, color, fill, dash, x, y);
    this.x2 = x2;
    this.y2 = y2;
    this.type = "Line";

    this.getFinalX = function(){
        return this.x2;
    }.bind(this);

    this.getFinalY = function(){
        return this.y2;
    }.bind(this);

    this.getAttributs = function(){
        return {
            thickness : this.thick,
            color : this.color,
            xbegin : Math.round(this.x),
            ybegin : Math.round(this.y),
            xend : Math.round(this.x2),
            yend : Math.round(this.y2),
            width : "none",
            height : "none",
            radius : "none",
            type : this.type
        };
    }.bind(this);
}
Line.prototype = new Form();

function Circle(thick, color, fill, dash, x, y, radius){
    Form.call(this, thick, color, fill, dash, x, y);
    this.radius = radius;
    this.type = "Circle";

    this.getRadius = function(){
        return this.radius;
    }.bind(this);

    this.getAttributs = function(){
        return {
            thickness : this.thick,
            color : this.color,
            xbegin : Math.round(this.x),
            ybegin : Math.round(this.y),
            xend : "none",
            yend : "none",
            width : "none",
            height : "none",
            radius : Math.round(this.radius*100)/100,
            type : this.type
        };
    }.bind(this);
}

Circle.prototype = new Form();

function Oval(thick, color, fill, dash, x, y, x2, y2){
    Form.call(this, thick, color, fill, dash, x, y);
    this.x2 = x2;
    this.y2 = y2;
    this.type = "Oval";

    this.getFinalX = function(){
        return this.x2;
    }.bind(this);

    this.getFinalY = function(){
        return this.y2;
    }.bind(this);

    this.getAttributs = function(){
        return {
            thickness : this.thick,
            color : this.color,
            xbegin : Math.round(this.x),
            ybegin : Math.round(this.y),
            xend : Math.round(this.x2),
            yend : Math.round(this.y2),
            width : "none",
            height : "none",
            radius : "none",
            type : this.type
        };
    }.bind(this);
}
Oval.prototype = new Form();
