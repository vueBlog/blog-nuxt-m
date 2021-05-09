/* eslint-disable no-useless-escape */
// 判断是否是移动端，如果非移动端则跳转到pc页面
window.OS = (function() {
  let a = navigator.userAgent
  const b = /(?:Android)/.test(a)
  const d = /(?:Firefox)/.test(a)
  const e = /(?:Mobile)/.test(a)
  const f = b && e
  const g = b && !f
  const c = /(?:iPad.*OS)/.test(a)
  const h = !c && /(?:iPhone\sOS)/.test(a)
  const k = c || g || /(?:PlayBook)/.test(a) || (d && /(?:Tablet)/.test(a))
  a =
    !k &&
    (b ||
      h ||
      /(?:(webOS|hpwOS)[\s\/]|BlackBerry.*Version\/|BB10.*Version\/|CriOS\/)/.test(
        a
      ) ||
      (d && e))
  return {
    android: b,
    androidPad: g,
    androidPhone: f,
    ipad: c,
    iphone: h,
    tablet: k,
    phone: a
  }
})()
if (!window.OS.phone && !window.OS.ipad) {
  const url = `${location.origin}${location.pathname.replace(
    '/blogNuxtM',
    '/vue-blog'
  )}${location.search}${location.hash}`
  location.href = url
}
