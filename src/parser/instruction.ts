enum InstructionType
{
    Point,
    Line,
    Circle
}

class Instruction 
{
    public fn: InstructionType;
    public params :Parameter[];

    constructor(type: InstructionType)
    {
        this.fn = type;
        this.params = [];
    }
}