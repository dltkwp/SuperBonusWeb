const authToLogin = function (res) {
  if (res && res.code) {
    if (res.code === 401) {
      window.location.href = '/v_login'
    } else {
      this.$toast.warning(res.msg)
    }
  }
}

module.exports = {
  authToLogin
}
