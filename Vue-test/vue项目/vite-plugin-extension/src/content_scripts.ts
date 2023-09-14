import browser from "webextension-polyfill";
import $ from 'jquery';

import {SEND_STORE_PRODUCT_LIST} from "./ts/event";
import {SEND_STORE_PRODUCT_LINK} from "./ts/event";
import {EVENT_START_EXPORT_STORE_DATA} from "./ts/event";
import {EVENT_START_EXPORT_TOP_DATA} from "./ts/event";
import {EVENT_START_EXPORT_SEARCH_DATA} from "./ts/event";
import {EVENT_START_GET_DETAIL_DATA} from "./ts/event";

function scrolTo(targetElement) {
    targetElement.scrollIntoView({
        behavior: 'smooth'
    });
}

function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function escapeCommas(text) {
    if (text.includes(',')) {
        text = text.replace(/,/g, "&");
    }
    return text.replace(/\n/g, "");
}


function sendMessage(message, callback) {
    browser.runtime.sendMessage(undefined, message)
    .then(response => {
        return callback(response);
    });
}

//获取到初始化数据
function getRawData() {
    const regex = /window\.rawData=(\{[\s\S]*?\});/;
    const scriptElements = document.getElementsByTagName('script');
    var matchValue = "";

    for (var i = 0; i < scriptElements.length; i++) {
        const script = scriptElements[i];
        const content = script.innerHTML;
        const matches = content.match(regex);
        if (matches && matches.length > 1) {
            matchValue = matches[1];
            // log.info("匹配到的字符串：" + matchValue);
            break;
        }
    }
    if (matchValue.trim() === "") {
        console.log("未匹配到页面列表信息，无法继续执行");
    }
    return matchValue;
}

