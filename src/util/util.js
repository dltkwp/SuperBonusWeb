const authToLogin = function (res) {
  if (res && res.code) {
    if (res.code === 401) {
      window.location.href = '/v_login'
    } else {
      this.$toast.warning(res.msg)
    }
  }
}

const getPayTypeName = function (key) {
  let res = ''
  switch (key) {
    case 'wechat' :
      res = '微信'
  }
  return res
}

module.exports = {
  authToLogin,
  getPayTypeName
}
