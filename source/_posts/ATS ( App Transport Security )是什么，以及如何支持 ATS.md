title: ATS ( App Transport Security )是什么，以及如何支持 ATS
categories:
  - 科普小知识
date: 2016-12-13 20:21:12
---

今天明秋童鞋在需求文档中看到接入任意门需要满足 ATS 标准，我们就来了解了下什么是 ATS ；该标准对 web 开发的影响，及应对措施。

## 什么是 ATS

App Transport Security，简称 ATS，是苹果为了提高 App 与服务器之间数据安全，而在 iOS 9 当中首次推出的一项安全特性。在苹果全球开发者大会（WWDC）的一场演示中，该公司公布了一个最后期限——2017 年 1 月 1 日——即 App Store 当中的所有应用必须在这个日期之前启用这一重要安全功能。

<!-- more -->

![昨晚收到的新浪微博开放平台“催命邮件”](http://ww2.sinaimg.cn/large/4d6e3e3bgw1faowh7bp4bj20s40f8dmb.jpg)

距离最后期限越来越近，于是开发者们又将收到一波升级需求,不升级的后果图片里面说得比较清楚了。对应工作中的场景，就是版本因达不到接入标准而延期，这时候就不是走个特批就能解决的问题了，因为后面还有一道 App Store 上架的外部审核，要是卡在这里后果就是 App 无法如期上架，全员落水，运营和 iOS 开发哥哥提前表示 “这锅咱不背不背不背啊😭…”

所以今后如果不幸因 ATS 被“不达标”了，表觉得是 someone 有意怼你，应该明白这背后是一家伟大公司为了保护用户数据安全而做的充满情怀和正义感的事情，嗯 (认真脸)。

## ATS 的硬性指标：

1. 强制使用 https
2. 证书域名和链接地址域名匹配
3. 根证书受苹果信任
4. 证书在有效期内
5. 必须支持 TLS1.2
6. 至少 RSA 2048位或者是 ECC 256位密钥加密
7. SHA256 算法证书
8. 加密套件要求，必须使用 AES-128 或者 AES-256 支持，并且支持完整前向加密：

RSA 算法要求使用以下加密套件：
  > TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
  > TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
  > TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384
  > TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
  > TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA

DSA 算法要求使用以下加密套件：
  > TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
  > TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
  > TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
  > TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA
  > TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
  > TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA

总结下就是：**必须使用 https 协议；证书有效且强度足够**。

## 如何支持 ATS 标准

1. 强度足够的证书好解决，购买苹果信任CA所颁发的证书即可，一般知名的商业证书颁发机构如 GoDaddy 、 VeriSign …

2. 然后就是部署 https 的 web 服务，这里以常见的 Nginx、Apache 以及 Tomcat 为参考：

* 2.1 Apache：（Apache，Nginx 要求关联的 openssl 版本在 1.0.1+ ，这样网站才支持 TLS1.2）

  ```ApacheConf
  SSLProtocol  all -SSLv2 -SSLv3
  SSLCipherSuite ECDH:AESGCM:HIGH:!RC4:!DH:!MD5:!aNULL:!eNULL;
  ```

* 2.2 Nginx

  ```Nginx
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
  ssl_ciphers ECDH:AESGCM:HIGH:!RC4:!DH:!MD5:!aNULL:!eNULL;
  ```

* 2.3 Tomcat 要求环境 tomcat7+ 和 JDK1.7+ ，配置参考如下：
  ```xml
  <Connector port="443" protocol="org.apache.coyote.http11.Http11Protocol"
                maxThreads="150" SSLEnabled="true" scheme="https" secure="true"
      keystoreFile="keystore/domain.jks"  keystorePass="证书密码"
                clientAuth="false" sslProtocol="TLS"
                ciphers="TLS_RSA_WITH_AES_128_GCM_SHA256,
                          TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
                          TLS_RSA_WITH_AES_128_CBC_SHA,
                          TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA,
                          TLS_RSA_WITH_AES_128_CBC_SHA256,
                          TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,
                          SSL_RSA_WITH_3DES_EDE_CBC_SHA,
                          TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA" />

  ```

看到这里，你是不是该撸起袖子做些什么，或把本文转给需要它的运维童鞋们 ヽ(；▽；)ノ＼(^-^ ) 。

### 参考：

[苹果ATS检测](https://www.qcloud.com/product/ssl#userDefined10)
[iOS 9 中可用的受信任根证书列表](https://support.apple.com/zh-cn/HT205205)
