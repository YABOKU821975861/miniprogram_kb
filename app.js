// app.js
App({
  //获取相册授权
  getalbumroot() {
    wx.getSetting({
      success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
      wx.authorize({
      scope:'scope.writePhotosAlbum',
      success() {
      console.log('授权成功')
      }
      })
      }
      }
    })
  },
   //图片保存到本地
  saveimg(imgSrc) {
    // var imgSrc = "http://yijiao.oss-cn-qingdao.aliyuncs.com/images/http://tmp/wx1b4e5e756cd48af1.o6zAJsws4grEQvYrWTjBigy-6QaU.0llhudiKSF2V955a1c48350d9328ef064b4d36d12746.jpg"
    wx.downloadFile({
      url: imgSrc,
      success: function (res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
              wx.openSetting({
              success(settingdata) {
                console.log(settingdata)
              if (settingdata.authSetting['scope.writePhotosAlbum']) {
                console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
              } else {
                console.log('获取权限失败，给出不给权限就无法正常使用的提示')
              }
              }
              })
            }
          },
          complete(res){
          console.log(res);
          }
        })
      }
    })
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
