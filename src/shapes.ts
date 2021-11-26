module Shape 
{
    export function line(ctx: CanvasRenderingContext2D, from: Util.Vector2D , to: Util.Vector2D, style: Util.ShapeStyle = new Util.ShapeStyle())
    {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);

        ctx.lineWidth = style.strokeWidth;
        ctx.strokeStyle = style.strokeColor;
        ctx.stroke();
    }

    export function circle(ctx: CanvasRenderingContext2D, center: Util.Vector2D, radius: number, style: Util.ShapeStyle = new Util.ShapeStyle())
    {
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);

        ctx.fillStyle = style.fillColor;
        ctx.fill();
        
        ctx.lineWidth = style.strokeWidth;
        ctx.strokeStyle = style.strokeColor;
        ctx.stroke();
    }
}