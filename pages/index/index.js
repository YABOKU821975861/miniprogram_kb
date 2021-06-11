import pub from "../../utils/pub.js"
Page({
  /**
   * 获取API数据
   * 赋值到whData
   */
  getRequest() {
    wx.request({
      url: 'https://ku.qingnian8.com/school/list.php',
      data: {
        num: 3
      },
      success:res=> {
        res.data.forEach((item, key)=> {
          var posttime = res.data[key].posttime;
          res.data[key].posttime = pub.getMyData(posttime, 'Y-m-d')
        })
        this.setData({
          DyContent : res.data
        })
      }
    })
  },
  moveClick(e) {
    let movewid = this.data.scrollwidth*0.2;
    let idx = e.currentTarget.dataset.botconidx;
    let item = this.data.botConS[idx];
    let arrc = 'botConS['+ idx +'].isclick';
    let arrL = 'botConS['+ idx +'].moveDataL';
    let arrR = 'botConS['+ idx +'].moveDataR';
    var animation = wx.createAnimation({
      duration: 1000,
      delay: 0,
      timingFunction: "ease",
    });
    // console.log(ic)
    if(!item.isclick) {
      
      animation.translateX(-movewid).step({duration: 1000})
      this.setData({[arrL]: animation.export(),[arrc]: true})
  
      animation.translateX(movewid).step({duration: 1000})
      this.setData({[arrR]: animation.export()})
      // console.log(item)
    }else {
      animation.translateX(0).step({duration: 1000})
      this.setData({[arrL]: animation.export(),[arrc]: false})
      animation.translateX(0).step({duration: 1000})
      this.setData({[arrR]: animation.export()})
      // console.log(item)
    }
  },
  /**
   * 轮播图data
   */
  data: {
    scrollheight: 0,
    scrollwidth:0,
    swpArr:[
      {
        index: 1,
        src: "/imgs/banner1.png",
        ourl: "https://wallhaven.cc/w/oxyjvl"
      },
      {
        index: 2,
        src: "/imgs/banner2.png",
        ourl: "https://wallhaven.cc/w/g8yyo3"
      },
      {
        index: 3,
        src: "/imgs/banner3.png",
        ourl: "https://wallhaven.cc/w/lq5d8r"
      }
    ],
    /**
     * swiper元素data
     */
    midCons:[
      {
        index: 1,
        txt:"midCon1",
        url:"/imgs/midCon1.jpg",
        nav:"/pages/midcon1/midcon1",
        opty: "navigateTo"
      },{
        index: 2,
        txt:"wallheaven",
        url:"/imgs/midCon1.jpg",
        nav:"/pages/wallheaven/wallheaven",
        opty: "switchTab"
      },{
        index: 3,
        txt:"主网址",
        url:"/imgs/midCon1.jpg"
      },{
        index: 4,
        txt:"主网址",
        url:"/imgs/midCon1.jpg"
      },{
        index: 5,
        txt:"主网址",
        url:"/imgs/midCon1.jpg"
      },{
        index: 6,
        txt:"看不见",
        url:"/imgs/midCon1.jpg"
      }
    ],
    /**
     * 轮播图data
     */
    botConS:[
      {
        index: 0,
        isclick: false,
        moveDataL:null,
        moveDataR:null,
        author: 'Nixeu',
        pid: '49552835',
        url: "/imgs/Nixeu.jpg",
        description: "充分利用光线和暗部，让整个构图变得十分写实"
      },
      {
        index: 1,
        isclick: false,
        moveDataL:null,
        moveDataR:null,
        author: 'Azomo',
        pid: '6342480',
        url: "/imgs/Azomo.jpg",
        description: "独特厚涂方式和场景设计，使得画面灵动起来"
      },
      {
        index: 2,
        isclick: false,
        moveDataL:null,
        moveDataR:null,
        author: 'Sakimichan',
        pid: '3384404',
        url: "/imgs/Sakimichan.jpg",
        description: "充其特别的人物绘画方式，让该作者笔下的角色变得エロ満々です"
      }
    ],
    /**
     * DyContent
     */
    DyContent: [ ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res=>{
        console.log(res.windowWidth)
        this.setData({
          scrollwidth: res.windowWidth
        })
      }
    })
    this.getRequest();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this)
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