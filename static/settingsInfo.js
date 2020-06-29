/**
 * @Author:Wang Jun
 * @Date:2020/6/29/029 16:23
 * @Description:设置页面数据
 */
module.exports = {
  data: {
    title: "",
    edit: "修改密码",
    quit: "退出账号",
    networkData: [
      {
        title: "使用2G/3G/4G网络播放",
        check: true
      },
      {
        title: "使用2G/3G/4G网络下载",
        check: true
      },
      {
        title: "动态页中Wi-Fi下自动播放视频",
        check: true
      },
      {
        title: "视频页中Wi-Fi下自动播放视频",
        check: true
      }
    ],
    playData: [
      {
        title: "在线播放音质",
        value: "极高"
      },
      {
        title: "下载音质",
        value: "极高"
      },
      {
        title: "鲸云音效",
        value: ""
      },
      {
        title: "视频解码模式",
        value: "默认设置"
      },
      {
        title: "边听边存",
        value: "未开启"
      },
      {
        title: "设置下载目录",
        value: "存储卡1"
      }
    ],
    aboutData: [
      {
        title: "云音乐新手指南"
      },
      {
        title: "帮助与反馈"
      },
      {
        title: "关于网易云音乐"
      }
    ]
  }
};
