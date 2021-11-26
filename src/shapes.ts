import { Vector2D } from "./vector.js"
import { ShapeStyle } from "./shapeStyle.js";

export function line(ctx: CanvasRenderingContext2D, from: Vector2D , to: Vector2D, style: ShapeStyle = new ShapeStyle())
{
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);

    ctx.lineWidth = style.strokeWidth;
    ctx.strokeStyle = style.strokeColor;
    ctx.stroke();
}

export function circle(ctx: CanvasRenderingContext2D, center: Vector2D, radius: number, style: ShapeStyle = new ShapeStyle())
{
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);

    ctx.fillStyle = style.fillColor;
    ctx.fill();
    
    ctx.lineWidth = style.strokeWidth;
    ctx.strokeStyle = style.strokeColor;
    ctx.stroke();
}