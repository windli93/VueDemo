package cn.com.github;

import lombok.extern.slf4j.Slf4j;

/**
 * @description:
 * @author: ragrokli
 * @create: 2019-02-13 11:21
 **/
@Slf4j
public class WelcomeApp extends Thread {

    @Override
    public void run() {
        log.info("1.welcome 我是：{}", Thread.currentThread().getName());
    }
}
