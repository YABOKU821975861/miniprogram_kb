// pages/wallheaven/wallheaven.js
Page({
  /**
   * 获取wallhaven的api
   */
  getWhApi(thaturl,page){
    let thispage = page;
    let nwurl = thaturl;
    // console.log(nwurl+" /page="+thispage)
    wx.showLoading({
      title: 'Loading...',
    })
    wx.request({
      url: nwurl+'&page='+thispage,
      success:res=> {    
        let ddata = res.data.data;
        wx.hideLoading({
          success: (res) => {
            this.setData({
              scrollTop: 0,
              whData: [...ddata],
              over:true
              // whData: [...this.data.whData, ...ddata]
            })
          },
        })
      },
      fail(){
        console.log("无法获取API")
      }
    })
  },
  /**
   * 下一页
   */
  nxpage() {
    let that = this.data;
    let index = that.idx;
    let pagenum = that.category[index].page;
    let newurl = that.category[index].url;
    pagenum ++;
    let num = 'category[' + index + '].page';
    this.setData({
      [num]:pagenum
    })
    this.getWhApi(newurl,pagenum);
  },
  /**
   * 上一页
   */
  repage() {
    let that = this.data;
    let index = that.idx;
    let pagenum = that.category[index].page;
    let newurl = that.category[index].url;
    if(pagenum>1) {
      pagenum --;
      let num = 'category[' + index + '].page';
      this.setData({
        [num]:pagenum
      })
      this.getWhApi(newurl,pagenum);
    }else {
      console.log('err')
    }
  },
  /**
   * 打开图片
   */
  popupPC(){
    this.setData({
      show: true
    })
  },
  /**
   * 记录Scroll-Top等数据
   */
  // scroll(e) {
  //   let detail_H = e.detail.scrollTop;
  //   var limit = this.data.model_H*0.1;
  //   // console.log(limit)
  //   if(detail_H-this.data.model_H == 50) {
  //     // console.log("1")
  //     this.setData({RM: true})
  //     this.nxpage()
  //   }else if(detail_H == -50){
  //     this.repage()
  //   }else {
  //     this.setData({RM: false})
  //   }
  // },
  /**
   * 切换内容
   */
  poup(e) {
    let newurl = e.currentTarget.dataset.categoryitem.url;
    let index = e.currentTarget.dataset.index;
    let idxPage = e.currentTarget.dataset.categorypage; 
    // console.log(this.data.whData)
    this.setData({
      idx: index,
      scrollTop: 0 
     })
    this.getWhApi(newurl, idxPage);
  },
  /**
   *  点击图片传送数值 
   */
  popupPC(e) {
    let sItem = e.currentTarget.dataset.showitem;
    // console.log(sItem)
    let Imgidx = e.currentTarget.dataset.idx;
    this.setData({
      showItem: sItem,
      showImg: sItem.thumbs.small,
      imgIdx: Imgidx,
      imgPath: sItem.short_url,
      imgResolution: sItem.resolution,
      show: true
    })
  },
  /**
   * 预览图片（缩放）
   */
  preView(e) {
      let imgArr=[];
      imgArr[0] = this.data.showItem.path;
      wx.previewImage({
        current: imgArr[0],//当前图片地址
        urls: imgArr
      })
  },
  /**
   * 切换图片大小
   */
  showLarge() {
    let $width=this.data.showItem.dimension_x,  //获取图片真实宽度
    $height=this.data.showItem.dimension_y,
    ratio=$width/$height;  //图片的真实宽高比例
    let viewWidth=300,      //设置图片显示宽度，左右留有16rpx边距
    viewHeight= 300/ratio;
    if(this.data.showImg == this.data.showItem.thumbs.small) {
      this.setData({
        iWidth: viewWidth,
        iHeight: viewHeight,
        showImg: this.data.showItem.path
      }) 
    }else {
      this.setData({
        iWidth: 300,
        iHeight: 200,
        showImg: this.data.showItem.thumbs.small
      })
    }
  },
  /**
   * 关闭page-container
   */
  showPrev() {
    this.deleFs();
    this.setData({
      show: false,
      iWidth: 300,
      iHeight: 200
    })
  },
  /**
   * 缓存，下入临时文件
   */
  loadimg(imgpath) {
    let that = this;
    // that.deleFs();
    wx.downloadFile({
      url: imgpath,
      success: function(res) {
        if (res.statusCode === 200) {
          console.log('图片下载成功' + res.tempFilePath)
          that.setData({
            image_filepath: res.tempFilePath
          })
        //   const fs = wx.getFileSystemManager()
        //   fs.saveFile({
        //     tempFilePath: res.tempFilePath, // 传入一个临时文件路径
        //     success(res) {
        //       console.log('图片缓存成功', res.savedFilePath) // res.savedFilePath 为一个本地缓存文件路径  
        //       wx.setStorageSync('image_cache', res.savedFilePath)
        //     },complete(res) {
        //       that.getimg();
        //     },fail(res) {
        //       console.log(res)
        //     }
        //   })
        }else {
          console.log('响应失败', res.statusCode)
        }
      }
    })
  },
  /**
   * 从srorage获取path
   */
  getimg() {
    const path = wx.getStorageSync('image_cache')
      if (path != null) {
        console.log('path====', path)
        this.setData({
          image_filepath: path
        })
        }else {
          console.log('去缓存图片')  
        }
  },
  /**
   * 删除存储的数据
   */
  deleFs() {
    wx.getSavedFileList({  // 获取文件列表
      success (res) {
        // console.log(res)
        res.fileList.forEach((val, key) => { // 遍历文件列表里的数据
            // 删除存储的垃圾数据
          wx.removeSavedFile({
              filePath: val.filePath
          });
        })
      }
    })
  },
  /**
   * 页面的初始数据
   * whData 指 获取到的所有数据 （all）
   * idx 指 头部导航的定位
   * imgIdx 指 图片的定位
   * current_page 指当前所展示第几页
   * showImg 指 点开对应图片的图片
   */
  data: {
    image_filepath:'', //暂存的文件路径
    url: "https://wallhaven.cc/api/v1/search",
    imgResolution:"",
    idx: 0,
    imgIdx:0,
    imgPath: "",
    showItem:[],
    showImg:"",
    whData:[],
    show: false,
    scrollTop:0,
    model_H: 5200,
    RM: false,
    iWidth: 300,
    iHeight: 200,
    over:false,
    category: [
      {
        name: "all",
        categoryType: "111",
        url: "https://wallhaven.cc/api/v1/search?categories=111",
        page: 1
      },
      {
        name: "general",
        categoryType: "100",
        url: "https://wallhaven.cc/api/v1/search?categories=100",
        page: 1
      },
      {
        name: "anime",
        categoryType: "010",
        url: "https://wallhaven.cc/api/v1/search?categories=010",
        page: 1
      },
      {
        name: "people",
        categoryType: "001",
        url: "https://wallhaven.cc/api/v1/search?categories=001",
        page: 1
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.deleFs();
    this.getWhApi(this.data.category[0].url,this.data.category[0].page)
    // console.log("更新啦")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getWhApi(this.data.category[0].url,this.data.category[0].page)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})