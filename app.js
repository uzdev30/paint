function reverse(array) {
  var output = [];
  while (array.length) {
    output.push(array.pop());
  }
  return output;
}

console.log(reverse([1, 2, 3, 4, 5, 6]));
console.log([1, 2, 3, 4, 5].pop());
// (array) => array.map(array.pop, [...array]);
// // console.log((array) => array.map(array.pop, [...array]));
// console.log(BigInt("eere"));
// console.log(123);
let con = 112;
console.log(con.push());
// console.log(type);
