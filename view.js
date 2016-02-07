
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Form.prototype.paint = function(ctx){
    ctx.beginPath();
    ctx.setLineDash(this.getDash());
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

Oval.prototype.paint = function(ctx, canvas){
    // ctx.save();
    // ctx.translate(canvas.width / 2, canvas.height / 2);
    // ctx.scale(2, 1);
    // Form.prototype.paint.call(this, ctx);
    // ctx.arc(this.getInitX(), this.getInitY(), this.getRadius(), 0, Math.PI*2, false);
    // ctx.restore();
    // ctx.stroke();
    Form.prototype.paint.call(this, ctx);
    ctx.moveTo(this.getInitX(), this.getInitY() + (this.getFinalY() - this.getInitY()) / 2);
    ctx.bezierCurveTo(this.getInitX(), this.getInitY(), this.getFinalX(), this.getInitY(), this.getFinalX(), this.getInitY() + (this.getFinalY() - this.getInitY()) / 2);
    ctx.bezierCurveTo(this.getFinalX(), this.getFinalY(), this.getInitX(), this.getFinalY(), this.getInitX(), this.getInitY() + (this.getFinalY() - this.getInitY()) / 2);
    ctx.closePath();
    ctx.stroke();
};

Drawing.prototype.paint = function(ctx, canvas) {
    // ctx.fillStyle = "#FFFFFF";
    ctx.fillStyle = 'rgb(240,240,240)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.getForms().forEach(function(eltDuTableau) {
        eltDuTableau.paint(ctx, canvas);
    });
};
