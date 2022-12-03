((keyModule, codeModule) => {
  const { createApp, ref } = Vue;

  const MODE_KEY = 'key';
  const MODE_CODE = 'code';
  const MODE_ITEMS = [
    { label: 'KEY', value: MODE_KEY },
    { label: 'CODE', value: MODE_CODE },
  ];
  const KEY_ITEMS = [
    'C', 'C#', 'Db', 'D', 
    'D#', 'Eb', 'E', 'F', 
    'F#', 'Gb', 'G', 'G#', 
    'Ab', 'A', 'A#', 'Bb', 'B',
  ];
  const CODE_TYPE_NUM = 'num';
  const CODE_TYPE_ALPHABET = 'alphabet';
  const CODE_TYPE_KOR = 'kor';
  const CODE_TYPES = [
    { label: 'Number', value: CODE_TYPE_NUM },
    { label: 'Alphbet', value: CODE_TYPE_ALPHABET },
    { label: 'Korean', value: CODE_TYPE_KOR },
  ];

  createApp({
    setup() {
      const modes = ref(MODE_ITEMS);
      const keys = ref(KEY_ITEMS);
      const codeTypes = ref(CODE_TYPES);
      
      const curMode = ref(modes.value[0].value);
      const fromKey = ref(keys.value[0]);
      const targetKey = ref(keys.value[1]);
      const targetCodeType = ref(CODE_TYPE_KOR);

      const input = ref('');
      const output = ref('');

      const doChange = () => {
        const inputRows = input.value.split('\n').map(row => {
          return row
            .replace(/^\s+/, '')
            .replace(/\s$/, '')
            .replace(/\s+/g, ' ');
        });
        
        if (curMode.value === MODE_KEY) {
          output.value = inputRows.map(row => {
            const codes = [];
            row.split('').forEach(item => {
              if (item !== '#') {
                codes.push(item);
              } else {
                codes[codes.length - 1] = `${codes[codes.length - 1]}${item}`;
              }
            });
            return keyModule.changeKey(codes, fromKey.value, targetKey.value);
          });
        } else {
          output.value = inputRows.map(row => {
            const codes = row.split(' ').filter(item => item.length > 0);
            if (targetCodeType.value === CODE_TYPE_NUM) {
              return codeModule.toNumber(codes);
            } else if (targetCodeType.value === CODE_TYPE_ALPHABET) {
              return codeModule.toAlphabet(codes);
            } else if (targetCodeType.value === CODE_TYPE_KOR) {
              return codeModule.toKorean(codes);
            }
          })
        }
      };

      return {
        MODE_KEY, MODE_CODE,
        modes, keys, codeTypes, 
        curMode, fromKey, targetKey, targetCodeType,
        input, output,

        doChange,
      };
    },
  }).mount('#app');
})(keyModule, codeModule);
