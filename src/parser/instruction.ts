/// <reference path="../vector.ts" />

enum InstructionType
{
    Point,
    Line,
    Circle,
    Length
}

abstract class Instruction 
{
    public fn: InstructionType;
    public params :Parameter[];
    private argc: number;

    constructor(type: InstructionType, argc: number)
    {
        this.fn = type;
        this.argc = argc;
        this.params = [];
    }

    abstract eval();
    public getParameterCount(): number { return this.argc; }
}

class PointInstruction extends Instruction
{
    constructor()
    {
        super(InstructionType.Point, 2);
    }

    eval()
    {
        return new Vector2D(this.params[0].eval(), this.params[1].eval());
    }
}

class LineInstruction extends Instruction
{
    constructor()
    {
        super(InstructionType.Line, 2);
    }

    eval()
    {
        return [
            this.params[0].eval(),
            this.params[1].eval()
        ];
    }
}

class CircleInstruction extends Instruction
{
    constructor()
    {
        super(InstructionType.Line, 2);
    }

    eval()
    {
        return [
            this.params[0].eval(),
            this.params[1].eval()
        ];
    }
}

class LengthInstruction extends Instruction
{
    constructor()
    {
        super(InstructionType.Line, 1);
    }

    eval()
    {
        let line = this.params[0].eval();
        let dx = line[1].x - line[0].x;
        let dy = line[1].y - line[0].y;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
}