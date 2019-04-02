package cn.com.github.impl.manager;

import cn.com.github.impl.dubbo.DubboGenericFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * @ClassName RouterControllerManager
 * @AUTHOR ragrokli
 * @DATE 2019/4/2 12:00
 **/
@Controller
@Slf4j
public class RouterControllerManager {

    @Autowired
    private DubboGenericFactory factory;

    /**
     * 网关调用
     *
     * @param invokeData 调用数据
     */
    public Object handle(String service, Object[] params) {
        CgiConfig serviceConfig = serviceConfigManager.getByAlias(service);
        if (serviceConfig == null) {
            throw new RuntimeException("未找到服务:{0}");
        }
        String serviceName = serviceConfig.getService();
        int idx = serviceName.lastIndexOf(".");
        if (idx == -1) {
            throw new RuntimeException("获取路由接口异常");
        }
        //请求接口
        String interfaceClass = serviceName.substring(0, idx);
        String methodName = serviceName.substring(idx + 1);
        Object result;
        try {
            result = factory.fetchGenericService(interfaceClass, methodName, params, serviceConfig.getTimeout());
        } catch (Exception e) {

            log.error("接口调用异常：{}", e.getMessage());
            throw e;
        }
        return result;
    }

}
