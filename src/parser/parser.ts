/// <reference path="parameter.ts" />
/// <reference path="instruction.ts" />

class Parser
{
    private instructions: Instruction[];

    constructor(source: string)
    {
        this.instructions = [];
        let lines = source.split(/\r?\n/);
        for(let line of lines)
            this.parseInstruction(line);
    }

    private parseInstruction(instruction: string): boolean
    {
        // If the instruction is an empty line, do nothing for now
        if(instruction === "")
            return false;
        
        // match the pattern "text(text)"
        let matches = instruction.match(/[A-Za-z]*\(.*\)/);
        if(matches === null)    // no match found
        {
            console.error("Invalid syntax");
            return false;
        }

        if(matches.length > 1)  // more than one match
        {
            console.error("Script may only contain one instruction per line");
            return false;
        }

        let instr = matches[0]; // get the instruction
        instr = instr.split(" ").join("");
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

        this.instructions.push(new Instruction(InstructionType.Point));
        for(let param of params)
        {
            if(!this.parseParameter(param))
            {
                console.error("Error during parameter parsing");
                return false;
            }
        }

        return true;
    }

    private parseParameter(parameter: string): boolean
    {
        let match = parameter.search(/\d*\.?\d*$/);
        if(match === 0)
        {
            this.instructions[this.instructions.length - 1].params.push(new NumberParameter(4));
            return true;
        }

        return false;
    }
}
