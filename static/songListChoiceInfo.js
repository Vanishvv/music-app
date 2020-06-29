/**
 * @Author:Wang Jun
 * @Date:2020/6/29/029 16:23
 * @Description:歌单功能选项数据
 */
module.exports = {
  data: [
    {
      name: "comment",
      iconName: "iconfont icon-comment",
      choiceName: "评论"
    },
    {
      name: "share",
      iconName: "iconfont icon-share",
      choiceName: "分享"
    },
    {
      name: "download",
      iconName: "iconfont icon-download",
      choiceName: "下载"
    },
    {
      name: "multiChoice",
      iconName: "iconfont icon-multi-choice",
      choiceName: "多选"
    }
  ],
  shareOptions: [
    { name: "微信", icon: "wechat" },
    { name: "微博", icon: "weibo" },
    { name: "复制链接", icon: "link" },
    { name: "分享海报", icon: "poster" },
    { name: "二维码", icon: "qrcode" }
  ]
};
