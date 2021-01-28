import re
from termcolor import colored
import numbers


def get_index(input_string, sub_string, ordinal):
    current = -1
    for i in range(ordinal):
        current = input_string.index(sub_string, current + 1)
    return current


fileName = "./file.svg"

# Opening file and adding lines to array
with open(fileName) as f:
    content = f.read().splitlines()

# creating new list without space at start/end
contentStrip = []
for spaceInLine in content:
    contentStrip.append(spaceInLine.strip())

groupRE = re.compile('(<g|</g)')  # open/close groupe tag
groupList = list(filter(groupRE.match, contentStrip))
print(groupList)  # list = ['<g', '<g', '</g>', '</g>']


def get_close_tag(openTags):
    # if g0  and in groupe 2 open tags then 2 - 0 = 2
    x = groupList.count('<g') - openTags  # 2 - 1
    x = x*2  # 2*2 = 4 # 1*2 = 2
    return x-1  # 4-1 = 3 # 2-1


def get_group(groupOpener):
    return "g"+str(groupOpener)


def get_start(groupOpener, groupe):
    return get_index(contentStrip, groupList[groupe], groupOpener)+1


def get_end(openTags):
    get_tag = groupList[openTags+get_close_tag(openTags)]
    get_iteration = (groupList.count('</g>') - openTags)

    return get_index(contentStrip, get_tag, get_iteration)+1


# Counter(list['searched'])
groupLinesList = []  # list = [g1=(1, 7), g2=(3, 6)]
openTags = 0
lastTag = ""
groupOpener = 0
for groupe in range(len(groupList)):
    if(groupList[groupe-1] == "</g>" and groupe-1 != -1 and groupList[groupe] == "<g"):
        groupOpener += 1
        openTags = 0
        groupLinesList.append(
            (get_group(groupOpener), get_start(groupOpener, groupe), get_end(openTags)))

    elif(groupList[groupe] == "<g"):
        groupOpener += 1
        groupLinesList.append(
            (get_group(groupOpener), get_start(groupOpener, groupe), get_end(openTags)))
        openTags += 1

print(groupLinesList)

mainGroup = ""

for groupes in groupLinesList:
    line = 0
    line = groupes[1]
    x = False
    y = False
    while line != groupes[2]:
        line += 1
        if(contentStrip[line] == 'x=\"0\"'):
            x = True
        if(contentStrip[line] == 'x=\"0\"'):
            y = True
        if(x == True and y == True):
            # print(colored(colored(groupes[0]+" is the main group", 'green')))
            mainGroup = ""
            mainGroup = groupes[0]
            break


# Get groupe from sublist
mainGroup = next(
    (sublist for sublist in groupLinesList if mainGroup in sublist))
mainGroupStart = mainGroup[1]-1  # add groupe start tag (e.g <g)
mainGroupEnd = mainGroup[2]

mainGroupList = []

while mainGroupStart < mainGroupEnd:
    mainGroupList.append(contentStrip[mainGroupStart])
    mainGroupStart += 1

print(mainGroupList)
xRE = re.compile('(x=)')
xList = list(filter(xRE.match, mainGroupList))
print(xList)

yRE = re.compile('(y=)')
yList = list(filter(yRE.match, mainGroupList))
print(yList)

digitList = []

for element in xList:
    digits = []
    for character in element:
        try:
            if(character == "."):
                digits.append(".")
                pass
            if(type(int(character)) == int):
                digits.append(int(character))
        except:
            pass
    digitList.append(digits)
print(digitList)
