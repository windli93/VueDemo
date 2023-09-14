<template>
  <div>
    <div style="text-align: center; margin-top: 20px; margin-bottom: 30px">
      <H4>请区分当前链接对应的数据，再去选择导出功能</H4>
      <ul>
        <li>
          <button @click="storeDataExport">批量导出店铺数据</button>
        </li>
        <li>
          <button @click="topDataExport">批量导出TOP榜数据</button>
        </li>
        <li>
          <br />
          <button @click="searchDataExport">自定义导出搜索数据</button>
        </li>
        <li>
          <button @click="detailDataGet">批量详情数据获取</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import browser, { Tabs } from "webextension-polyfill";
import {
  EVENT_START_EXPORT_STORE_DATA,
  EVENT_START_EXPORT_TOP_DATA,
  EVENT_START_EXPORT_SEARCH_DATA,
  EVENT_START_GET_DETAIL_DATA,
} from "../ts/event";
import {sendTabChromeMessage} from "../ts/chrome_common";

export default defineComponent({
  setup() {
    const message = "Hello, TypeScript!";

 

    function storeDataExport() {
      console.log("====storeDataExport=========");
      sendTabChromeMessage(EVENT_START_EXPORT_STORE_DATA, {}, (response) => {});
    }

    function topDataExport() {
      console.log("====topDataExport=========");
      sendTabChromeMessage(EVENT_START_EXPORT_TOP_DATA, {}, (response) => {});
    }

    function searchDataExport() {
      console.log("====searchDataExport=========");
      sendTabChromeMessage(EVENT_START_EXPORT_SEARCH_DATA, {}, (response) => {});
    }

    function detailDataGet() {
      console.log("====detailDataGet=========");
      sendTabChromeMessage(EVENT_START_GET_DETAIL_DATA, {}, (response) => {});
    }

    return {
      message,
      storeDataExport,
      topDataExport,
      searchDataExport,
      detailDataGet,
    };
  },
});
</script>

<style>
html,
body {
  width: 300px;
  height: 400px;
  padding: 0;
  margin: 0;
}

body {
  background-color: rgb(36, 36, 36);
}

body > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

img {
  width: 200px;
  height: 200px;
}

h1 {
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin: 0;
}

p {
  color: white;
  opacity: 0.7;
  margin: 0;
}

code {
  font-size: 12px;
  padding: 2px 4px;
  background-color: #ffffff24;
  border-radius: 2px;
}
</style>
../ts/event