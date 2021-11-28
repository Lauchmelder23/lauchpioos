/// <reference path="instruction.ts" />

abstract class InstructionFactory
{
    private static symbolDict: { [name: string] : Function } = {
        "point":    (): PointInstruction    => { return new PointInstruction(); },
        "line":     (): LineInstruction     => { return new LineInstruction(); },
        "circle":   (): CircleInstruction   => { return new CircleInstruction(); },
        "len":      (): LengthInstruction   => { return new LengthInstruction(); }
    }

    public static createInstruction(name: string): Instruction
    {
        if(!(name in InstructionFactory.symbolDict))
            return null;

        return InstructionFactory.symbolDict[name]();
    }
}