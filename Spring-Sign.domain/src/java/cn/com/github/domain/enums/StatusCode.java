package cn.com.github.domain.enums;


import lombok.Getter;

@Getter
public enum StatusCode {

    RESULT_SUCC("1", "成功"),
    RESULT_FAIL("2", "失败"),
    RESULT_DOING("3", "处理中"),
    RESULT_UNKNOW("0", "未知");

    private String code;
    private String msg;

    StatusCode(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
