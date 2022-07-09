from os import stat


print('# list')
print('\n')

print('## list -> stack')
print('\n')
stack = list(range(3, 6))
stack.append(6)
stack.append(7)
stack.pop()
stack.pop(1)
print(stack)

print('-' * 40)

print('## list -> queue')
print('\n')
from collections import deque
queue = deque(['Alan', 'Tom', 'Jerry'])
queue.append('James')
queue.append('Jack')
print(queue)
print('%s now is left.' % queue.popleft())
print(queue)
