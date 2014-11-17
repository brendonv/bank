

module.exports = function(card) {
  
  return card.split('').reverse().reduce(function(p, v, i, a) {
    return parseInt(p) + (i%2 ? ( v*2 >= 10 ? v*2%10+1 : v*2 ) : parseInt(v));
  }) % 10;

};