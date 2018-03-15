//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false, // loading
        userInfo: {},
        swiperCurrent: 0,
        selectCurrent: 0,
        categories: [],
        activeCategoryId: 0,
        goods: [],
        scrollTop: "0",
        loadingMoreHidden: true,

        hasNoCoupons: true,
        coupons: [],
        searchInput: '',
    },

    tabClick: function (e) {
        this.setData({
            activeCategoryId: e.currentTarget.id
        });
        this.getGoodsList(this.data.activeCategoryId);
    },
    //事件处理函数
    swiperchange: function (e) {
        //console.log(e.detail.current)
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    toDetailsTap: function (e) {
        wx.navigateTo({
            url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
        })
    },
    tapBanner: function (e) {
        if (e.currentTarget.dataset.id != 0) {
            wx.navigateTo({
                url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
            })
        }
    },
    bindTypeTap: function (e) {
        this.setData({
            selectCurrent: e.index
        })
    },
    scroll: function (e) {
        //  console.log(e) ;
        var that = this, scrollTop = that.data.scrollTop;
        that.setData({
            scrollTop: e.detail.scrollTop
        })
        // console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
        // console.log('scrollTop:'+scrollTop)
    },
    onLoad: function () {
        var that = this
        wx.setNavigationBarTitle({
            title: wx.getStorageSync('mallName')
        })
        //设置写死了的轮播图列表
        that.setData({
            banners:[
                {
                    "businessId": 1,
                    "dateAdd": "2018-01-30 08:58:08",
                    "id": 4617,
                    "linkUrl": "",
                    "paixu": 0,
                    "picUrl": "http://www.wailian.work/images/2018/03/15/banner01.md.jpg",
                    "remark": "",
                    "status": 0,
                    "statusStr": "显示",
                    "title": "图片2",
                    "type": "test",
                    "userId": 3791
                },
                {
                    "businessId": 0,
                    "dateAdd": "2018-01-30 08:57:53",
                    "id": 4616,
                    "linkUrl": "",
                    "paixu": 0,
                    "picUrl": "http://www.wailian.work/images/2018/03/15/banner02.md.jpg",
                    "remark": "",
                    "status": 0,
                    "statusStr": "显示",
                    "title": "图片1",
                    "type": "test",
                    "userId": 3791
                }
            ]
        });
        /*
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
          //更新数据
          that.setData({
            userInfo:userInfo
          })
        })
        */
        //获取banner列表
        // wx.request({
        //     url: 'https://api.it120.cc/' + app.globalData.subDomain + '/banner/list',
        //     data: {
        //         key: 'mallName'
        //     },
        //     success: function (res) {
        //         if (res.data.code == 404) {
        //             wx.showModal({
        //                 title: '提示',
        //                 content: '请在后台添加 banner 轮播图片',
        //                 showCancel: false
        //             })
        //         } else {
        //             that.setData({
        //                 banners: res.data.data
        //             });
        //         }
        //     }
        // })
        //获取全部商品分类
        // wx.request({
        //     url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/category/all',
        //     success: function (res) {
        //         var categories = [{id: 0, name: "全部"}];
        //         if (res.data.code == 0) {
        //             for (var i = 0; i < res.data.data.length; i++) {
        //                 categories.push(res.data.data[i]);
        //             }
        //         }
        //         that.setData({
        //             categories: categories,
        //             activeCategoryId: 0
        //         });
        //         that.getGoodsList(0);
        //     }
        // })
        var res = {
            "code": 0,
            "data": [
                {
                    "dateAdd": "2018-01-30 08:46:55",
                    "icon": "https://cdn.it120.cc/apifactory/2018/01/29/c0494a2bd3425e456e52b0e366023a8d.jpg",
                    "id": 7127,
                    "isUse": true,
                    "key": "000001",
                    "level": 1,
                    "name": "手机",
                    "paixu": 0,
                    "pid": 0,
                    "type": "手机",
                    "userId": 3791
                }
            ],
            "msg": "success"
        }

        var categories = [{id: 0, name: "全部"}];
        if (res.code == 0) {
            for (var i = 0; i < res.data.length; i++) {
                categories.push(res.data[i]);
                }
        }
        that.setData({
            categories: categories,
            activeCategoryId: 0
        });
        // that.getCoupons();
        // that.getNotice();
        //获取所有商品
        that.getGoodsList(0);
    },
    //此处为获取商品接口，此为标准请求样例
    //请求地址为：https://api.bmob.cn/1/classes/goods
    getGoodsList: function (categoryId) {
        if (categoryId == 0) {
            categoryId = "";
        }
        console.log(categoryId)
        var that = this;
        //构建模拟数据
        var res = {
            "code": 0,
            "data": [
                {
                    "barCode": "000001",
                    "categoryId": 7127,
                    "characteristic": "超级大促销",
                    "commission": 0,
                    "commissionType": 0,
                    "dateAdd": "2018-01-30 08:48:23",
                    "dateStart": "2018-01-30 08:46:59",
                    "dateUpdate": "2018-01-30 08:50:16",
                    "id": 22913,
                    "logisticsId": 0,
                    "minPrice": 550,
                    "name": "华为V10",
                    "numberFav": 0,
                    "numberGoodReputation": 0,
                    "numberOrders": 0,
                    "originalPrice": 550,
                    "paixu": 0,
                    "pic": "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=694b483f811363270aedc433a18ea056/11385343fbf2b211eb8751adc18065380dd78eac.jpg",
                    "recommendStatus": 1,
                    "recommendStatusStr": "推荐",
                    "shopId": 0,
                    "status": 0,
                    "statusStr": "上架",
                    "stores": 1000,
                    "userId": 3791,
                    "videoId": "",
                    "views": 11,
                    "weight": 0
                }
            ],
            "msg": "success"
        }
        //处理数据
        var goods = [];
        if (res.code != 0 || res.data.length == 0) {
            that.setData({
                loadingMoreHidden: false,
            });
            return;
        }
        for (var i = 0; i < res.data.length; i++) {
                goods.push(res.data[i]);
        }
        that.setData({
            goods: goods,
        });
        // wx.request({
        //     url: 'https://api.bmob.cn/1/classes/goods',
        //     method: 'get',
        //     data: {
        //         //categoryId: categoryId,
        //         //nameLike: that.data.searchInput
        //         header: {
        //             'X-Bmob-Application-Id': 'f901093bbc8eca0988380564553c4f87',
        //             'X-Bmob-REST-API-Key': 'a7ded56245b82c0d47e37a701355170e',
        //             'Content-Type': 'application/json'
        //         }
        //     },
        //     success: function (res) {
        //         that.setData({
        //             goods: [],
        //             loadingMoreHidden: true
        //         });
        //         var goods = [];
        //         if (res.data.code != 0 || res.data.data.length == 0) {
        //             that.setData({
        //                 loadingMoreHidden: false,
        //             });
        //             return;
        //         }
        //         for (var i = 0; i < res.data.data.length; i++) {
        //             goods.push(res.data.data[i]);
        //         }
        //         that.setData({
        //             goods: goods,
        //         });
        //     }
        // })

    },
    getCoupons: function () {
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/coupons',
            data: {
                type: ''
            },
            success: function (res) {
                if (res.data.code == 0) {
                    that.setData({
                        hasNoCoupons: false,
                        coupons: res.data.data
                    });
                }
            }
        })
    },
    gitCoupon: function (e) {
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/fetch',
            data: {
                id: e.currentTarget.dataset.id,
                token: app.globalData.token
            },
            success: function (res) {
                if (res.data.code == 20001 || res.data.code == 20002) {
                    wx.showModal({
                        title: '错误',
                        content: '来晚了',
                        showCancel: false
                    })
                    return;
                }
                if (res.data.code == 20003) {
                    wx.showModal({
                        title: '错误',
                        content: '你领过了，别贪心哦~',
                        showCancel: false
                    })
                    return;
                }
                if (res.data.code == 30001) {
                    wx.showModal({
                        title: '错误',
                        content: '您的积分不足',
                        showCancel: false
                    })
                    return;
                }
                if (res.data.code == 20004) {
                    wx.showModal({
                        title: '错误',
                        content: '已过期~',
                        showCancel: false
                    })
                    return;
                }
                if (res.data.code == 0) {
                    wx.showToast({
                        title: '领取成功，赶紧去下单吧~',
                        icon: 'success',
                        duration: 2000
                    })
                } else {
                    wx.showModal({
                        title: '错误',
                        content: res.data.msg,
                        showCancel: false
                    })
                }
            }
        })
    },
    onShareAppMessage: function () {
        return {
            title: wx.getStorageSync('mallName') + '——' + app.globalData.shareProfile,
            path: '/pages/index/index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    getNotice: function () {
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/notice/list',
            data: {pageSize: 5},
            success: function (res) {
                if (res.data.code == 0) {
                    that.setData({
                        noticeList: res.data.data
                    });
                }
            }
        })
    },
    listenerSearchInput: function (e) {
        this.setData({
            searchInput: e.detail.value
        })

    },
    toSearch: function () {
        this.getGoodsList(this.data.activeCategoryId);
    }
})
