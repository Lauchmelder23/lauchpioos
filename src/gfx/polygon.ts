/// <reference path="./shapes.ts" />

class Polygon extends Shape
{
    private points: Vector2D[]


    constructor(ctx, points) {
        super(ctx);
        if (points.length <3)
        {
            console.error("cant draw polygon, need min 3 points")
        }
        this.points = points
    }

    public draw()
    {
        let last_element = this.points[this.points.length-1]
        this.ctx.beginPath();
        this.ctx.moveTo(last_element.x, last_element.y);
        for (let point of this.points)
        {
            this.ctx.lineTo(point.x, point.y);
        }
        this.ctx.lineWidth = this.style.strokeWidth;
        this.ctx.strokeStyle = this.style.strokeColor;
        this.ctx.stroke();
    }
}