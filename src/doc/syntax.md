# Syntax

```
[point(3, 4) -> A]
point(6, 7) -> B

line(A, B) -> AB
line(point(0, 0), point(100, 100))

circle(A, len(AB))
```

## Behaviour
Every line is one instruction. It is possible to assign instructions names to re-use them later.
These variables are immutable. Objects do not exist in this script, in fact, variables are more similar to C-style macros than actual variables.

Lines in brackets `[]` are "hidden". They are parsed, but will not be rendered.

## Primitives
* `Point point(x, y)` is a 2D point. It returns an element of type `Point`
* `Line line(Point from, Point to)` is a straight line. It returns an element of type `Line`.
* `Circle circle(Point center, radius)` draws a circle at `center` and `radius`

## Grammar
```
instruction ::= identifier({parameter, }) [-> identifer]
parameter ::= instruction | identifier | number
identifier ::= (A-Za-z)
number ::= (0-9)[.(0-9)]
```
