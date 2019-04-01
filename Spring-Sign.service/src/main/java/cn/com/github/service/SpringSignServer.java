package cn.com.github.service;

import cn.com.github.domain.sign.SignBase;
import cn.com.github.domain.sign.SignData;
import cn.com.github.domain.sign.SignStampBase;

import java.util.List;

public interface SpringSignServer {

    public List<SignBase> getSignBaseInfo();

    public List<SignStampBase> getSignStampInfo();

    public List<SignData> getSignDataInfo();
}
