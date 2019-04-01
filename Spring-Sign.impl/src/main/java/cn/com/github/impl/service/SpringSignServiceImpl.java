package cn.com.github.impl.service;

import cn.com.github.service.SpringSignServer;
import cn.com.github.domain.sign.SignBase;
import cn.com.github.domain.sign.SignData;
import cn.com.github.domain.sign.SignStampBase;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpringSignServiceImpl implements SpringSignServer {

    @Override
    public List<SignBase> getSignBaseInfo() {
        return null;
    }

    @Override
    public List<SignStampBase> getSignStampInfo() {
        return null;
    }

    @Override
    public List<SignData> getSignDataInfo() {
        return null;
    }
}
