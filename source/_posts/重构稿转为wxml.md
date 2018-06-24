title: '重构稿转为wxml'
tags:
  - '小程序'
  - 开发
  - 工程化
categories:
  - 建站❤编程
date: 2018-06-13 07:03:13
---

重构输出的重构稿一般是以 rem 为尺寸单位的html页面，而小程序使用的是rpx为尺寸单位的wxml模板，转换工作无疑将是一项高强度的重复性劳动，于是找到O2team的html-to-wxapp工具，不过好像有一年多没维护，把使用中遇到的问题修复了一下发到npm

## 使用方法

### 开始
```sh
//安装
npm install h2a -g
```

### 使用

例如：源码`test`目录文件结构如下
```
├──test
│   ├── images
│   ├── index.html
│   └── index.css
```

### 执行：
```sh
wxapp transfer test
```

将会转换成：
```
├──_wxapp_test
│   ├── images
│   ├── index.wxml
│   └── index.wxss

```

## 说明

1. 转换工具对 html 标签进行替换并删除了 script 等标签及内容，将 css 里的 rem 单位替换成 rpx，并进行数值转换
2. stylelint 规则限制了动画和过渡的使用、限制了 img 之外的类型选择器、禁止了两层以上的级联
3. 小程序的样式有许多限制，还需要手动调试
4. 如果转换出来的样式尺寸不对，可以调整 config.js 里的 remTimes 参数。
