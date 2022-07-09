# -*- coding: utf-8 -*-
import math
from datetime import datetime

## Fancier Output Formatting

# 1. Formatted String Literals
year = datetime.now().strftime('%Y')
event = 'Freedom'
print(f'Results of {year} {event}')
print('-' * 40)

# 2. The str.format() method of strings requires more manual effort
yes_votes = 42_572_654
no_votes = 43_132_495
percentage = yes_votes / (yes_votes + no_votes)
print('{:-9} YES votes {:2.2%}'.format(yes_votes, percentage))
print('-' * 40)

# 3. The string type has some methods that perform useful operations for padding strings to a given column width.

# 4. jk4. When you don’t need fancy output but just want a quick display of some variables for debugging purposes, 
# you can convert any value to a string with the repr() or str() functions.

## Formatted String Literals
# > Formatted string literals (also called f-strings for short) 
# let you include the value of Python expressions 
# inside a string by prefixing the string with f or F and writing expressions as {expression}.
print(f'The value of pi is approximately {math.pi:.3f}')
print('-' * 40)

# 1. Passing an integer after the ':' will cause that field to be a minimum number of characters wide. 
# This is useful for making columns line up.
table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 7678}
for person, phone in table.items():
  print(f'{person:10} ==> {phone:10d}')
print('-' * 40)

# 2. Other modifiers can be used to convert the value before it is formatted.
# '!a' applies ascii(), '!s' applies str(), and '!r' applies repr():
animal = 'cat'
print(f'My favorite animal is {animal}.')
print(f'My favorite animal is {animal!s}.')
print(f'My favorite animal is {animal!r}.')
print('-' * 40)

##  The String format() Method
# 1. The brackets and characters within them (called format fields)
# are replaced with the objects passed into the str.format() method.
# A number in the brackets can be used to refer to the position of the object passed into the str.format() method.
print('{0} and {1}'.format('Jack', 'Rose'))
print('{1} and {0}'.format('Jack', 'Rose'))
print('-' * 40)

# 2. If keyword arguments are used in the str.format() method, their values are referred to by using the name of the argument.
print('This {food} is {adjective}.'.format(food='dumplings', adjective='extremly delicious'))
print('-' * 40)

# 3. Positional and keyword arguments can be arbitrarily combined:
print('The story of {0}, {1} and {other}'.format('Jack', 'Rose', other='Alan'))
print('-' * 40)

# 4. If you have a really long format string that you don’t want to split up,
# it would be nice if you could reference the variables to be formatted by name instead of by position.
# This can be done by simply passing the dict and using square brackets '[]' to access the keys.
print('Sjoerd: {0[Sjoerd]:d}; Jack: {0[Jack]:d}; Dcab: {0[Dcab]:d}'.format(table))
# equals
print('Sjoerd: {Sjoerd:d}; Jack: {Jack:d}; Dcab: {Dcab:d}'.format(**table))
print('-' * 40)

# 5. This is particularly useful in combination with the built-in function vars(), which returns a dictionary containing all local variables.
for _ in range(1, 11):
  print('{0:2d} squares is {1:3d}, and cubes is {2:4d}'.format(_, _ ** 2, _ ** 3))
print('-' * 40)

## Manual String Formatting
# 1. Here’s the same table of squares and cubes, formatted manually:
for _ in range(1, 11):
  print(repr(_).rjust(2), repr(_ ** 2).rjust(3), repr(_ ** 3).rjust(4), end=' ')
  print('\n')
