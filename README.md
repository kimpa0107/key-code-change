# Change KEY code

## keyModule

change KEY to other KEYs

#### Usages

```js
const targetKeys = [
  'C#', 'Db', 'D', 'D#', 'Eb',
  'E', 'F', 'F#', 'Gb', 'G',
  'G#', 'Ab', 'A', 'A#', 'Bb',
  'B',
];
const codes = ['1', '2', '3', '4', '5', '6', '7'];
targetKeys.forEach(key => {
  const targetCodes = keyModule.changeKey(codes, 'C', key);
  keyModule.printCodes(targetCodes);
});
```

##### result

```
1#      2#      4       4#      5#      6#      1 
1#      2#      4       4#      5#      6#      1 
2       3       4#      5       6       7       1#
2#      4       5       5#      6#      1       2 
2#      4       5       5#      6#      1       2 
3       4#      5#      6       7       1#      2#
4       5       6       6#      1       2       3 
4#      5#      6#      7       1#      2#      4 
4#      5#      6#      7       1#      2#      4 
5       6       7       1       2       3       4#
5#      6#      1       1#      2#      4       5 
5#      6#      1       1#      2#      4       5 
6       7       1#      2       3       4#      5#
6#      1       2       2#      4       5       6 
6#      1       2       2#      4       5       6 
7       1#      2#      3       4#      5#      6#
```

## codeModule

change CODE to other type: number, alphabet, korean

#### Usages

```js
console.log(codeModule.toNumber(['1#', 'D', 'e#', '파#', '5', 'a', '시']));
console.log(codeModule.toAlphabet(['1#', 'D', 'e#', '파#', '5', 'a', '시']));
console.log(codeModule.toKorean(['1#', 'D', 'e#', '파#', '5', 'a', '시']));
```

##### result

```
['1#', '2', '3#', '4#', '5', '6', '7']
['C#', 'D', 'E#', 'F#', 'G', 'A', 'B']
['도#', '레', '미#', '파#', '솔',  '라', '시']
```