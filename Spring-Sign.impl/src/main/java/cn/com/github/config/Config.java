package cn.com.github.config;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ImportResource;

@EnableAutoConfiguration
@ImportResource("/META-INF/dubbo/dubbo-*.xml")
public class Config {

}
