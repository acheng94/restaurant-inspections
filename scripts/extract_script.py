import csv

with open('healthviolations.csv', 'w') as fp:

  with open('Restaurant_Inspections.csv', 'rb') as csvfile:
    reader = csv.reader(csvfile)
    header = next(reader, None)
    writer = csv.writer(fp, delimiter=',')
    writer.writerow([header[0], "violation"])
    for row in reader:
      if (row[20] != '') :
        violationarr = row[20].split(",")
        for violation in violationarr :
          writer.writerow([row[0], violation])


#    writer.writerow([header[0], header[1], "violation"])
#          writer.writerow([row[0], row[1], violation])
