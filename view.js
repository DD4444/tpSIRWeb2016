
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

// Form.prototype.paint = function(ctx){
//     ctx.lineWidth = this.getThick();
// };

Rectangle.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.rect(this.getInitX(), this.getInitY(), this.getFinalX(), this.getFinalY());
    // ctx.fillStyle = this.getColor();
    ctx.strokeStyle = this.getColor();
    ctx.lineWidth = this.getThick();
    ctx.fillRect(this.getInitX(), this.getInitY(), this.getFinalX(), this.getFinalY(), 0);
    ctx.stroke();
};

Line.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.getInitX(), this.getInitY());
    ctx.lineTo(this.getFinalX(), this.getFinalY());
    ctx.strokeStyle = this.getColor();
    ctx.lineWidth = this.getThick();
    ctx.stroke();
};


Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = 'rgba(140,140,140,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.getForms().forEach(function(eltDuTableau) {
        eltDuTableau.paint(ctx);
    });
};
