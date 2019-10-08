// 带圆圈数字
export const circleNumber = (num) => {
  if (num === 0) {
    return String.fromCharCode(9450);
  }

  if (num >= 1 && num <= 20) {
    return String.fromCharCode(9312 + num - 1);
  }

  if (num >= 21 && num <= 35) {
    return String.fromCharCode(12881 + num - 21);
  }

  if (num >= 36 && num <= 50) {
    return String.fromCharCode(12977 + num - 36);
  }

  return num;
};

// 数字转汉字
export const num2hanzi = (num) => {
  const hanziNum = {
    0: '零', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九',
  };
  const units = ['个', '万', '亿', '万亿', '兆'];
  const suffix = ['', '十', '百', '千'];
  const numString = `${num}`;
  if (!(/^\d+$/.test(numString))) {
    throw new Error('Not a number');
  }
  if (num.length > 20) {
    throw new Error('Number is too large');
  }
  const digitList = numString.split('');
  digitList.reverse();
  const splitNumList = [];
  let l = digitList.splice(0, 4);
  while (l.length) {
    splitNumList.push(l);
    l = digitList.splice(0, 4);
  }
  let hanzi = '';
  splitNumList.forEach((arr, i) => {
    let rst = '';
    arr.forEach((digit, j) => {
      rst = hanziNum[digit] + suffix[j] + rst;
    });
    rst += units[i % 6];
    hanzi = rst + hanzi;
  });
  suffix.forEach((item) => { hanzi = hanzi.replace(new RegExp(`零${item}`, 'g'), '零'); });
  for (let i = units.length - 1; i >= 0; i -= 1) {
    const val = units[i];
    hanzi = hanzi.replace(new RegExp(`(零+)${val}`, 'g'), (match, $1) => ($1.length === 4 ? '' : val));
  }
  hanzi = hanzi.replace(/零+/g, '零');
  hanzi = hanzi.replace(/个/g, '');
  hanzi = hanzi.replace(/^一十/, '十');
  return hanzi;
};

export default { circleNumber };