//解析店铺商品列表数据
function getStoreProductListHtml() {
    console.log('开始进入解析元素界面');
    //csv文件的标题
    const data = [
        ['店铺ID', '店铺名称', '商品ID', '商品名称', '商品链接', '商品主图', '销量', '优惠价', '售价', '折扣比', '活动', '活动倒计时', '爬数时间']
    ];
    // 使用XPath查找元素
    const elements = $("#main_scale").find(".baseContent .mainContent ._3wENoqiV ._2hynzFts.autoFitList");
    const storeName = $("#main_scale").find("div.baseContent  div  div:nth-child(1)  div  div  div._2Z26lw-j  div.u4Pkx8Oe  div._1foBWaOX._23OIQOwY  h1");
    console.log(`获取到的元素个数 ${elements.length}`);
    // 获取到初始化商品数据
    const rawData = getRawData();
    // 处理XPath结果
    for (var i = 0; i < elements.length; i++) {
        const element = $(elements[i]);
        const attributeValue = element.attr('role');
        console.log('第' + i + '个元素的属性值' + attributeValue);
        // 获取子元素
        const childElements = element.find('._3GizL2ou');
        console.log('第' + i + '次获取到的子元素个数 ' + childElements.length);
        // 获取子元素里面的内容
        for (var i1 = 0; i1 < childElements.length; i1++) {
            const data1 = [];
            /**************************从rawData中获取的数据 先放到一边****************************************/
                // 店铺ID
            var mallId = "";
            if (rawData.length > 0) {
                const rawJson = JSON.parse(rawData);
                if (rawJson.store) {
                    mallId = rawJson.store.mallId;
                }
            }
            data1.push(mallId);
            /**************************从元素中获取的数据****************************************/
            const childElement = $(childElements[i1]);
            const childElement1 = childElement.find('div');
            // 店铺名称
            data1.push(storeName.text());
            // 获取商品ID
            const childElement2 = childElement1.find('div').first();
            data1.push(childElement2.attr('data-tooltip').replace("goodContainer-", ""));
            // 获取商品名称
            const productName = childElement2.attr('data-tooltip-title');
            data1.push(escapeCommas(productName));
            // 获取商品链接
            const childElement3 = childElement1.find('div div._1yvVB0OJ._29c3rGvP.goods-image-container-external._35dSA6lL div._3qqjHygn div a');
            data1.push(childElement3.attr('href'));
            // 获取商品主图
            const imageElement = childElement3.find('img');
            const imageSrc = imageElement !== null && imageElement.attr('src') ? imageElement.attr('src') : '';
            data1.push(imageSrc);
            // 销量
            const childElement4 = childElement1.find('div div._11RWORpU._29c3rGvP div._1tRVSCES._329oMDoB div._1AjvokEG div._1rVcnjtV div._3shjWZB- span');
            const innerText4 = childElement4.text();
            data1.push(innerText4);
            // 优惠价
            const childElement5 = childElement1.find('div div._11RWORpU._29c3rGvP div._1tRVSCES._329oMDoB div._2L24asES.jOGdDBUW._3BkZgKqg');
            const innerText5 = childElement5 !== null && childElement5.attr('aria-label') ? childElement5.attr('aria-label') : '';
            data1.push(innerText5);
            // 售价
            const childElement6 = childElement1.find('div div._11RWORpU._29c3rGvP div._1tRVSCES._329oMDoB div._1AjvokEG div._1rVcnjtV div._1iQkQ22o span');
            const innerText6 = childElement6.text();
            data1.push(innerText6);
            // 折扣比
            const childElement7 = childElement1.find('div div._11RWORpU._29c3rGvP div._1tRVSCES._329oMDoB div._1AjvokEG div._26TEaBMW span');
            const innerText7 = childElement7.text();
            data1.push(innerText7);
            // 活动
            const childElement8 = childElement1.find('div div._1yvVB0OJ._29c3rGvP.goods-image-container-external._35dSA6lL div._3qqjHygn div div div._3dDU1NuN img');
            const innerText8 = childElement8 !== null && childElement8.attr('src') ? childElement8.attr('src') : '';
            data1.push(innerText8);
            // console.log('活动:' + innerText8);
            //活动倒计时
            const childElement9 = childElement1.find('div div._1yvVB0OJ._29c3rGvP.goods-image-container-external._35dSA6lL div._3qqjHygn  div  div  div._3dDU1NuN   div  div  div');
            const innerText9 = childElement9 !== null && childElement8.attr('src') && childElement9.attr('aria-label') ? 'Ends in ' + childElement9.attr('aria-label') : '';
            data1.push(innerText9);
            // console.log('活动倒计时:' + innerText9);
            //爬数时间
            const currentDate = new Date();
            const formattedDateTime = formatDateTime(currentDate);
            data1.push(formattedDateTime);
            // console.log('爬数时间:' + formattedDateTime);
            //一列数据
            data.push(data1);
        }
    }
    //将列表数据发送到background script
    const message = {
        event: SEND_STORE_PRODUCT_LIST,
        data: data
    }
    sendMessage(message, function (response) {
        // 在这里处理响应数据
        console.log("Received response:", response);
    });
    // 生成并导出 CSV 文件
    const timestamp = new Date().getTime();
    const csvData = generateCSV(data);
    exportCSV(csvData, 'store_data_' + timestamp);
}


