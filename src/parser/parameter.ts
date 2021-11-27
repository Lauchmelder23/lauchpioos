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
