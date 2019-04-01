package cn.com.github.web.dubbo;


import cn.com.github.domain.util.SpringContextUtil;
import com.alibaba.dubbo.common.json.JSONObject;
import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.rpc.service.GenericService;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * dubbo接口泛化调用
 */
@Slf4j
public class DubboGenericFactory {

    private static ApplicationConfig app = new ApplicationConfig("dubbo-generic");

    private static Map<String, GenericService> serviceMap = new ConcurrentHashMap<>();

    /**
     * 获取泛化接口
     */
    public static JSONObject fetchGenericService(String serviceName, HashMap<String, Object> maps) {

        GenericService genericService = null;
        try {
            genericService = SpringContextUtil.getBean(serviceName, GenericService.class);
        } catch (Exception e) {

        }
        if (genericService == null){

        }
        String[] types = new String[]{"java.util.HashMasp"};
        Object[] methods = new Object[]{maps};
        JSONObject object = (JSONObject) genericService.$invoke(serviceName, types, methods);
        return object;
    }
}
