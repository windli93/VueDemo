package cn.com.github.impl.mt4;

import cn.com.github.impl.constants.Mt4Constants;
import com.jfx.net.JFXServer;
import com.jfx.strategy.Strategy;

import java.io.IOException;

public class MT4ConnectionExample extends Strategy {
    static {
        System.setProperty("jfx_server_port", "7779");
    }

    public void connect() throws IOException {
        connect("127.0.0.1", 7788, Mt4Constants.MT_4_SERVER, Mt4Constants.MT_4_USER, Mt4Constants.MT_4_PASSWORD);
    }

    public void coordinate() {
        // method has been ignored
    }

    public static void main(String[] args) throws IOException {
        MT4ConnectionExample mt4c = new MT4ConnectionExample();
        System.out.println("======= Connecting ========= " + JFXServer.getInstance().getBindPort());
        mt4c.connect();
        System.out.println("======= Connected ========= ");
        System.out.println("Account info: balance=" + mt4c.accountBalance() + ", equity=" + mt4c.accountEquity());
        System.out.println("Account info: symbols=" + mt4c.getSymbols());
        System.out.println("======= Disconnecting ========= ");
        mt4c.close(true);
        System.out.println("======= Disconnected ========= ");
        JFXServer.stop();
    }
}
