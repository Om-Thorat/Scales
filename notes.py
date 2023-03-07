scale = "C C# D D# E F F# G G# A A# B".split(" ")

# C C# D D# E F F# G G# A A# B
# T T S T T T S

for i in range(len(scale)):
    scllist = []
    j = 0
    while j in range(13):
        scllist.append(scale[(i+j)%len(scale)])
        if j in [4,11]:
            j = j + 1
        else:
            j = j + 2
    print(f"'{scale[i]}':{scllist},")