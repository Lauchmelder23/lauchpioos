class Geometry extends HTMLElement
{
    constructor()
    {
        super();

        this.attachShadow({mode: "open"});

        console.log("Created Geomtry tag");
        const text = document.createElement("p")
        text.innerText = "Geometry tag";

        this.shadowRoot.append(text);
    }
}

customElements.define("custom-geometry", Geometry);