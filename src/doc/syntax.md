# Syntax

```
[point(3, 4) -> A]
point(6, 7) -> B

line[color=red, weight=4](A, B) -> AB
line(point(0, 0), point(100, 100))

circle(A, len(AB))
```

## Behaviour
Every line is one instruction. It is possible to assign instructions names to re-use them later.
These variables are immutable. Objects do not exist in this script, in fact, variables are more similar to C-style macros than actual variables.

Lines in brackets `[]` are "hidden". They are parsed, but will not be rendered.

It is possible to add an optional set of parameters in front of each parameter list, in order to specify the appearance of the element.

## Primitives vs Functions
Primitives (e.g. `point`, `line`) and Functions (e.g. `len`, `intersection`) are syntactically indistinguishable.
Both can be used as parameters or instructions and can be assigned to variables. The only difference is that Primitives generate a visual output (unless they are surrounded by square brackets)

## Grammar
```
instruction ::= identifier({parameter, }) [-> identifer]
parameter ::= instruction | identifier | number
identifier ::= (A-Za-z)
number ::= (0-9)[.(0-9)]
```
