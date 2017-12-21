let Utils = {}
// 封装动画函数
Utils.animation = function () {
  window.requestAnimeFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }
}
// 计算趋向坐标
Utils.lerpDistance = function (aim, cur, ratio) {
  let delta = cur - aim
  return aim + delta * ratio // ratio: 0~1
}
// 计算趋向角度
Utils.lerpAngle = function (aim, cur, t) {
  let d = cur - aim
  if (d > Math.PI) d = d - 2 * Math.PI
  if (d < -Math.PI) d = d + 2 * Math.PI
  return aim + d * t
}
// 计算两点之前距离
Utils.calDistance = function (x1, y1, x2, y2) {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
}
export default Utils
