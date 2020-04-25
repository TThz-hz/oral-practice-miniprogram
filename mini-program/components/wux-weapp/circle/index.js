"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames=_interopRequireDefault(require("../helpers/classNames"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var toAngle=function(e){return e/180*Math.PI},percent=function(e){return toAngle(e/100*360)},easeInOutCubic=function(e,t,n,a){return(e/=a/2)<1?n/2*e*e*e+t:n/2*((e-=2)*e*e+2)+t};(0,_baseComponent.default)({properties:{prefixCls:{type:String,value:"wux-circle"},percent:{type:Number,value:0,observer:"redraw"},strokeWidth:{type:Number,value:10},size:{type:Number,value:120,observer:"updateStyle"},lineCap:{type:String,value:"round"},backgroundColor:{type:String,value:"#f3f3f3"},color:{type:String,value:"#33cd5f"},sAngle:{type:Number,value:0,observer:function(e){this.setData({beginAngle:toAngle(e)})}},counterclockwise:{type:Boolean,value:!1},speed:{type:Number,value:2e3},animate:{type:Boolean,value:!0},background:{type:Boolean,value:!0}},data:{beginAngle:0,startAngle:0,endAngle:0,currentAngle:0},computed:{classes:["prefixCls",function(e){return{wrap:(0,_classNames.default)(e),inner:"".concat(e,"__inner")}}]},methods:{updateStyle:function(e){var t=0<arguments.length&&void 0!==e?e:this.data.size,n="width: ".concat(t,"px; height: ").concat(t,"px;");this.setData({style:n})},redraw:function(e){var t=this,n=0<arguments.length&&void 0!==e?e:this.data.percent,a=percent(n),i=Date.now(),r=this.data.currentAngle>a,s=r?this.data.endAngle:this.data.currentAngle;this.cancelNextCallback(),this.clearTimer(),this.safeSetData({startAngle:s,endAngle:a},function(){t.animate(i,i,r)})},draw:function(e){var t=this,n=!(0<arguments.length&&void 0!==e)||e,a=this.data,i=a.lineCap,r=a.backgroundColor,s=a.color,c=a.size,l=a.strokeWidth,u=a.counterclockwise,o=a.background,h=c/2,d=h-l/2,g=2*Math.PI,p=u?g-this.data.beginAngle:this.data.beginAngle,f=u?g-(this.data.beginAngle+this.data.currentAngle):this.data.beginAngle+this.data.currentAngle;this.ctx=this.ctx||wx.createCanvasContext("circle",this),this.ctx.clearRect(0,0,c,c),o&&(this.ctx.beginPath(),this.ctx.arc(h,h,d,0,2*Math.PI),this.ctx.setLineWidth(l),this.ctx.setStrokeStyle(r),this.ctx.stroke()),n&&(this.ctx.beginPath(),this.ctx.arc(h,h,d,p,f),this.ctx.setLineWidth(l),this.ctx.setStrokeStyle(s),this.ctx.setLineCap(i),this.ctx.stroke()),this.ctx.draw(!1,function(){t.triggerEvent("change",{value:t.data.currentAngle})})},animate:function(e,t,n){var a=this,i=Date.now(),r=i-e<1?1:i-e,s=this.data,c=s.animate,l=s.speed,u=s.startAngle,o=s.endAngle,h=!n&&1e3*this.data.currentAngle<=Math.floor(1e3*o)||n&&1e3*this.data.currentAngle>=Math.floor(1e3*o);if(c&&e-t<1.05*l&&h){var d=easeInOutCubic((e-t)/r,u,o-u,l/r),g=d<0?0:d;e=Date.now(),this.safeSetData({currentAngle:g},function(){a.draw(0!==g),a.timer=setTimeout(function(){return a.animate(e,t,n)},1e3/60)})}else this.safeSetData({currentAngle:o},function(){return a.draw(0!==o)})},clearTimer:function(){this.timer&&(clearTimeout(this.timer),this.timer=null)}},attached:function(){this.updateStyle(),0===this.data.percent&&this.draw(!1)},detached:function(){this.ctx=null,this.clearTimer()}});
