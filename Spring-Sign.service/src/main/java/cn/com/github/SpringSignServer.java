package cn.com.github;

import cn.com.github.sign.SignBase;
import cn.com.github.sign.SignData;
import cn.com.github.sign.SignStampBase;

import java.util.List;

public interface SpringSignServer {

    public List<SignBase> getSignBaseInfo();

    public List<SignStampBase> getSignStampInfo();

    public List<SignData> getSignDataInfo();
}
