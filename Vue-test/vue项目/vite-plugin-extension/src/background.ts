import browser from "webextension-polyfill";
import {SEND_STORE_PRODUCT_LIST} from "./ts/event";
import {SEND_STORE_PRODUCT_LINK} from "./ts/event";

browser.runtime.onMessage.addListener((request, sender, callback) => {
  console.log('================进入background.js=====================');
  const event: string = request.event;
  const data: any = request.data;
  console.log(`当前事件: ${event}, 接收到的数据：${JSON.stringify(data)}`);
  setTimeout(function () {
      switch (event) {
          case SEND_STORE_PRODUCT_LIST:
              requestPost('http://172.16.12.255:81/temu/handlerStoreProductList', data)
                  .then(response => {
                      console.log('原数据:' + response);
                      console.log('Json格式数据:' + JSON.stringify(response));
                      // 在这里处理成功响应
                      callback(response);
                  })
                  .catch(error => {
                      console.error(error); // 处理请求失败
                  });
              break;
          case SEND_STORE_PRODUCT_LINK:
              requestGet("http://172.16.12.255:81/temu/getProductLinkByEnvNum", data)
                  .then(response => {
                      console.log('原数据:' + response);
                      console.log('Json格式数据:' + JSON.stringify(response));
                      // 在这里处理成功响应
                      callback(response);
                  })
                  .catch(error => {
                      console.error(error); // 处理请求失败
                  });
              break;
          default:
              break;
      }
  }, 3000);
  // 这里是关键，Http是异步操作,需要return true使sendResponse保持活动状态
  return true;
});

function requestPost(url, params) {
  return new Promise((resolve, reject) => {
      var httpRequest = new XMLHttpRequest();
      httpRequest.open('POST', url, true);
      httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState === 4) {
              if (httpRequest.status === 200) {
                  try {
                      var jsonResponse = JSON.parse(httpRequest.responseText);
                      resolve(jsonResponse); // 解析成功时，将解析后的数据传递给 Promise 的 resolve
                  } catch (error) {
                      reject("解析JSON时出错: " + error); // 解析失败时，将错误信息传递给 Promise 的 reject
                  }
              } else {
                  reject("请求失败，状态码: " + httpRequest.status); // 请求失败时，将错误信息传递给 Promise 的 reject
              }
          }
      };
      httpRequest.send(JSON.stringify(params));
  });
}

/**
* 发送get请求
* @param url
* @param params 是json格式
*/
function requestGet(url, params) {
  return new Promise((resolve, reject) => {
      var httpRequest = new XMLHttpRequest();
      httpRequest.open("GET", url + '?' + jsonToFormData(params), true);
      httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      httpRequest.send();
      httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState === 4) {
              if (httpRequest.status === 200) {
                  const responseData = JSON.parse(httpRequest.responseText);
                  resolve(responseData); // 将响应数据传递给 Promise 的成功处理程序
              } else {
                  reject(new Error("请求失败")); // 将错误信息传递给 Promise 的失败处理程序
              }
          }
      };
  });
}

function jsonToFormData(json) {
  const formData = new URLSearchParams();
  for (const key in json) {
      if (json.hasOwnProperty(key)) {
          formData.append(key, json[key]);
      }
  }
  return formData.toString();
}
