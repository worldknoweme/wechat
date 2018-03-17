var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    statusType: ["待付款", "待发货", "待收货", "待评价", "已完成"],
    currentType:0,
    tabClass: ["", "", "", "", ""]
  },
  statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.data.currentType = curType
     this.setData({
       currentType:curType
     });
     this.onShow();
  },
  orderDetail : function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  cancelOrderTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
     wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
            that.onShow();
          // wx.showLoading();
          // wx.request({
          //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/close',
          //   data: {
          //     token: app.globalData.token,
          //     orderId: orderId
          //   },
          //   success: (res) => {
          //     wx.hideLoading();
          //     if (res.data.code == 0) {
          //       that.onShow();
          //     }
          //   }
          // })
        }
      }
    })
  },
  toPayTap:function(e){
      wx.showModal({
          title: '温馨提示',
          content: '支付成功',
          showCancel: false
      })
      wx.reLaunch({
          url: "/pages/index/index"
      });
    // var that = this;
    // var orderId = e.currentTarget.dataset.id;
    // var money = e.currentTarget.dataset.money;
    // wx.request({
    //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/amount',
    //   data: {
    //     token: app.globalData.token
    //   },
    //   success: function (res) {
    //       wx.showModal({
    //               title: '温馨提示',
    //               content: '支付成功',
    //               showCancel: false
    //             })
    //       wx.reLaunch({
    //           url: "/pages/order-list/index"
    //       });
        // if (res.data.code == 0) {
        //   // res.data.data.balance
        //   money = money - res.data.data.balance;
        //   if (money <= 0) {
        //     // 直接使用余额支付
        //     wx.request({
        //       url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/pay',
        //       method:'POST',
        //       header: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //       },
        //       data: {
        //         token: app.globalData.token,
        //         orderId: orderId
        //       },
        //       success: function (res2) {
        //         wx.reLaunch({
        //           url: "/pages/order-list/index"
        //         });
        //       }
        //     })
        //   } else {
        //     wxpay.wxpay(app, money, orderId, "/pages/order-list/index");
        //   }
        // } else {
        //   wx.showModal({
        //     title: '错误',
        //     content: '无法获取用户资金信息',
        //     showCancel: false
        //   })
        // }
    //   }
    // })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
   
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },
  getOrderStatistics : function () {
    var that = this;
    //设置模拟数据

      that.setData({
          tabClass: ['red-dot','','',''],
      });

    // wx.request({
    //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/statistics',
    //   data: { token: app.globalData.token },
    //   success: (res) => {
    //     wx.hideLoading();
    //     if (res.data.code == 0) {
    //       var tabClass = that.data.tabClass;
    //       if (res.data.data.count_id_no_pay > 0) {
    //         tabClass[0] = "red-dot"
    //       } else {
    //         tabClass[0] = ""
    //       }
    //       if (res.data.data.count_id_no_transfer > 0) {
    //         tabClass[1] = "red-dot"
    //       } else {
    //         tabClass[1] = ""
    //       }
    //       if (res.data.data.count_id_no_confirm > 0) {
    //         tabClass[2] = "red-dot"
    //       } else {
    //         tabClass[2] = ""
    //       }
    //       if (res.data.data.count_id_no_reputation > 0) {
    //         tabClass[3] = "red-dot"
    //       } else {
    //         tabClass[3] = ""
    //       }
    //       if (res.data.data.count_id_success > 0) {
    //         //tabClass[4] = "red-dot"
    //       } else {
    //         //tabClass[4] = ""
    //       }
    //
    //       that.setData({
    //         tabClass: tabClass,
    //       });
    //     }
    //   }
    // })
  },
  onShow:function(){
    // 获取订单列表
    wx.showLoading();
    var that = this;
    // var postData = {
    //   token: app.globalData.token
    // };
    // postData.status = that.data.currentType;
    this.getOrderStatistics();
    var orderList = [{
        dateAdd: '2018-03-16 18:35:24',
        statusStr: 4,
        id: 12,
        orderNumber: 3897788996,
        remark: "促销活动，只能拍一件",

        amountReal:1299,
        status:0
    }]
      var goodsMap ={
        '12':[{
            pic: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=694b483f811363270aedc433a18ea056/11385343fbf2b211eb8751adc18065380dd78eac.jpg'

        }],
      }
      that.setData({
          orderList:orderList,
          goodsMap:goodsMap
      })
    // wx.request({
    //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/list',
    //   data: postData,
    //   success: (res) => {
    //     wx.hideLoading();
    //     if (res.data.code == 0) {
    //       that.setData({
    //         orderList: res.data.data.orderList,
    //         logisticsMap : res.data.data.logisticsMap,
    //         goodsMap : res.data.data.goodsMap
    //       });
    //     } else {
    //       this.setData({
    //         orderList: null,
    //         logisticsMap: {},
    //         goodsMap: {}
    //       });
    //     }
    //   }
    // })
      wx.hideLoading();
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  }
})