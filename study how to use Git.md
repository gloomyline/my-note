# 学习GIT过程中随笔

1. 版本控制工具的使用
  - Git desktop
  - Git 小乌龟
2. 养成经常写学习总结的习惯
3. essay

    ```javascript
    function add(a,b){
        return a + b;
    }
    
    add(1,3);
    ```

## Commit Message

### Commit Standard

1. message 摘要不超过50个字，首字母大写，使用祈使语气，句末不要加句号

2. 引用相关 issue 或 PR 编号 <#110>

### Commit Emoji
| emoji         | code     | semantic        |
| :------------ | :------- | :-------------- |
| :tada:(庆祝)  | `:tada:` | 初次提交         |
| :sparkles:(火花) | `:sparkles:` | 引入新功能 |
| :bookmark:(书签) | `:bookmark:` | 发型/版本b标签 |
| :bug: | `:bug:` | 修复bug |
| :ambulance: | `:ambulance:` | 重要补丁 |
| :globe_with_meridians:(地球) | `globe_with_meridians` | 国际化与本地化 |  
| :lipstick:(口罩) | `:lipstick:` | 更新ui和样式文件 |
| :rotating_light: | `:rotating_light:` | 移除linter警告 |
| :wrench: (扳手) | `:wrench:` | 修改配置文件 |
| :heavy_plus_sign:(加号) | `:heavy_plus_sign:` | 增加一个依赖 |
| :heavy_minus_sign: (减号) |	`:heavy_minus_sign:` |	减少一个依赖 |
| :arrow_up: (上升箭头) |	`:arrow_up:` |	升级依赖 |
| :arrow_down: (下降箭头) |	`:arrow_down:` |	降级依赖 |
| :zap: (闪电) :racehorse: (赛马) | `:zap:` `:racehorse:` |	提升性能 |
| :chart_with_upwards_trend: (上升趋势图) |	`:chart_with_upwards_trend:` |	添加分析或跟踪代码 |
| :rocket: (火箭) |	`:rocket:` |	部署功能 |
| :white_check_mark: (白色复选框) |	`:white_check_mark:` |	增加测试 |
| :memo: (备忘录) |	`:memo:` | 撰写文档 |
| :hammer: (锤子) |	`:hammer:` |重大重构 |
| :art: (调色板) | `:art:` |	改进代码结构/代码格式 |
| :fire: (火焰) |	`:fire:` |	移除代码或文件 |
| :pencil2: (铅笔) | `:pencil2:` |	修复 typo |
| :construction: (施工) |	`:construction:` |	工作进行中 |
| :construction_worker: (工人) | `:construction_worker:` |	添加 CI 构建系统 |
| :green_heart: (绿心) | `:green_heart:` |	修复 CI 构建问题 |
| :lock: (锁) |	`:lock:` |	修复安全问题 |
| :whale: (鲸鱼) |	`:whale:` |	Docker 相关工作 |
| :apple: (苹果) |	:apple: |	修复 macOS 下的问题 |
| :penguin: (企鹅)|	:penguin:|	修复 Linux 下的问题 |
| :checkered_flag:| (旗帜)	|:checked_flag:|	修复 Windows 下的问题 |
