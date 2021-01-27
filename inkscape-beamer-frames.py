import re
import numpy

fileName = "./file.svg"

# Opening file and adding lines to array
with open(fileName) as f:
    content = f.read().splitlines()

# creating new list without space at start or end
contentStrip = []
for spaceInLine in content:
    contentStrip.append(spaceInLine.strip())


# print(content.find("<?xml"))
print(contentStrip)
print("#####")
groupRE = re.compile('(<g|</g)')  # open/close groupe tag
groupList = list(filter(groupRE.match, contentStrip))
print(groupList)  # list = ['<g', '<g', '</g>', '</g>']
# print(content.index(newList[2]))
# print(content[content.index(newList[2])])
