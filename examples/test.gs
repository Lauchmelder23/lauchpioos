point(200, 300) -> A
point(400, 300) -> B
[point(300, 128) -> C]

line(A, B) -> AB
line(B, C)
line(C, A)

circle(A, len(AB))
circle(B, len(AB))