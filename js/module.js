/**
 * Change key code
 */
const keyModule = (() => {

  const keyMaps = createKeyMaps();

  const ucfirst = str => str[0].toUpperCase() + str.slice(1);

  const changeKey = (codes, baseKey, targetKey) => {
    baseKey = ucfirst(baseKey.toLowerCase());
    targetKey = ucfirst(targetKey.toLowerCase());
    const fromBaseCodes = keyMaps[baseKey];
    const targetBaseCode = keyMaps[targetKey];
    return codes.map(code => {
      code = replaceNonExistCode(code);
      const fromIdx = fromBaseCodes.indexOf(code);
      if (fromIdx === -1) {
        return code;
      }
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
    code = replaceNonExistCode(code);
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
    return code;
  };

  const _toAlphabet = code => {
    code = replaceNonExistCode(code);
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
    return code;
  };

  const _toKorean = code => {
    code = replaceNonExistCode(code);
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
    return code;
  };

  const toNumber = codes => codes.map(code => _toNumber(code));
  const toAlphabet = codes => codes.map(code => _toAlphabet(code));
  const toKorean = codes => codes.map(code => _toKorean(code));

  return { toNumber, toAlphabet, toKorean };
})();


function replaceNonExistCode(code) {
  return code.replace(/3\#/g, '4').replace(/7\#/g, '1');
};

/**
 * Create all KEY codes map
 */
function createKeyMaps() {
  const CODE_MI = 3;
  const CODE_FA = 4;
  const CODE_TI = 7;
  const CODE_DO = 1;
  
  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const map = {};
  
  let start = 1;
  const startSharpIndexes = [1, 3, 6, 8, 10];
  const equalKey = ['Db', 'Eb', 'Gb', 'Ab'];
  const equalKeyMap = {
    'C#': 'Db',
    'D#': 'Eb',
    'F#': 'Gb',
    'G#': 'Ab',
  };
  
  keys.forEach((key, idx) => {
    map[key] = [];
  
    let num = start;
    const sharp = startSharpIndexes.includes(idx);
    
    for (let i = 0; i < 12; i++) {
      const codes = map[key];
      if (num > 7) {
        num = num - 7;
      }
    
      let code = '';
      if (codes.length === 0) {
        code = `${num}`;
        if (i === 0 && sharp) {
          code = `${code}#`;
        }
      } else {
        const last = codes[codes.length - 1];
        const fc = parseInt(last[0]);
        const len = last.length;
    
        if (len === 1) {
          if (fc === CODE_MI) {
            code = `${CODE_FA}`;
          } else if (fc === CODE_TI) {
            code = `${CODE_DO}`;
          } else {
            code = `${fc}#`;
          }
        } else {
          code = `${fc+1}`;
        }
      }
  
      map[key].push(code);
    }
  
    if (key in equalKeyMap) {
      map[equalKeyMap[key]] = map[key];
    }
  
    const firstCode = map[key][0];
    const fc = parseInt(firstCode[0]);
    const len = firstCode.length;
    if (len === 2 || fc === CODE_MI) {
      start++;
    }
  });

  return map;
}