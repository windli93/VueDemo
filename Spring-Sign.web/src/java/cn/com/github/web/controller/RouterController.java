package cn.com.github.web.controller;


import cn.com.github.domain.bean.Resualt;
import cn.com.github.domain.enums.StatusCode;
import cn.com.github.impl.manager.RouterControllerManager;
import com.alibaba.fastjson.JSONArray;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 路由服务
 */
@RestController
@Slf4j
public class RouterController {

    @Autowired
    private RouterControllerManager controllerManager;

    @RequestMapping("/router/{alias}")
    public Resualt<?> invoke(HttpServletRequest request, @PathVariable("alias") String alias, @RequestBody Object param) {
        Object[] params;
        if (param instanceof JSONArray) {
            params = ((JSONArray) param).toArray();
        } else {
            params = new Object[]{param};
        }
        Object data = controllerManager.handle(alias, params);
        Resualt<Object> resualt = new Resualt<>();
        if (data == null) {
            resualt.setCode(StatusCode.RESULT_FAIL);
            resualt.setMsg("接口获取数据为空，请求失败！");
            return resualt;
        }
        resualt.setMsg("接口请求成功！");
        resualt.setData(data);
        return resualt;
    }
}
