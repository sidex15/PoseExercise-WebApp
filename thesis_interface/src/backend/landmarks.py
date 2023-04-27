def firstRow():
    landmarks = ['label']
    for val in range(0, 33):
        landmarks += ['x{}'.format(val), 'y{}'.format(val)]
    return landmarks