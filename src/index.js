module.exports = function zeros(expression) {

  let arr = [];
  let numbOfTwos = 0;
  let numbOfFives = 0;

  for (let i=0; i<expression.length; i++) {
    if (expression[i]=='*') {
      expression = expression.replace('*','');
    } 
    else {
      continue;
    }
  }

  let k = 0;
  let n = 1;
  for (let i=0; i<expression.length; i=i+n) {
    k += 1;
    n = 1;
    if (expression[i]!='!') {
      continue;
    } 
    else {
      if (i == expression.length-1 || expression[i+1]!='!') {
        arr.push(expression.substr(i-(k-1),k));
        k = 0;
      } 
      else {
        arr.push(expression.substr(i-(k-1),k+1))
        k = 0;
        n = 2;
      }
    }
  }

  for (let item of arr) {
    let b = 1;
    let n = 1;
    let a = 0;
    if (item[item.length-2]!='!') {
      let a = +(item.substr(0,item.length-1));
      while (Math.floor(a/Math.pow(2,b))!=0) {
        numbOfTwos += Math.floor(a/Math.pow(2,b));
        b++;
      }
      while (Math.floor(a/Math.pow(5,n))!=0) {
        numbOfFives += Math.floor(a/Math.pow(5,n));
        n++;
      }
    } 
    else {
      let a = +(item.substr(0,item.length-2));
      if (+(item.substr(0,item.length-2)%2==0)) {
        while (Math.floor(a/Math.pow(2,b))!=0) {
          numbOfTwos += Math.floor(a/Math.pow(2,b));
          b++;
        }
        numbOfFives += Math.floor(a/10);
        n = 2;
        while (Math.floor(a/(2*Math.pow(5,n)))!=0) {
          numbOfFives += Math.floor(a/(2*Math.pow(5,n)));
          n++;
        }
      } 
      else {
        while (Math.floor(a/Math.pow(5,n))!=0) {
          numbOfFives += Math.floor(a/Math.pow(5,n));
          n++;
        }
        numbOfFives -= Math.floor(a/10);
        n = 2;
        while (Math.floor(a/(2*Math.pow(5,n)))!=0) {
          numbOfFives --;
          n++;
        }
      }
    }
  }
  return Math.min(numbOfTwos, numbOfFives);
}
