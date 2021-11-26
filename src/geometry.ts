import { Vector2D } from "./vector.js"
import * as shape from "./shapes.js"

class Geometry extends HTMLElement
{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor()
    {
        super();

        this.attachShadow({mode: "open"});
        let canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        let context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;

        this.canvas = canvas;
        this.context = context;

        this.shadowRoot.append(this.canvas);

        this.redraw();
    }

    private redraw()
    {
        shape.line(this.context, new Vector2D(), new Vector2D(300, 300));
        shape.circle(this.context, new Vector2D(150, 150), 100);
    }
}

customElements.define("geometry-sketch", Geometry);