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

// 生成多位数的口算题。如：15+25-10、50-35+15
export const oralGenerator = ({
  paramMin = 0, paramMax = 100,
  operNum = 3, operList = ['+', '-'],
  resultMin = 0, resultMax = 100,
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

  return { equations, finalResult };
};

// 批量生成口算题
export const oralGeneratorBatch = ({
  paramMin = 0, paramMax = 100,
  operNum = 3, operList = ['+', '-'],
  resultMin = 0, resultMax = 100,
  batchNum = 100,
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
    });
    resultList.push(resultObj);
  }
  return resultList;
};

export default { oralTwoOral, oralGenerator, oralGeneratorBatch };
