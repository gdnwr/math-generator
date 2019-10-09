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
  p1, pOrder = 1, // pOrder:参数的顺序。1:p1-p2、2:p2-p1
  operList = ['+', '-'],
  resultMin = 0, resultMax = 100,
} = {}) => {
  let p2;
  let result;
  let paramOrder = pOrder;

  let oper = _.sample(operList);
  if (p1 >= resultMax) {
    oper = '-';
    paramOrder = 1; // p1最大了，只能是p1减某个数
  } else if (p1 <= resultMin) {
    oper = '+';
  }

  // 顺序为:p1-p2
  if (paramOrder === 1) {
    if (oper === '+') {
      p2 = randomSpecial(resultMin, (resultMax - p1));
      result = p1 + p2;
    } else if (oper === '-') {
      p2 = randomSpecial(resultMin, p1 - 1);
      result = p1 - p2;
    }
  } else if (paramOrder === 2) { // 顺序为:p2-p1
    if (oper === '+') {
      p2 = randomSpecial(resultMin, (resultMax - p1));
      result = p2 + p1;
    } else if (oper === '-') {
      p2 = randomSpecial(p1 + 1, resultMax);
      result = p2 - p1;
    }
  }


  return {
    p1, p2, oper, result, pOrder: paramOrder,
  };
};

// 获取算式显示方式。如：15+25-10=
export const getEquationDisplay = ({ equations, finalResult }) => {
  const display = `${equations.join(' ')} =`;
  const answer = finalResult;
  return { display, answer };
};

// 获取填空题显示方式。如：15+_-10=30
export const getGapFillingDisplay = ({ equations, finalResult }) => {
  const equIdx = _.map(equations, (value, index) => {
    if (_.isNumber(value)) {
      return index;
    }
    return null;
  });
  const numIdexs = _.filter(equIdx, value => _.isNumber(value));
  const gapIdx = _.sample(numIdexs);

  const gapEqus = [...equations, '=', finalResult];
  const answer = gapEqus[gapIdx];
  gapEqus[gapIdx] = '_';

  const display = gapEqus.join(' ');

  return { display, answer };
};

// 获取题目显示方式
export const getDisplay = ({
  operNum, displayType, equations, finalResult,
}) => {
  const type = _.sample(displayType);
  if (String(type) === '2') {
    return getGapFillingDisplay({ operNum, equations, finalResult });
  }
  return getEquationDisplay({ equations, finalResult });
};

// 生成多位数的口算题。如：15+25-10、50-35+15
export const oralGenerator = ({
  paramMin = 0, paramMax = 100,
  operNum = 3, operList = ['+', '-'],
  resultMin = 0, resultMax = 100,
  displayType = [1], bracketType = 0,
} = {}) => {
  // 随机生成第一个参数
  let p1 = randomSpecial(paramMin, paramMax);
  // 保存算式
  let equations = [p1];
  // 保存运算结果
  let finalResult;
  // 保存上次运算是否加括号
  let lastIsBracket = false;

  for (let i = 1; i < operNum; i += 1) {
    // p1、p2的顺序
    let pOrder = 1;
    if (lastIsBracket) {
      pOrder = 2;
    }

    // 是否真的需要加括号
    let isBracket = false;
    if (bracketType === 1) { // 配置参数有括号
      if (i === 1) {
        isBracket = true;
      } else if (i === operNum - 1) {
        isBracket = false;
      } else {
        isBracket = _.sample([true, false]);
      }
    }
    lastIsBracket = isBracket;

    // 生成两个参数的表达式
    const {
      p2, oper, result, pOrder: paramOrder,
    } = oralTwoOral({
      p1, operList, resultMin, resultMax, pOrder,
    });

    if (paramOrder === 1) { // 顺序为:p1-p2
      equations.push(oper, p2);
    } else if (paramOrder === 2) { // 顺序为:p2-p1
      equations = [p2, oper, ...equations];
    }
    if (isBracket) { // 有括号
      // 增加左右括号
      equations = ['(', ...equations, ')'];
    }
    p1 = result;
    finalResult = result;
  }

  // 保存显示方式
  const { display, answer } = getDisplay({
    operNum, displayType, equations, finalResult,
  });

  return {
    equations, finalResult, display, answer,
  };
};

/**
 * 批量生成口算题
 * @param {*} batchNum 生成题目数量
 * @param {*} displayType 答题方式 1|标准题、2|填空题
 * @param {*} bracketType 是否包含括号 0|无括号、1|有括号、2|随机括号
 */
export const oralGeneratorBatch = ({
  paramMin = 0, paramMax = 100,
  operNum = 3, operList = ['+', '-'],
  resultMin = 0, resultMax = 100,
  batchNum = 100, displayType = [1],
  bracketType = 0,
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
      bracketType: bracketType === 2 ? _.sample([0, 1]) : bracketType,
    });
    resultList.push(resultObj);
  }
  return resultList;
};

export default { oralTwoOral, oralGenerator, oralGeneratorBatch };
