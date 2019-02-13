package cn.com.github.springVue.dao;

import cn.com.github.WelcomeApp;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
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
	}
}
