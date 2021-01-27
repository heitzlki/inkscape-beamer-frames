import re
import numpy


def get_index(input_string, sub_string, ordinal):
    current = -1
    for i in range(ordinal):
        current = input_string.index(sub_string, current + 1)+1
    return current


fileName = "./file.svg"

# Opening file and adding lines to array
with open(fileName) as f:
    content = f.read().splitlines()

# creating new list without space at start/end
contentStrip = []
for spaceInLine in content:
    contentStrip.append(spaceInLine.strip())


# print(content.find("<?xml"))
print(contentStrip)
print("#####")
groupRE = re.compile('(<g|</g)')  # open/close groupe tag
groupList = list(filter(groupRE.match, contentStrip))
print(groupList)  # list = ['<g', '<g', '</g>', '</g>']

groupLinesList = []  # list = [g1=(1, 7), g2=(3, 6)]
for groupe in range(len(groupList)):
    if(groupList[groupe] == "<g"):
        groupLinesList.append(
            ("g"+str(groupe), get_index(contentStrip, groupList[groupe], groupe+1), 2))


# print(contentStrip.index(groupList[3])+1) # first matched value
# print(contentStrip.index(groupList[3], contentStrip.index(groupList[3]) + 1)+1) # second mateched value
print(groupLinesList)
# print(content[content.index(newList[2])])
