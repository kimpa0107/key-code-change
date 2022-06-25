/**
 * Change key code
 */
const keyModule = (() => {

  const keyMaps = {
    C: ['1', '2', '3', '4', '5', '6', '7'],
    'C#': ['1#', '2#', '4', '4#', '5#', '6#', '1'],
    Db: ['1#', '2#', '4', '4#', '5#', '6#', '1'],
    D: ['2', '3', '4#', '5', '6', '7', '1#'],
    'D#': ['2#', '4', '5', '5#', '6#', '1', '2'],
    Eb: ['2#', '4', '5', '5#', '6#', '1', '2'],
    E: ['3', '4#', '5#', '6', '7', '1#', '2#'],
    F: ['4', '5', '6', '6#', '1', '2', '3'],
    'F#': ['4#', '5#', '6#', '7', '1#', '2#', '4'],
    Gb: ['4#', '5#', '6#', '7', '1#', '2#', '4'],
    G: ['5', '6', '7', '1', '2', '3', '4#'],
    'G#': ['5#', '6#', '1', '1#', '2#', '4', '5'],
    Ab: ['5#', '6#', '1', '1#', '2#', '4', '5'],
    A: ['6', '7', '1#', '2', '3', '4#', '5#'],
    'A#': ['6#', '1', '2', '2#', '4', '5', '6'],
    Bb: ['6#', '1', '2', '2#', '4', '5', '6'],
    B: ['7', '1#', '2#', '3', '4#', '5#', '6#'],
  };

  const ucfirst = str => str[0].toUpperCase() + str.slice(1);

  const changeKey = (codes, baseKey, targetKey) => {
    baseKey = ucfirst(baseKey.toLowerCase());
    targetKey = ucfirst(targetKey.toLowerCase());
    const fromBaseCodes = keyMaps[baseKey];
    const targetBaseCode = keyMaps[targetKey];
    return codes.map(code => {
      const fromIdx = fromBaseCodes.indexOf(code);
      return targetBaseCode[fromIdx];
    });
  };

  const printCodes = codes => {
    console.log(
      JSON.stringify(
        codes.map(code => {
          return code.length === 2 ? code : `${code} `;
        })
      )
        .replace(/,/g, '\t')
        .replace(/"/g, '')
        .replace(/[\[\]]/g, '')
    );
  };

  return { changeKey, printCodes };
})();

/**
 * Change code to different type: number, alphabet, korean
 * only support major and sharp
 */
const codeModule = (() => {
  const nums = ['1', '2', '3', '4', '5', '6', '7'];
  const codes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const kos = ['도', '레', '미', '파', '솔', '라', '시'];

  const isNumber = code => /^\d/.test(code);
  const isAlphaet = code => /^[a-gA-G]/.test(code);
  const isKorean = code => /^[도레미파솔라시]/.test(code);

  const _toNumber = code => {
    code = code + '';
    if (isNumber(code)) {
      return code;
    }
    if (isAlphaet(code)) {
      const fc = code[0].toUpperCase();
      const idx = codes.indexOf(fc);
      return nums[idx] + code.slice(1);
    }
    if (isKorean(code)) {
      const fc = code[0];
      const idx = kos.indexOf(fc);
      return nums[idx] + code.slice(1);
    }
    throw new Error(`input error: ${code}`);
  };

  const _toAlphabet = code => {
    code = code + '';
    if (isAlphaet(code)) {
      return code.toUpperCase();
    }
    if (isNumber(code)) {
      const fc = code[0];
      const idx = nums.indexOf(fc);
      return codes[idx] + code.slice(1);
    }
    if (isKorean(code)) {
      const fc = code[0];
      const idx = kos.indexOf(fc);
      return codes[idx] + code.slice(1);
    }
    throw new Error(`input error: ${code}`);
  };

  const _toKorean = code => {
    code = code + '';
    if (isKorean(code)) {
      return code;
    }
    if (isNumber(code)) {
      const fc = code[0];
      const idx = nums.indexOf(fc);
      return kos[idx] + code.slice(1);
    }
    if (isAlphaet(code)) {
      const fc = code[0].toUpperCase();
      const idx = codes.indexOf(fc);
      return kos[idx] + code.slice(1);
    }
    throw new Error(`input error: ${code}`);
  };

  const toNumber = codes => codes.map(code => _toNumber(code));
  const toAlphabet = codes => codes.map(code => _toAlphabet(code));
  const toKorean = codes => codes.map(code => _toKorean(code));

  return { toNumber, toAlphabet, toKorean };
})();

console.log(codeModule.toNumber(['1#', 'D', 'e#', '파#', '5', 'a', '시']));
console.log(codeModule.toAlphabet(['1#', 'D', 'e#', '파#', '5', 'a', '시']));
console.log(codeModule.toKorean(['1#', 'D', 'e#', '파#', '5', 'a', '시']));