//subtract two strings/a from b (b>a)
function sub(a, b) {
  let carry = 0;
  let i = a.length - 1;
  let j = b.length - 1;
  let ans = [];
  while (j !== -1) {
    let dig1 = Number(a[i]);
    let dig2 = Number(b[j]);
    if (!dig1) dig1 = 0;
    if (dig2 - (dig1 + carry) < 0) {
      let remain = 10 + dig2 - (dig1 + carry);
      ans[j] = remain;
      carry = 1;
    } else {
      let remain = dig2 - (dig1 + carry);
      ans[j] = remain;
      carry = 0;
    }
    i--;
    j--;
  }
  j++;
  let str = "";
  while (ans[j] == 0) j++;
  while (j !== b.length) {
    str += ans[j];
    j++;
  }
  return str;
}

module.exports = { sub };
