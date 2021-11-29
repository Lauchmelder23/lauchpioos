/// <reference path="../vector.ts" />

enum InstructionType
{
    Point,
    Line,
    Circle
}

abstract class Instruction 
{
    public fn: InstructionType;
    public params :Parameter[];

    constructor(type: InstructionType)
    {
        this.fn = type;
        this.params = [];
    }

    abstract eval();
}

class PointInstruction extends Instruction
{
    constructor()
    {
        super(InstructionType.Point);
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
        super(InstructionType.Line);
    }

    eval()
    {
        return [
            this.params[0].eval(),
            this.params[1].eval()
        ];
    }
}