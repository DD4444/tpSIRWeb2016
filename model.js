
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
        this.forms.splice(i,1);
    }.bind(this);
}

function Form(thick, color){
    this.thick = thick;
    this.color = color;

    this.getColor = function(){
        return this.color;
    }.bind(this);

    this.getThick = function(){
        return this.thick;
    }.bind(this);
}

function Rectangle(x, y, width, height, thick, color){
    Form.call(this, thick, color);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = "Rectangle";

    this.getInitX = function(){
        return this.x;
    }.bind(this);

    this.getInitY = function(){
        return this.y;
    }.bind(this);

    this.getFinalX = function(){
        return this.width;
    }.bind(this);

    this.getFinalY = function(){
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
            type : this.type
        };
    }.bind(this);
}
Rectangle.prototype = new Form();

function Line(x1, y1, x2, y2, thick, color){
    Form.call(this, thick, color);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.type = "Line";

    this.getInitX = function(){
        return this.x1;
    }.bind(this);

    this.getInitY = function(){
        return this.y1;
    }.bind(this);

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
            xbegin : this.x1,
            ybegin : this.y1,
            xend : this.x2,
            yend : this.y2,
            type : this.type
        };
    }.bind(this);
}
Line.prototype = new Form();
