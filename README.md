# vue-turnplate
a turnplate component with vue use in h5

## How to use

### 一、在页面逻辑添加以下js代码
```
new Vue( 
//基础数据
  data:{
    giftIndex:'',
    giftList:[]
  },
  //局部注册组件
  components: {
    'rotary-table': rotaryTable,
  },
  //设置事件
  events: {
     //展示抽奖结果
    'show-prize': function () {
      //在此添加中奖后的操作
     }
  },
  //实例里的方法
  methods: {
    //开始游戏
    start:function(){
    //在这里添加转盘转动前的逻辑判断
    /**
    *如：
    *setTimeOut(function(){
    *this.giftIndex = 0    //两秒后停在第一格
    *},2000)
    **/
    this.$broadcast('start-game')
  }，
  //转盘复位
  reset:function(){
    //在这里添加转盘角度回归到零之前的操作
    this.$broadcast('on-reset')
  }
})
```        

### 二、html
```
<rotary-table :ratio="2" :gift-index="giftIndex" :gift-list="giftList" @on-start="start()"></rotary-table>
```


### 三、配置讲解
#### pies：设置转盘分多少块，默认8块；
#### ratio：转盘速度倍率，默认一秒一圈，设置后将乘上改倍率
#### giftList：转盘上的礼品列表，数组对象
#### giftIndex：中奖礼品的下标,触发转盘停止转动的关键变量，可通过抽奖接口获取
#### rotate：转盘已转动的角度
#### style：样式对象，用于设置转动角度
