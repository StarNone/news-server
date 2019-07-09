const qiniu = require('qiniu')

var accessKey = 'yM_Nq57zdNiGwCqIWzId2-U4nnMp8yxAcCnR6ySK'
var secretKey = 'XqMvhnXZpOP0nj5zm2UQy0fDr6tSXtoL9l04ogAM'
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

module.exports = function () {
  var options = {
    scope: 'news', // 空间名
    returnBody: '{"key":"$(key)","hash":"$(etag)","url":"https://prordcj97.bkt.clouddn.com/$(key)"}',
    expires: 3600
  }
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}