package cn.com.github.impl.config;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;

@EnableAutoConfiguration
@PropertySource({"app.properties", "log4j.properties"})
@ImportResource("/META-INF/Spring/dubbo-*.xml")
public class Config {

}
