package cn.com.github;

/**
 * @description:
 * @author: ragrokli
 * @create: 2019-02-13 11:21
 **/
public class WelcomeApp extends Thread{

    @Override
    public void run() {
        System.out.printf("1.welcome 我是：",Thread.currentThread().getName());
    }
}
