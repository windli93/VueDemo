import browser, { Tabs } from "webextension-polyfill";

export function sendTabChromeMessage(
    event: string,
    data: any,
    callback: (response: any) => any
) {
    browser.tabs
        .query({
            active: true,
            currentWindow: true,
        })
        .then((tabs: Tabs.Tab[]) => {
            if (tabs.length > 0) {
                const message = {
                    event: event,
                    data: data,
                };
                browser.tabs.sendMessage(tabs[0].id!, message).then((response) => {
                    return callback(response);
                });
            }
        });
};


export function sendMessage(message, callback) {
    browser.runtime.sendMessage(undefined, message)
        .then(response => {
            return callback(response);
        });
};



