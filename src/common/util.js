import CryptoJS from 'crypto-js'

// const key = CryptoJS.enc.Utf8.parse("abcdef0123456789");  //十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('16-Bytes--String');   //十六位十六进制数作为密钥偏移量
// //解密方法
// function Decrypt(word) {
//     let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
//     let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
//     let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
//     let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//     return decryptedStr.toString();
// }
// //加密方法
// function Encrypt(word) {
//     let srcs = CryptoJS.enc.Utf8.parse(word);
//     let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
//     return encrypted.toString().toUpperCase();
// }
// export default {
// 	Decrypt ,
// 	Encrypt
// }
var key = CryptoJS.enc.Utf8.parse("abcdef0123456789");
//十六位十六进制数作为秘钥偏移量
var iv = CryptoJS.enc.Utf8.parse('16-Bytes--String');
//秘钥和偏移量后台会给前端
//封装解密
function Decrypt(word) {
  var decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
//加密方法
function Encrypt(word) {
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}

function formatString(str){
  if (typeof (str) != "string") {
    console.log('去除回车换行空格失败！参数不是字符串类型')
    return;
  }
  // str = str.replace(/\ +/g, "");//去掉空格
  str = str.replace(/[\r\n]/g, "");//去掉回车换行
  return str;
}
//暴露接口
export default {
	Decrypt ,
    Encrypt,
    formatString
}