with open("./crimeData.txt") as f:
    crimes = f.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
crimes = [x.strip() for x in crimes] 

# loop through each crime report, noting that the first split
# occurs at the first instance of 0 or 1 for the months 01-12,
# and the second split occurs after the first "2018"

crimeJSON = []
for crime in crimes:
  firstDateIndex = crime.find("0")
  secondDateIndex = crime.find("1")
  dateIndex = -1
  if (firstDateIndex == -1 or secondDateIndex == -1):
    # takes advantage that one is positve, one is -1
    dateIndex = max(firstDateIndex, secondDateIndex)
  else:
    # both are present, in which case we want the FIRST occurence,
    # i.e. the min
    dateIndex = min(firstDateIndex, secondDateIndex)

  addressIndex = crime.find("2018") + 4 # add 4 to make up for losing 2018

  crimeType = crime[0: (dateIndex)]
  crimeDate = crime[dateIndex: addressIndex]
  crimeAddress = crime[addressIndex:len(crime)]

  crimeDict = {
    "crimeType": crimeType,
    "crimeDate": crimeDate,
    "crimeAddress": crimeAddress
  }

  crimeJSON.append(crimeDict)

print(crimeJSON)
