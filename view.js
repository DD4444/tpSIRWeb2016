
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Form.prototype.paint = function(ctx){
    ctx.beginPath();
    ctx.lineWidth = this.getThick();
    ctx.strokeStyle = this.getColor();
};

Rectangle.prototype.paint = function(ctx) {
    Form.prototype.paint.call(this, ctx);
    ctx.fillStyle = 'rgba(140,140,140,0)';
    ctx.fillRect(this.getInitX(), this.getInitY(), this.getWidth(), this.getHeight());
    ctx.rect(this.getInitX(), this.getInitY(), this.getWidth(), this.getHeight());
    ctx.stroke();
};

Line.prototype.paint = function(ctx) {
    Form.prototype.paint.call(this, ctx);
    ctx.moveTo(this.getInitX(), this.getInitY());
    ctx.lineTo(this.getFinalX(), this.getFinalY());
    ctx.stroke();
};

Circle.prototype.paint = function(ctx){
    Form.prototype.paint.call(this, ctx);
    ctx.arc(this.getInitX(), this.getInitY(), this.getRadius(), 0, Math.PI*2, false);
    ctx.stroke();
};

Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillStyle = 'rgb(240,240,240)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.getForms().forEach(function(eltDuTableau) {
        eltDuTableau.paint(ctx);
    });
};