//解析店铺商品列表数据
function getTopProductListHtml() {
    console.log('开始进入解析元素界面');
    //csv文件的标题
    const data = [
        ['商品ID', '商品名称', '商品链接', '商品主图', '销量', '优惠价', '售价', '折扣比', '活动', '活动倒计时', '爬数时间']
    ];
    // 使用XPath查找元素
    const elements = $("#main_scale .baseContent .mainContent .containerWithFilters div.contentContainer div:nth-child(2) div._2hynzFts.autoFitList");
    console.log(`获取到的元素个数 ${elements.length}`);
    for (var i = 0; i < elements.length; i++) {
        const element = $(elements[i]);
        const attributeValue = element.attr('role');
        console.log('第' + i + '个元素的属性值' + attributeValue);
        // 获取子元素
        const childElements = element.find('._3GizL2ou');
        console.log('第' + i + '次获取到的子元素个数 ' + childElements.length);
        // 获取子元素里面的内容
        for (var i1 = 0; i1 < childElements.length; i1++) {
            const data1 = [];
            /**************************从元素中获取的数据****************************************/
            const childElement = $(childElements[i1]);
            const childElement1 = childElement.find('div');
            // 获取商品ID
            const childElement2 = childElement1.find('div').first();
            data1.push(childElement2.attr('data-tooltip').replace("goodContainer-", ""));
            // 获取商品名称
            const productName = childElement2.attr('data-tooltip-title');
            data1.push(escapeCommas(productName));
            // 获取商品链接
            const childElement3 = childElement1.find('div div._1yvVB0OJ._29c3rGvP.goods-image-container-external._35dSA6lL div._3qqjHygn div a');
            data1.push(childElement3.attr('href'));
            // 获取商品主图
            const imageElement = childElement3.find('img');
            const imageSrc = imageElement !== null && imageElement.attr('src') ? imageElement.attr('src') : '';
            data1.push(imageSrc);
            // 销量
            const childElement4 = childElement1.find('div div._11RWORpU._29c3rGvP div._1tRVSCES._329oMDoB div._1AjvokEG div._1rVcnjtV  div._3U-vne6p span');
            const innerText4 = childElement4.text();
            data1.push(innerText4);
            // 优惠价
            const childElement5 = childElement1.find('div div._11RWORpU._29c3rGvP div._1tRVSCES._329oMDoB div._2L24asES.jOGdDBUW._3BkZgKqg');
            const innerText5 = childElement5 !== null && childElement5.attr('aria-label') ? childElement5.attr('aria-label') : '';
            data1.push(innerText5);
            // 售价
            const childElement6 = childElement1.find('div div._11RWORpU._29c3rGvP  div._1tRVSCES._329oMDoB  div._1AjvokEG  div._1rVcnjtV  div._3egKfhtd span');
            const innerText6 = childElement6.text();
            data1.push(innerText6);
            // 折扣比
            const childElement7 = childElement1.find('div div._11RWORpU._29c3rGvP div._1tRVSCES._329oMDoB div._1AjvokEG div._26TEaBMW span');
            const innerText7 = childElement7.text();
            data1.push(innerText7);
            // 活动
            const childElement8 = childElement1.find('div div._1yvVB0OJ._29c3rGvP.goods-image-container-external._35dSA6lL div._3qqjHygn div div div._3dDU1NuN img');
            const innerText8 = childElement8 !== null && childElement8.attr('src') ? childElement8.attr('src') : '';
            data1.push(innerText8);
            // console.log('活动:' + innerText8);
            //活动倒计时
            const childElement9 = childElement1.find('div div._1yvVB0OJ._29c3rGvP.goods-image-container-external._35dSA6lL div._3qqjHygn  div  div  div._3dDU1NuN   div  div  div');
            const innerText9 = childElement9 !== null && childElement8.attr('src') && childElement9.attr('aria-label') ? 'Ends in ' + childElement9.attr('aria-label') : '';
            data1.push(innerText9);
            // console.log('活动倒计时:' + innerText9);
            //爬数时间
            const currentDate = new Date();
            const formattedDateTime = formatDateTime(currentDate);
            data1.push(formattedDateTime);
            // console.log('爬数时间:' + formattedDateTime);
            //一列数据
            data.push(data1);
        }
    }
    // 生成并导出 CSV 文件
    const timestamp = new Date().getTime();
    const csvData = generateCSV(data);
    exportCSV(csvData, 'top_data_' + timestamp);
}

