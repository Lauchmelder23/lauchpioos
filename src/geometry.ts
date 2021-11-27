function loadScript(filepath: string): string
{
    var result = null;
    var xmlhttp = new XMLHttpRequest();
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

        let lines = content.split("\n");
        for(let line of lines)
        {
            if(line === "\r")
            {
                console.log("empty");
                continue;
            }

            let instruction = line.split("(")[0];

            switch(instruction)
            {
                case instruction:
                {
                    let coords = line.split("(")[1].split("|");
                    console.log(coords);
                    break;
                }

                default:
                {
                    console.log("something else");
                    break;
                }
            }
        }

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
        Shape.line(this.context, new Util.Vector2D(), new Util.Vector2D(300, 300));
        Shape.circle(this.context, new Util.Vector2D(150, 150), 100);
    }
}

customElements.define("geometry-sketch", Geometry);