package cn.com.github;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Time;

@Getter
@Setter
@ToString
public class BaseEntity {

    /**
     * 主键
     */
    private Integer id;

    /**
     * 创建者
     */
    private String creater;

    /**
     * 创建时间
     */
    private Time createTime;

    /**
     * 修改者
     */
    private String modifyer;

    /**
     * 修改时间
     */
    private Time modifyTime;
}
