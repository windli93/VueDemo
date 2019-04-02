package cn.com.github.domain.bean;

import cn.com.github.domain.enums.StatusCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @ClassName Resualt
 * @AUTHOR ragrokli
 * @DATE 2019/4/2 11:45
 **/
@Getter
@Setter
@ToString
public class Resualt<T> {

    private String msg;

    private T data;

    private StatusCode code = StatusCode.RESULT_SUCC;

}
