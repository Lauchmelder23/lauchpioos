# Syntax

```
point(3 | 4) -> A
point(6 | 7) -> B

line(A, B) -> AB
line(0 | 0, 100 | 100)

circle(A, len(AB))
```

## Primitives
* `Point point(x, y)` is a 2D point. It returns an element of type `Point`
* `Line line(Point from, Point to)` is a straight line. It returns an element of type `Line`.
* `Circle circle(Point center, radius)` draws a circle at `center` and `radius`

## Grammar
```
instruction ::= identifier({parameter, })
parameter ::= instruction | identifier | number
identifier ::= (A-Za-z)
number ::= (0-9)[.(0-9)]
```