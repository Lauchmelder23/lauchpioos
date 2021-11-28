point(0.2378, -34.389) -> A
point(2.5, 0) -> B
[point(-1, 3) -> C]

line(A, B) -> AB
line(B, C)
line(C, A)

circle(A, len(AB))