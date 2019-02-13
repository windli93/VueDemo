package cn.com.github.springVue.dao;

import cn.com.github.WelcomeApp;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@Slf4j
public class DemoApplicationTests {

	@Test
	public void contextLoads() {
	}


	@Test
	public void test1(){
		ReferenceCountingGc.testGc();
	}

	@Test
	public void test2(){
		Thread welcome = new WelcomeApp();

		welcome.start();

		log.info("我的线程已经启动！！！！！！！！！！");
	}
}
