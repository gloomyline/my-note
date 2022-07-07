# -*- coding: utf-8 -*-

print('[link](https://docs.python.org/zh-cn/3/tutorial/controlflow.html)')
x = int(input('Plz enter an integer:'))

if x < 0:
  x = 0
  print('Negative changed to zero')
elif x == 0:
  print('Zero.')
elif x == 1:
  print('Single')
else:
  print('more')

l = ['Alan', 'James', 'Tom', 'Jerry']
for idx, item in enumerate(l):
  print('%d: %s' % (idx, item))


print('\n')
print('-----------------------------------')
print('\n')

for i in range(len(l)):
  print('%d: %s' % (i, l[i]))


print('\n')
print('-----------------------------------')
print('循环语句支持 else 子句；for 循环中，可迭代对象中的元素全部循环完毕，或 while 循环的条件为假时，执行该子句；break 语句终止循环时，不执行该子句。 ')

def searchPrimeOrComposite(nums):
  primes = []
  composites = []
  for n in nums:
    for x in range(2, n):
      if n % x == 0:
        composites.append(n)
        break
    else:
      primes.append(n)
  return (primes, composites)
a, b = searchPrimeOrComposite(range(10))
print('primes:', a, 'composites:', b)
print('\n')

print('循环的 else 子句更像 try 的 else 子句： try 的 else 子句在未触发异常时执行，循环的 else 子句则在未运行 break 时执行。')
print('\n')
print('-----------------------------------')


def fib(n):
  '''
  write Fibonacci series up to n
  '''
  l = []
  a, b = 0, 1
  while (a < n):
    l.append(a)
    a, b = b, a + b
  return l

print(fib(2000))