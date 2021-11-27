/// <reference path="vector.ts" />
/// <reference path="shapes.ts" />
/// <reference path="parser/parser.ts" />

function loadScript(filepath: string): string
{
    let result = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filepath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
    }

    return result;
}

class Geometry extends HTMLElement
{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private sourceFile: string;

    constructor()
    {
        super();
        console.log("constructor")
        if(!this.hasAttribute("src"))
        {
            return;
        }

        let sourceFile = this.getAttribute("src");
        let content = loadScript(sourceFile);

        let parser = new Parser(content);

        this.attachShadow({mode: "open"});
        let canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        let context = canvas.getContext("2d");

        this.canvas = canvas;
        this.context = context;

        this.shadowRoot.append(this.canvas);

        this.redraw();
    }

    private redraw()
    {
        line(this.context, new Vector2D(), new Vector2D(300, 300));
        circle(this.context, new Vector2D(150, 150), 100);
    }
}

customElements.define("geometry-sketch", Geometry);