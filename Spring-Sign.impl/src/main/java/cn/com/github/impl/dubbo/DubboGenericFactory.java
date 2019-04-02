package cn.com.github.impl.dubbo;


import cn.com.github.domain.util.SpringContextUtil;
import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ReferenceConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import com.alibaba.dubbo.config.utils.ReferenceConfigCache;
import com.alibaba.dubbo.rpc.service.GenericService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.HashMap;

/**
 * dubbo接口泛化调用
 */
@Slf4j
@Component
public class DubboGenericFactory {

    @Autowired
    private ApplicationConfig application;

    @Autowired
    @Qualifier("githubRegistry")
    private RegistryConfig registry;

    /**
     * Map类型入参获取获取类型泛化接口
     */
    public Object fetchGenericService(String interfaceName, HashMap<String, Object> maps) {

        GenericService genericService = null;
        try {
            genericService = SpringContextUtil.getBean(interfaceName, GenericService.class);
            if (genericService == null) {
                throw new RuntimeException("dubbo 泛化接口获取异常");
            }
            String methodName = "handler";
            String[] types = new String[]{"java.util.HashMasp"};
            Object[] parames = new Object[]{maps};
            Object object = genericService.$invoke(methodName, types, parames);
            if (object instanceof Throwable) {
                throw (Exception) object;
            }
            return object;
        } catch (Exception e) {
            log.error("处理dubbo泛化接口异常-{}", e);
            throw new RuntimeException(e);
        }
    }


    public Object fetchGenericService(String interfaceName, String methods, Object[] parames, Integer timeoutSec) {

        try {
            ReferenceConfig<GenericService> referenceConfig = new ReferenceConfig<>();
            referenceConfig.setInterface(interfaceName);
            referenceConfig.setGeneric(true);
            referenceConfig.setApplication(application);
            referenceConfig.setRegistry(registry);
            referenceConfig.setTimeout(timeoutSec * 1000);

            ReferenceConfigCache configCache = ReferenceConfigCache.getCache();
            GenericService genericService = null;
            //重试两次
            for (int i = 0; i < 2; i++) {
                genericService = configCache.get(referenceConfig);
                if (genericService == null) {
                    configCache.destroy(referenceConfig);
                    continue;
                }
                break;
            }
            if (genericService == null) {
                configCache.destroy(referenceConfig);
                throw new Exception("dubbo 泛化接口获取异常");
            }
            String[] types = new String[]{"java.util.String"};
            Object object = genericService.$invoke(methods, types, parames);
            if (object instanceof Throwable) {
                throw (Exception) object;
            }
            return object;
        } catch (Exception e) {
            log.error("处理dubbo泛化接口异常-{}", e);
            throw new RuntimeException(e);
        }
    }
}