//解析店铺商品列表数据
function getSearchProductListHtml() {
    console.log('开始进入解析元素界面');
    //csv文件的标题
    const data = [
        ['商品ID', '商品名称', '商品链接', '商品主图', '销量', '优惠价', '售价', '折扣比', '活动', '活动倒计时', '爬数时间']
    ];
    // 使用XPath查找元素
    const elements = $("#main_scale  div.baseContent  div.mainContent.containerWithFilters  div.contentContainer  div:nth-child(2)  div._2hynzFts.autoFitList");
    console.log(`获取到的元素个数 ${elements.length}`);
    for (var i = 0; i < elements.length; i++) {
        const element = $(elements[i]);
        const attributeValue = element.attr('role');
        console.log('第' + i + '个元素的属性值' + attributeValue);
        // 获取子元素
        const childElements = element.find('._3GizL2ou');
        console.log('第' + i + '次获取到的子元素个数 ' + childElements.length);
        // 获取子元素里面的内容
        for (var i1 = 0; i1 < childElements.length; i1++) {
            const data1 = [];
            /**************************从元素中获取的数据****************************************/
            const childElement = $(childElements[i1]);
            const childElement1 = childElement.find('div');
            // 获取商品ID
            const childElement2 = childElement1.find('div').first();
            data1.push(childElement2.attr('data-tooltip').replace("goodContainer-", ""));
            // 获取商品名称
            const productName = childElement2.attr('data-tooltip-title');
            data1.push(escapeCommas(productName));
            // 获取商品链接
            const childElement3 = childElement1.find('div div._1yvVB0OJ._29c3rGvP.goods-image-container-external._35dSA6lL div._3qqjHygn div a');
            data1.push(childElement3.attr('href'));
            // 获取商品主图
            const imageElement = childElement3.find('img');
            const imageSrc = imageElement !== null && imageElement.attr('src') ? imageElement.attr('src') : '';
            data1.push(imageSrc);
            // 销量
            const childElement4 = childElement1.find('div div._11RWORpU._29c3rGvP div._1tRVSCES._329oMDoB div._1AjvokEG div._1rVcnjtV  div._3U-vne6p span');
            const innerText4 = childElement4.text();
            data1.push(innerText4);
            // 优惠价
            const childElement5 = childElement1.find('div div._11RWORpU._29c3rGvP div._1tRVSCES._329oMDoB div._2L24asES.jOGdDBUW._3BkZgKqg');
            const innerText5 = childElement5 !== null && childElement5.attr('aria-label') ? childElement5.attr('aria-label') : '';
            data1.push(innerText5);
            // 售价
            const childElement6 = childElement1.find('div div._11RWORpU._29c3rGvP  div._1tRVSCES._329oMDoB  div._1AjvokEG  div._1rVcnjtV  div._3egKfhtd span');
            const innerText6 = childElement6.text();
            data1.push(innerText6);
            // 折扣比
            const childElement7 = childElement1.find('div div._11RWORpU._29c3rGvP div._1tRVSCES._329oMDoB div._1AjvokEG div._26TEaBMW span');
            const innerText7 = childElement7.text();
            data1.push(innerText7);
            // 活动
            const childElement8 = childElement1.find('div div._1yvVB0OJ._29c3rGvP.goods-image-container-external._35dSA6lL div._3qqjHygn div div div._3dDU1NuN img');
            const innerText8 = childElement8 !== null && childElement8.attr('src') ? childElement8.attr('src') : '';
            data1.push(innerText8);
            // console.log('活动:' + innerText8);
            //活动倒计时
            const childElement9 = childElement1.find('div div._1yvVB0OJ._29c3rGvP.goods-image-container-external._35dSA6lL div._3qqjHygn  div  div  div._3dDU1NuN   div  div  div');
            const innerText9 = childElement9 !== null && childElement8.attr('src') && childElement9.attr('aria-label') ? 'Ends in ' + childElement9.attr('aria-label') : '';
            data1.push(innerText9);
            // console.log('活动倒计时:' + innerText9);
            //爬数时间
            const currentDate = new Date();
            const formattedDateTime = formatDateTime(currentDate);
            data1.push(formattedDateTime);
            // console.log('爬数时间:' + formattedDateTime);
            //一列数据
            data.push(data1);
        }
    }
    // 生成并导出 CSV 文件
    const timestamp = new Date().getTime();
    const csvData = generateCSV(data);
    exportCSV(csvData, 'search_data_' + timestamp);
}

