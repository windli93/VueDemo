package cn.com.github.impl.constants;

import com.jfx.Broker;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
@ToString
public class Mt4Constants {

    public static final Broker MT_4_SERVER = new Broker("108.160.131.102:443");
    public static final String MT_4_USER = "30305791";
    public static final String MT_4_PASSWORD = "kbgn11";
}
