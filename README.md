# Vuex  axios vant
此项目是为做项目时准备的基础项目
1.封装了axios请求。模块化，多个默认网址请求，断网处理
2.配置了vuex
3.用按需引入配置了 vant // 在assets下plugins文件夹中配置引入

封装的axios是具有模块化的，可供多人开发，避免开发时多人使用一个输出接口文件，默认网址列表在’axios/api/base.js' 中更改
更改模块和加入模块也是在'axios/api/' 文件夹中的index.js 中更改，新加入的模块要导入此文件中


npm install vuex --save
npm install axios --save
npm i vant -S
npm i babel-plugin-import -D // 按需引入vant插件， 需要在.baselrc中配置
npm install vue-meta-info --save // 安装TDK设置插件 然后再main.js中全局引入， 在每个页面的data当中设置