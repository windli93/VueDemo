package cn.com.github.domain.sign;


import cn.com.github.domain.base.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 签章数据
 */

@Getter
@Setter
@ToString
public class SignData extends BaseEntity {

    /**
     * 合同链接
     */
    private String url;

    /**
     * 资金方合同链接
     */
    private String capitalUrl;

    /**
     * 合同链接备份A
     */
    private String BackUpUrlA;

    /**
     * 合同链接备份B
     */
    private String BackUpUrlB;

    /**
     * 合同签署状态码
     */
    private String code;

    /**
     * 说明信息
     */
    private String msg;

    /**
     * 配置表主键
     */
    private Integer baseId;

    /**
     * 用户ID
     */
    private Integer userId;

    /**
     * 订单ID
     */
    private Integer orderId;


}
