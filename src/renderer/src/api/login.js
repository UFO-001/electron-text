import http from '@utils/request.js'

// 手机验证码登录
export const loginByMobile = (data) => {
  return http.post('/u/loginByMobile', data)
}

// 登录图形验证码
export const captchaImage = (data) => {
  return http.get('/captcha/image', data, { responseType: 'arraybuffer', loading: true })
}
