package cn.com.github;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Time;

@Getter
@Setter
@ToString
public class BaseEntity {

    private String id;

    private String creater;

    private Time createTime;

    private String modifyer;

    private Time modifyTime;
}
