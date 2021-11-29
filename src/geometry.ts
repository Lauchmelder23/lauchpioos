/// <reference path="vector.ts" />
/// <reference path="gfx/polygon.ts" />
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
    private shapes: Shape[];
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
        for(let instr of parser.instructions)
        {
            console.log(instr.eval());
        }

        this.attachShadow({mode: "open"});
        let canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        let context = canvas.getContext("2d");

        this.canvas = canvas;
        this.context = context;

        this.shadowRoot.append(this.canvas);


        this.shapes = []
        this.shapes.push(new Circle(this.context, new Vector2D(150, 150), 100))
        this.shapes.push(new Line(this.context, new Vector2D(), new Vector2D(300, 300)))

        this.shapes.push(new Polygon(this.context,
            [
                new Vector2D(150, 150),
                new Vector2D(150, 250),
                new Vector2D(250, 250),
                new Vector2D(250, 150),
                new Vector2D(300, 300),
                new Vector2D(250, 350),
            ]))
        this.redraw();
    }

    private redraw()
    {
        for (let shape of this.shapes)
        {
            shape.draw()
        }
    }
}

customElements.define("geometry-sketch", Geometry);