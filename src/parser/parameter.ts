enum ParameterType 
{
    Instruction,
    Identifier,
    Number
}

abstract class Parameter 
{
    public type: ParameterType;

    constructor(type: ParameterType)
    {
        this.type = type;
    }

    abstract eval();
}

class NumberParameter extends Parameter 
{
    public val: number;

    constructor(val: number)
    {
        super(ParameterType.Number);

        this.val = val;
    }

    eval()
    {
        return this.val;
    }
}

class InstructionParameter extends Parameter
{
    public instr: Instruction;

    constructor(instr: Instruction)
    {
        super(ParameterType.Identifier);

        this.instr = instr;
    }

    eval()
    {
        return this.instr.eval();
    }
}