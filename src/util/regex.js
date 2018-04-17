const pattern = {
  phone: /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199)+\d{8})$/,
  pwd: /^[a-zA-Z0-9]{8,20}$/,
  gtZeroNumer: /^[1-9]\d*$/
}

const phone = function (val) {
  return pattern.phone.test(val)
}
const pwd = function (val) {
  return pattern.pwd.test(val)
}
const gtZeroNumer = function (val) {
  return pattern.gtZeroNumer.test(val)
}

module.exports = {
  phone,
  pwd,
  gtZeroNumer
}
