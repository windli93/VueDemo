import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ComponentScan("cn.com.github")
@EnableAutoConfiguration
public class Main {

    @RequestMapping("/")
    String home(){
        return "hello world";
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
