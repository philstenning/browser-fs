export default function round(num: number, decimalPlaces = 2) {
  var p = Math.pow(10, decimalPlaces)
  var n = num * p * (1 + Number.EPSILON)
  return Math.round(n) / p
}
