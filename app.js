//app.js
App({
    onLaunch: function () {
        var that = this;
        //设置商城列表名称
        wx.setStorageSync('mallName', '云商城');
        //  获取商城名称
        // wx.request({
        //     url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/config/get-value',
        //     data: {
        //         key: 'mallName'
        //     },
        //     success: function(res) {
        //         if (res.data.code == 0) {
        //             wx.setStorageSync('mallName', res.data.data.value);
        //         }
        //     }
        // })
        // wx.request({
        //     url: 'https://api.it120.cc/' + that.globalData.subDomain + '/score/send/rule',
        //     data: {
        //         code: 'goodReputation'
        //     },
        //     success: function (res) {
        //         if (res.data.code == 0) {
        //             that.globalData.order_reputation_score = res.data.data[0].score;
        //         }
        //     }
        // })
        // wx.request({
        //     url: 'https://api.it120.cc/' + that.globalData.subDomain + '/config/get-value',
        //     data: {
        //         key: 'recharge_amount_min'
        //     },
        //     success: function (res) {
        //         if (res.data.code == 0) {
        //             that.globalData.recharge_amount_min = res.data.data.value;
        //         }
        //     }
        // })
        // this.login();
        // this.registerUser();
    },
    login : function () {
        var that = this;
        // var token = that.globalData.token;
        // if (token) {
        //     wx.request({
        //         url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/check-token',
        //         data: {
        //             token: token
        //         },
        //         success: function (res) {
        //             if (res.data.code != 0) {
        //                 that.globalData.token = null;
        //                 that.login();
        //             }
        //         }
        //     })
        //     return;
        // }

        wx.login({

            //进行微信登录
            success: function (res) {
                var userCode = res.code;
                //获取所有用户信息（此处是以为无法提供获取单个用户的接口，因此只能取出全部之后遍历）

                wx.request({
                    url: 'https://api.bmob.cn/1/users',
                    method:'get',
                    header:{
                        'X-Bmob-Application-Id':'f901093bbc8eca0988380564553c4f87',
                        'X-Bmob-REST-API-Key':'a7ded56245b82c0d47e37a701355170e',
                        'Content-Type':'application/json'
                    },
                    success: function(userlist) {
                        wx.getUserInfo({
                            success: function (res) {
                                var iv = res.userInfo;
                                var ifHas = that.ifHasUserInfo(userlist,iv.nickName);
                                if (!ifHas) {
                                    // 去注册
                                    that.registerUser();
                                    return;
                                }
                            }
                        })

                        // if (res.data.code != 0) {
                        //     // 登录错误
                        //     wx.hideLoading();
                        //     wx.showModal({
                        //         title: '提示',
                        //         content: '无法登录，请重试',
                        //         showCancel:false
                        //     })
                        //     return;
                        // }
                        //console.log(res.data.data)
                        // that.globalData.token = res.data.data.token;
                        // that.globalData.uid = res.data.data.uid;
                    }
                })
                // wx.request({
                //     url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/user/wxapp/login',
                //     data: {
                //         code: res.code
                //     },
                //     success: function(res) {
                //
                //     }
                // })
            }
        })
    },
    registerUser: function () {
        var that = this;
        wx.login({
            success: function (res) {
                var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
                wx.getUserInfo({
                    success: function (res) {
                        var iv = res.userInfo;
                        var encryptedData = res.encryptedData;
                        // 下面开始调用注册接口
                        wx.request({
                            url: 'https://api.bmob.cn/1/users',
                            method:'post',
                            header:{
                                'X-Bmob-Application-Id':'f901093bbc8eca0988380564553c4f87',
                                'X-Bmob-REST-API-Key':'a7ded56245b82c0d47e37a701355170e',
                                'Content-Type':'application/json'
                            },

                            data:{
                              'username':iv.nickName,
                                'password':'123456',
                                'nickname':iv.nickName
                            },
                            success: (res) =>{
                                wx.hideLoading();
                                that.login();
                            }
                        })
                    }
                })
            }
        })
    },
    sendTempleMsg: function (orderId, trigger, template_id, form_id, page, postJsonString){
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
            method:'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                token: that.globalData.token,
                type:0,
                module:'order',
                business_id: orderId,
                trigger: trigger,
                template_id: template_id,
                form_id: form_id,
                url:page,
                postJsonString: postJsonString
            },
            success: (res) => {
                //console.log('*********************');
                //console.log(res.data);
                //console.log('*********************');
            }
        })
    },
    sendTempleMsgImmediately: function (template_id, form_id, page, postJsonString) {
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                token: that.globalData.token,
                type: 0,
                module: 'immediately',
                template_id: template_id,
                form_id: form_id,
                url: page,
                postJsonString: postJsonString
            },
            success: (res) => {
                console.log('*********************');
                console.log(res.data);
                console.log('*********************');
            }
        })
    },
    //查询用户列表里面是否包含用户数据
    ifHasUserInfo:function (userlist,nickname) {
        for(var i=0;i<userlist.data.results.length;i++){
            var eachOpenID = userlist.data.results[i].nickname;
            if(eachOpenID==nickname){
                return true;
            }
        }
        return false;
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登陆接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }

    },
    globalData:{
        userInfo:null,
        subDomain: "377d140de3d8e14cde35d681049ea273",
        version: "1.9.SNAPSHOT",
        shareProfile: '百款精品商品，总有一款适合您'
    }

})
