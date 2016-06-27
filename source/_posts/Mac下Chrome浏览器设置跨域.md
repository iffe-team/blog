前端开发经常会遇到跨域的问题，尤其是本地开发，经常需要调后端同事电脑或测试环境的地址，这就对本地开发阶段造成了一些困扰。好在一些浏览器对开发者提供了“禁用安全模式”，前端ER们在本地开发的时候就不用考虑跨域的问题了，各终端的命令如下：

Mac下的Chrome：
```bash
# 49以前的版本
open -a "Google Chrome" --args --disable-web-security
# 49以后的版本
open -a /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir
```

Windows下的Chrome：
```bash
chrome.exe --disable-web-security
```

Mac下的Safari：
```bash
open -a '/Applications/Safari.app' --args --disable-web-security
```

Windows下的Safari：
```bash
C:\Program Files\Safari\Safari.exe --disable-web-security
```
