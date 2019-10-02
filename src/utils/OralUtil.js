import _ from 'lodash';

// 生成随机数据，排除excludes
const randomSpecial = (lower, upper, excludes = [0]) => {
  let r = _.random(lower, upper);
  if (_.includes(excludes, r)) {
    // r = randomSpecial(lower, upper, excludes);
    r += 1;
  }
  return r;
};

// 生成2位数的口算题。如：15+25、50-35
export const oralTwoOral = ({
  p1,
  operList = ['+', '-'],
  resultMin = 0, resultMax = 100,
} = {}) => {
  let p2;
  let result;

  let oper = _.sample(operList);
  if (p1 >= resultMax) {
    oper = '-';
  } else if (p1 <= resultMin) {
    oper = '+';
  }

  if (oper === '+') {
    p2 = randomSpecial(resultMin, (resultMax - p1));
    result = p1 + p2;
  } else if (oper === '-') {
    p2 = randomSpecial(resultMin, p1 - 1);
    result = p1 - p2;
  }

  return {
    p1, p2, oper, result,
  };
};

// 获取算式显示方式。如：15+25-10=
export const getEquationDisplay = ({ equations }) => {
  const display = `${equations.join(' ')} =`;
  return display;
};

// 获取填空题显示方式。如：15+()-10=30
export const getGapFillingDisplay = ({ operNum, equations, finalResult }) => {
  const gapEqus = [...equations, '=', finalResult];
  const gapIdx = _.random(0, operNum - 1) * 2;
  gapEqus[gapIdx] = '()';

  const display = gapEqus.join(' ');
  return display;
};

// 获取题目显示方式
export const getDisplay = ({
  operNum, displayType, equations, finalResult,
}) => {
  const type = _.sample(displayType);
  if (String(type) === '2') {
    return getGapFillingDisplay({ operNum, equations, finalResult });
  }
  return getEquationDisplay({ equations });
};

// 生成多位数的口算题。如：15+25-10、50-35+15
export const oralGenerator = ({
  paramMin = 0, paramMax = 100,
  operNum = 3, operList = ['+', '-'],
  resultMin = 0, resultMax = 100,
  displayType = [1],
} = {}) => {
  let p1 = randomSpecial(paramMin, paramMax);

  const equations = [p1];
  let finalResult;
  for (let i = 1; i < operNum; i += 1) {
    const { p2, oper, result } = oralTwoOral({
      p1, operList, resultMin, resultMax,
    });
    equations.push(oper, p2);
    p1 = result;
    finalResult = result;
  }

  const display = getDisplay({
    operNum, displayType, equations, finalResult,
  });

  return { equations, finalResult, display };
};

// 批量生成口算题
export const oralGeneratorBatch = ({
  paramMin = 0, paramMax = 100,
  operNum = 3, operList = ['+', '-'],
  resultMin = 0, resultMax = 100,
  batchNum = 100, displayType = [1],
} = {}) => {
  const resultList = [];
  for (let i = 0; i < batchNum; i += 1) {
    const resultObj = oralGenerator({
      paramMin,
      paramMax,
      operNum,
      operList,
      resultMin,
      resultMax,
      displayType,
    });
    resultList.push(resultObj);
  }
  return resultList;
};

export default { oralTwoOral, oralGenerator, oralGeneratorBatch };
