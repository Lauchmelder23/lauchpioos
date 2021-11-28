/// <reference path="parameter.ts" />
/// <reference path="instructionFactory.ts" />

class Parser
{
    public instructions: Instruction[];
    private variables: { [id: string] : InstructionParameter};

    constructor(source: string)
    {
        this.instructions = [];
        this.variables = {};

        let lines = source.split(/\r?\n/);
        for(let line of lines)
        {
            let instr = this.parseInstruction(line);
            if(instr !== null)
                if(!instr[0])
                    this.instructions.push(instr[1]);  
        }
    }

    private parseInstruction(instruction: string): [boolean, Instruction]
    {
        // If the instruction is an empty line, do nothing for now
        if(instruction === "")
            return null;
        
        let hidden = false;
        if(instruction[0] === "[" && instruction[instruction.length - 1] === "]")
        {
            hidden = true;
            instruction = instruction.substring(1, instruction.length - 1);
        }

        instruction = instruction.split(" ").join("");  // Remove spaces

        // match the pattern "text(text)"
        let matches = instruction.match(/[A-Za-z]*\(.*\)/);
        if(matches === null)    // no match found
        {
            console.error("Invalid syntax");
            return null;
        }

        if(matches.length > 1)  // more than one match
        {
            console.error("Script may only contain one instruction per line");
            return null;
        }

        let instr = matches[0]; // get the instruction
        let paranthesisPos = instr.search(/\(/);    // Find the position of the first opening paranthesis


        let symbol = instr.substr(0, paranthesisPos);   // get function name
        let paramlist = instr.substring(paranthesisPos + 1, instr.length - 1); // get parameter list
        
        let match;
        let params = [];
        while((match = paramlist.search(/,(?![^\(]*\))/)) !== -1)
        {
            params.push(paramlist.substring(0, match));
            paramlist = paramlist.substring(match + 1, paramlist.length);
        }
        params.push(paramlist);

        let newInstruction = InstructionFactory.createInstruction(symbol);
        if(newInstruction === null)
        {
            console.error("Unknown instruction: \"" + symbol + "\"");
            return null;
        }

        let expectedArgs = newInstruction.getParameterCount();
        if(expectedArgs !== params.length)
        {
            console.error("Wrong number of arguments for instruction \"" + symbol + "\". Expected " + expectedArgs + " arguments but received " + params.length + " instead.");
            return null;
        }

        for(let param of params)
        {
            if(!this.parseParameter(newInstruction, param))
            {
                console.error("Error during parameter parsing: \"" + param + "\" failed to be parsed.");
                return null;
            }
        }

        let assignment = instruction.search(/->/);
        if(assignment !== -1)
        {
            let variableName = instruction.substring(assignment + 2, instruction.length);
            if(variableName in this.variables)
            {
                console.error("Redefinition of variable \"" + variableName + "\" is not allowed.");
                return null;
            }

            this.variables[variableName] = new InstructionParameter(newInstruction);
        }

        return [hidden, newInstruction];
    }

    private parseParameter(instr: Instruction, parameter: string): boolean
    {
        let match = parameter.match(/-?\d*\.?\d*$/);
        if(match !== null && match[0] === parameter && match.index === 0)
        {
            let val = parseFloat(parameter);
            let paramObj = new NumberParameter(val);

            instr.params.push(paramObj);
            return true;
        }

        match = parameter.match(/[A-Za-z]*/)
        if(match !== null && match[0] === parameter && match.index === 0)
        {
            let paramObj = this.variables[parameter];
            if(paramObj === undefined)
            {
                console.error("Variable \"" + parameter + "\" is not defined");
                return false;
            }

            instr.params.push(paramObj);
            return true;
        }

        match = parameter.match(/[A-Za-z]*\(.*\)/)
        if(match !== null && match[0] === parameter && match.index === 0)
        {
            let paramObj = new InstructionParameter(this.parseInstruction(parameter)[1]);

            instr.params.push(paramObj);
            return true;
        }

        return false;
    }
}
