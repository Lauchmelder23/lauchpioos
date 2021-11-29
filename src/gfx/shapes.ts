/// <reference path="../vector.ts" />
/// <reference path="../shapeStyle.ts" />

abstract class Shape
{
    protected ctx: CanvasRenderingContext2D
    protected style: ShapeStyle

    constructor(ctx) {
        this.ctx = ctx
        this.style = new ShapeStyle()
    }

    abstract draw()
}

class Line extends Shape
{
   private from: Vector2D
   private to: Vector2D

   constructor(ctx,from, to) {
       super(ctx)
       this.from = from
       this.to = to
   }

   public draw()
   {
       this.ctx.beginPath();
       this.ctx.moveTo(this.from.x, this.from.y);
       this.ctx.lineTo(this.to.x, this.to.y);

       this.ctx.lineWidth = this.style.strokeWidth;
       this.ctx.strokeStyle = this.style.strokeColor;
       this.ctx.stroke();
   }
}

class Circle extends Shape
{

    private center: Vector2D
    private radius: number

    constructor(ctx,center, radius) {
        super(ctx)
        this.center = center
        this.radius = radius
    }

    public draw()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);

        this.ctx.fillStyle = this.style.fillColor;
        this.ctx.fill();

        this.ctx.lineWidth = this.style.strokeWidth;
        this.ctx.strokeStyle = this.style.strokeColor;
        this.ctx.stroke();
    }
}