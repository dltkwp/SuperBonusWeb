const SUPER_TOKEN_KEY = 'super-token-key'
const API_BASE_URL = 'https://api.superbonus.cn/web/'
// const API_BASE_URL = 'http://192.168.0.103:8081/web/' // 'https://api.superbonus.cn/web/'

const IS_DEBUG = true
const POINT_INTEVAL = 1000 // 积分整长的步长
const IMAGE_STATIC_URL = 'https://bonus.oss-cn-beijing.aliyuncs.com/product/'
const HEAD_IMAGE_DEFAULT = 'https://bonus.oss-cn-beijing.aliyuncs.com/product/C9AFBBE570F0463382463838F21E5677.png'
const LOGIN_USER_NAME_KEY = 'super-username-key'// 登录人的手机号存储的key
const LOGIN_USER_INFO_KEY = 'super-user-info-key'
const SUPER_AUTH_KEY = 'super-auth-key'

module.exports = {
  SUPER_TOKEN_KEY,
  API_BASE_URL,
  IS_DEBUG,
  POINT_INTEVAL,
  IMAGE_STATIC_URL,
  HEAD_IMAGE_DEFAULT,
  LOGIN_USER_NAME_KEY,
  LOGIN_USER_INFO_KEY,
  SUPER_AUTH_KEY
}
