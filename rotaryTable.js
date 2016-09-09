/**
 * Created by Administrator on 2016/8/5 0005.
 */
define([], function () {

    /***
     * 精确度处理方法
     * **/
    var forDight = function(Dight,How){

        var Dight = Math.round (Dight*Math.pow(10,How))/Math.pow(10,How);

        return Dight;

    }


    /***
     * 重置转盘到初始位置
     * **/
    var reset = function () {
        this.rotate = 0
        this.style = {
            transform: 'rotate(0deg)',
        }
    }

    /***
     * 设置初始的转速
     * trun:每秒转动的圈数,默认一秒一圈
     * **/
    var setSpeed = function () {
        this.interval = 1000 / this.pies / this.ratio / 2
        this.speed = 360 / this.pies / 2

    }

    /***
     * 开始转动函数
     * **/
    var start = function () {
        var that = this
        this.run = setInterval(function () {
            that.rotate += that.speed
            that.style = {
                transform: 'rotate(' + that.rotate + 'deg)',
            }
        }, this.interval)
        var keepRun = setInterval(function () {
            if (that.giftIndex >= 0 && that.giftIndex <= that.pies) {
                clearInterval(that.run)
                clearInterval(keepRun)
                that.stop((2 * that.giftIndex + 1) * that.speed)
            }
        }, 1000)
    }

    /***
     * 假定结果：
     * index：圆盘区域坐标
     * **/
    var setIndex = function (index) {
        if (index != 0) {
            index = index || 7
        }
        this.giftIndex = index
    }

    /***
     * 停止转盘转动函数
     * **/
    var stop = function (ang) {
        if (this.rotate % 360 != 0) {
            var end = (Math.ceil(this.rotate / 360) + this.ratio) * 360 + (360 - ang)
            var totalAng = end - this.rotate
            this.runEnd(this.speed, totalAng,end)
        } else {
            var add = this.ratio * 360 + (360 - ang)
            var end = this.rotate + add
            this.runEnd(this.speed, add,end)
        }
    }

    /***
     * 转盘停止前的减速运动
     * @parameters:
     * ang:角速度
     * totalAng:最后要走的总角度
     * **/
    var runEnd = function (ang, totalAng,end) {
        var that = this
        var times = Math.floor(totalAng / ang)   //调用次数
        var dec = ang / (2 * times - 1)   //角速度减量
        //var time = this.interval * (times * 2 + 2)
        var endRun = setInterval(function () {
            if(ang - dec >0){
                //console.log(ang)
                that.rotate += ang
                that.style = {
                    transform: 'rotate(' + that.rotate + 'deg)',
                }
                ang -= dec
            }else{
                that.style = {
                    transform: 'rotate(' + end + 'deg)',
                }
                clearInterval(endRun)
                setTimeout(function () {
                    that.$dispatch('show-prize', this.msg)
                }, 200)
            }
        }, this.interval)
    }

    //返回组件实例
    return {
        template: "<div class=\"turn-table\" id=\"turnTable\">\r\n    <div class=\"rotate\" :style=\"style\">\r\n        <img class=\"rotate-bg\" src=\"/static/img/turnplate/turntable.png\" alt=\"\">\r\n        <div v-for=\"gift in giftList\" class=\"prize prize-{{$index}}\"><img class=\"type-{{gift}}\" src=\"/static/img/turnplate/gift_{{gift}}.png\" alt=\"\"></div>\r\n    </div>\r\n\r\n    <!--v-show = \"times>0\"-->\r\n    <button class=\"pointer\" @click=\"onStart()\" >\r\n        <img src=\"/static/img/turnplate/pointer.png\">\r\n    </button>\r\n\r\n    <!--<button class=\"pointer\" v-show = \"times<=0\">-->\r\n        <!--<img src=\"/static/img/turnplate/no_raffleTimes.png\">-->\r\n    <!--</button>-->\r\n</div>\r\n<!--{{giftIndex}}-->",
        ready: function () {
            //设置转盘速度
            this.setSpeed()
        },
        props: {
            pies: {                       //转盘块数
                type: Number,
                default: 8
            },
            speed: {                     //角增量
                type: Number,
                default: 25
            },
            interval: {                  //定时器时间间隔
                type: Number,
                default: 62.5
            },
            ratio: {                     //转盘速度倍率
                type: Number,
                default: 1
            },
            giftList: {                  //转盘的礼品分布
                type: Array,
                default: []
            },
            giftIndex: {                //中奖礼品在圆盘中的下标
                type: Number,
                default: -1
            },
            rotate: {                   //转盘的旋转角度
                type: Number,
                default: 0
            },
            style: Object,              //设置转盘角度
        },
        events: {
            'start-game': function () {
                this.start()
            },
            'on-reset': function () {
                this.reset()
            }
        },
        methods: {
            //设置初始转速
            setSpeed: setSpeed,
            //转盘复位
            reset: reset,
            //开始转动函数
            start: start,
            //停止转动函数
            stop: stop,
            //停止转动调取的减速运动函数
            runEnd: runEnd,
            //设置停止时所指向的格数
            setIndex: setIndex,
            onStart: function () {
                this.$emit('on-start')
            }
        }
    }
})