function eval() {
  return;
}

function expressionCalculator(string) {
  let expr = string.replace(/ /g, '').replace(/-/g, '~');

  const divide = (x, y) => {
    if (y === 0) throw TypeError("TypeError: Division by zero.");
    else return x / y;
  }

  const parseDiv = (expr) => {
    const parts = expr.split('/');
    const partsToNums = parts.map(str => parseFloat(str)); 
    return partsToNums.reduce((acc, num) => divide(acc, num));
  };

  const parseMult = (expr) => {
    const parts = expr.split('*').map(part => parseDiv(part));
    return parts.reduce((acc, num) => acc * num);
  };

  const parseMinus = (expr) => {
    const parts = expr.split('~').map(part => parseMult(part));
    return parts.reduce((acc, num) => acc - num);
  };

  const parsePlus = (expr) => {
    const parts = expr.split('+').map(part => parseMinus(part));
    return parts.reduce((acc, num) => acc + num);
  };

  const findPartInBrackets = (expr) => {
    const openBracketInd = expr.lastIndexOf('(');
    let closeBracketInd = expr.slice(openBracketInd).indexOf(')');
    if (openBracketInd === -1 || closeBracketInd === -1) {
      throw Error('ExpressionError: Brackets must be paired');
    } else {
      closeBracketInd += openBracketInd;
      const currentPart = expr.slice(openBracketInd + 1, closeBracketInd);
      return expr.slice(0, openBracketInd) + parsePlus(currentPart) + expr.slice(closeBracketInd + 1);
    }
  };

  while (expr.indexOf('(') !== -1 || expr.indexOf(')') !== -1) expr = findPartInBrackets(expr);

  return parsePlus(expr);
}

module.exports = {
  expressionCalculator
}