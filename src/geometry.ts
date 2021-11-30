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
        if(!parser.good())
        {
            console.error("Failed to create parser for script " + sourceFile);
            return;
        }

        this.attachShadow({mode: "open"});
        let canvas = document.createElement("canvas");
        canvas.width = 700;
        canvas.height = 500;
        let context = canvas.getContext("2d");

        this.canvas = canvas;
        this.context = context;

        this.shadowRoot.append(this.canvas);


        this.shapes = []
        for(let instruction of parser.instructions)
        {
            let value = instruction.eval();
            switch(instruction.getType())
            {
                case InstructionType.Line:
                {
                    console.log("New line " + value)
                    this.shapes.push(new Line(this.context, new Vector2D(value[0].x, value[0].y), new Vector2D(value[1].x, value[1].y)));
                    break;
                }
                
                case InstructionType.Circle:
                {
                    console.log("New circle " + value)
                    this.shapes.push(new Circle(this.context, new Vector2D(value[0].x, value[0].y), value[1]));
                    break;
                }
            }
        }

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