
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

function Drawing(){
    this.forms = Array();
    this.addForm = function(form){
        this.forms.push(form);
    }.bind(this);

    this.getForms = function(){
        return this.forms;
    }.bind(this);

    this.removeForm = function(id){
        this.forms.splice(id,1);
    }.bind(this);
}

function Form(thick, color, x, y){
    this.thick = thick;
    this.color = color;
    this.x = x;
    this.y = y;

    this.getColor = function(){
        return this.color;
    }.bind(this);

    this.getThick = function(){
        return this.thick;
    }.bind(this);

    this.getInitX = function(){
        return this.x;
    }.bind(this);

    this.getInitY = function(){
        return this.y;
    }.bind(this);
}

function Rectangle(x, y, width, height, thick, color){
    Form.call(this, thick, color, x, y);
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
            xbegin : this.x,
            ybegin : this.y,
            xend : this.x + this.width,
            yend : this.y + this.height,
            width : this.width,
            height : this.height,
            radius: "none",
            type : this.type
        };
    }.bind(this);
}
Rectangle.prototype = new Form();

function Line(x, y, x2, y2, thick, color){
    Form.call(this, thick, color, x, y);
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
            xbegin : this.x,
            ybegin : this.y,
            xend : this.x2,
            yend : this.y2,
            width : "none",
            height : "none",
            radius : "none",
            type : this.type
        };
    }.bind(this);
}
Line.prototype = new Form();

function Circle(x, y, radius, thick, color){
    Form.call(this, thick, color, x, y);
    this.radius = radius;
    this.type = "Circle";

    this.getRadius = function(){
        return this.radius;
    }.bind(this);

    this.getAttributs = function(){
        return {
            thickness : this.thick,
            color : this.color,
            xbegin : this.x,
            ybegin : this.y,
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
