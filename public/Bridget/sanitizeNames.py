import os
#import argparse

#args = parser.parse_args();

#if (type(args[0]) != string):
#   raise ValueError('Needs target directory name as argument')
#    exit

#dir_name = os.path.

filenames = os.listdir()
filenames.remove('sanitizeNames.py')
new_filenames = []

for filename in filenames:
    parts = filename.split('_', 3)
    new_filenames.append(parts[3])

for index in range(0, len(filenames)):
    os.system('mv ' + filenames[index] + ' ' + new_filenames[index])