// 导出 CSV 文件
function exportCSV(csvData, name) {
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", csvData);
    downloadLink.setAttribute("download", name + ".csv");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// 生成 CSV 格式数据
function generateCSV(data) {
    let csvContent = "data:text/csv;charset=utf-8,";

    // 添加数据行
    data.forEach(row => {
        const csvRow = row.map(value => `"${value}"`).join(",");
        csvContent += csvRow + "\n";
    });

    return encodeURI(csvContent);
}

function exportStoreData() {
    console.log("批量导出店铺数据开始执行................")
    let count = 0; // 计数器
    const id = setInterval(() => {
        const viewMore = $('div[aria-label="View more"] > div');
        const noMoreItemsP = $('div[role="region"]').find('p');
        const noMore = noMoreItemsP.text() === 'No more items';
        count++;
        if (noMore || count >= 3) {
            getStoreProductListHtml()
            clearInterval(id)
            console.log("批量导出店铺数据结束................")
            return
        }
        console.log('批量导出店铺数据准备翻页');
        scrolTo(viewMore[0])
        viewMore[0].click()
    }, 3000)
}

function exportTopSaleData() {
    console.log("批量导出Top榜数据开始执行................")
    let count = 0; // 计数器
    const id = setInterval(() => {
        const seeMore = $('#main_scale .baseContent .mainContent .containerWithFilters .contentContainer div:nth-child(2)  div:nth-child(2) div.jJnWizBx div._2U9ov4XG span');
        const noMoreItemsP = $('#main_scale .baseContent .mainContent .containerWithFilters .contentContainer div:nth-child(2) div.contentContainer  div._2hynzFts.autoFitList p');
        const noMore = noMoreItemsP.text() === 'No more items';
        count++;
        if (noMore || count >= 5) {
            getTopProductListHtml();
            clearInterval(id);
            console.log("批量导出Top榜数据结束................");
            return;
        }
        console.log('批量导出Top榜数据准备翻页');
        scrolTo(seeMore[0]);
        seeMore[0].click();
    }, 5000)
}


function exportSearchData() {
    console.log("批量导出自定义列表数据开始执行................")
    let count = 0; // 计数器
    const id = setInterval(() => {
        const seeMore = $('#main_scale div.baseContent div.mainContent.containerWithFilters div.contentContainer div:nth-child(2) div:nth-child(2) div.jJnWizBx div._2U9ov4XG span');
        const noMoreItemsP = $('#main_scale div.baseContent div.mainContent.containerWithFilters div.contentContainer div:nth-child(2) div._2hynzFts.autoFitList p');
        const noMore = noMoreItemsP.text() === 'No more items';
        count++;
        if (noMore || count >= 5) {
            getSearchProductListHtml()
            clearInterval(id)
            console.log("批量导出自定义列表数据结束................")
            return
        }
        console.log('批量导出自定义列表准备翻页');
        scrolTo(seeMore[0])
        seeMore[0].click()
    }, 5000)
}

function getProductDetailData() {
    //将数据发送到background script
    const message = {
        event: SEND_STORE_PRODUCT_LINK,
        data: {envNum: 0}
    }
    sendMessage(message, function (response) {
        // 在这里处理响应数据
        console.log('获取到的 response data :' + JSON.stringify(response));
        const data = response.data;
        // 开始处理页面
        openAndProcessPages(data, 0);
    });
}


function openAndProcessPages(data, currentIndex) {
    if (currentIndex < data.length) {
        var product = data[currentIndex];
        const productId = product.productId;
        const productLink = product.productLink;
        console.log("productId: " + productId + ", productLink: " + productLink);

        // 构造新链接并打开
        const url = "https://www.temu.com" + productLink;
        const newWindow = window.open(url, '_blank');

        // 在新页面加载完成后执行解析代码
        newWindow.onload = function () {
            // 在这里可以开始解析新页面的元素
            var pageTitle = newWindow.document.title;
            console.log("Title of the new page:", pageTitle);
            // 在新页面中执行解析代码
            const rawData = getRawData(newWindow.document);
            console.log(rawData);
            // 关闭当前页面
            newWindow.close();
            // 设置延迟继续处理下一个页面
            setTimeout(function () {
                openAndProcessPages(data, currentIndex + 1);
            }, getRandomInt(2, 5) * 1000);
        };
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.event) {
        case EVENT_START_EXPORT_STORE_DATA:
            exportStoreData()
            sendResponse('批量导出店铺数据成功')
            break;
        case EVENT_START_EXPORT_TOP_DATA:
            exportTopSaleData()
            sendResponse('批量导出TOP榜数据成功')
            break;
        case EVENT_START_EXPORT_SEARCH_DATA:
            exportSearchData()
            sendResponse('批量导出自定义搜索数据成功')
            break;
        case EVENT_START_GET_DETAIL_DATA:
            getProductDetailData();
            sendResponse('批量获取商品详情数据成功');
            break;
    }
});