document.addEventListener("DOMContentLoaded",function(){function e(){var e=document.getElementById("bg-music");e.play(),document.addEventListener("WeixinJSBridgeReady",function(){e.play()},!1)}e()}),$(function(){function e(){$("#loading").css({opacity:0}),setTimeout(function(){$("#loading").hide()},1e3)}function t(){setTimeout(function(){$("#s1t1").css({left:0,opacity:1}),setTimeout(function(){$("#s1t4").css({left:0,opacity:1}),setTimeout(function(){$("#s1t5").css({opacity:1});var e=new i($("#s1t5"),function(){goto(1),n()});e.listen()})},p)},p)}function n(){setTimeout(function(){$("#s2t1").css({left:0,opacity:1}),setTimeout(function(){$("#s2t4").css({left:0,opacity:1}),setTimeout(function(){$("#s2t5").css({opacity:1});var e=new i($("#s2t5"),function(){goto(2),o()},function(){goto(0)});e.listen()},p)},p)},p)}function o(){setTimeout(function(){$("#s3t1").css({left:0,opacity:1}),setTimeout(function(){$("#s3t4").css({left:0,opacity:1}),$("#froze").one("touchstart",function(e){e.preventDefault(),e.stopPropagation(),c.pause(),r.play(),$("#froze").css({"background-image":"url(res/froze.gif)"}),setTimeout(function(){$("#canvas").show(),$("#s3t1").hide(),$("#s3t2").hide(),$("#s3t3").hide(),$("#s3t4").hide(),$("#froze").hide(),$("#scene3").css({"background-image":"url(res/poster.gif)"})},5e3)})},p)},p)}function s(){setTimeout(function(){$("#s4t2").css({left:0,opacity:1}),setTimeout(function(){$("#start-btn").on("touchend",function(){$("#form").show()})},p)},p)}function i(e,t,n){this.y0=0,this.yt=0,this.next=t,this.prev=n,this.elm=e}var c=$("#bg-music")[0],r=$("#audio1")[0],a=$("#audio2")[0];$("body, #loading, #s1t5, #scene1").one("touchstart",function(){r.load(),a.load()}),$("body").on("touchmove",function(e){return e.preventDefault(),e.stopPropagation(),!1});var u=document.body.clientWidth,f=document.body.clientHeight;f>u&&$(".scene").css({height:f+"px"}),console.log(u,f);var p=1e3,d=$("#canvas")[0];d.width=u,d.height=f;var g=d.getContext("2d"),l=new Image;l.src="./res/hand.jpg",l.onload=function(){var e=l.width,t=l.height,n=u*t/f;g.drawImage(l,(e-n)/2,0,n,t,0,0,u,f),g.globalCompositeOperation="destination-out",$(d).on("touchstart",function(e){e.preventDefault(),e.stopPropagation(),r.pause()}),$(d).on("touchmove",function(e){e.preventDefault(),e.stopPropagation();var t=e.touches[0].clientX,n=e.touches[0].clientY;g.beginPath(),g.arc(t,n,30,0,2*Math.PI,!0),g.fill()}),$(d).on("touchend",function(e){e.preventDefault(),e.stopPropagation(),console.log("wh",u*f),console.log("wh",u*f*.2);for(var t=g.getImageData(0,0,u,f).data,n=0,o=0;n<t.length;n+=4)t[n]&&t[n+1]&&t[n+2]&&t[n+3]&&o++;if(console.log("j",o),o<=u*f*.8){$(d).hide(),r.pause(),a.play();var c=new i($("#scene3"),function(){goto(3),s();var e=new i($("#s4t1,#s4t2"),function(){},function(){goto(2)});e.listen()},function(){});c.listen()}})},$("form").css({width:320*f/568,"margin-left":-320*f/568/2+"px"}),$("#sex").on("focus",function(){$("#sex-select").focus()}),$("#age").on("focus",function(){$("#age-select").focus()}),$("#sex-select").on("change",function(){$("#sex").val(1==$("#sex-select").val()?"男":"女")}),$("#age-select").on("change",function(){$("#age").val($("#age-select").val())}),$("#submit").on("touchend",function(){var e=$("#username").val(),t=$("#phone").val(),n=$("#age-select").val(),o=$("#sex-select").val(),s=/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;return""==e||""==t?void $("#error").show():s.test(t)?($("#request").show(),void $.ajax({url:"/info",type:"post",data:{username:e,phone:t,sex:o,age:n},success:function(e){$("#request").hide(),e.success?($("#form").hide(),$("#s4t2").hide(),$("#success").show()):($("#form").hide(),$("#s4t2").hide(),$("#expire").show())}})):void $("#wrong").show()}),$(".back").on("touchend",function(){$(".result").hide()}),window["goto"]=function(e){var t=0;e&&(t=-e*f+"px"),$("#main").css({top:t})},window.froze=function(){$("#froze").css({"background-image":"url(res/froze.gif)"})},i.prototype.listen=function(){var e=this;this.elm.on("touchstart",function(t){t.preventDefault(),t.stopPropagation(),e.y0=t.touches[0].clientY}).on("touchmove",function(){event.preventDefault(),event.stopPropagation(),e.yt=event.touches[0].clientY}).on("touchend",function(){event.preventDefault(),event.stopPropagation(),e.yt>e.y0?"function"==typeof e.prev&&e.prev():e.yt<e.y0&&"function"==typeof e.next&&e.next(),e.y0=0,e.yt=0})};var h={pic:[{id:"#scene1",res:"res/bg1.jpg"},{id:"#scene2",res:"res/bg2.jpg"},{id:"#scene3",res:"res/bg3.jpg"},{id:"#scene4",res:"res/map.jpg"},{id:"#s1t1",res:"res/bt1.png"},{id:"#s1t4",res:"res/wrinkle.jpg"},{id:"#s2t1",res:"res/bt2.png"},{id:"#s2t4",res:"res/s2t4.png"},{id:"#s3t1",res:"res/bt3.png"},{id:"#s3t3",res:"res/s3t3.png"},{id:"#s3t4",res:"res/s3t4.png"},{id:"#s4t2",res:"res/map-btn.png"},{id:"#error",res:"res/error.png"},{id:"#wrong",res:"res/wrong-num.png"},{id:"#success",res:"res/success.png"},{id:"#expire",res:"res/expire.png"},{id:"#form",res:"res/form.png"},{id:"#frozeGifVirt",res:"res/froze.gif"},{id:"#canvasPic",res:"res/hand.jpg"},{id:"#posterGifVirt",res:"res/poster.gif"}]},v=0;h.pic.forEach(function(n,o){var s=new Image;s.onload=function(){v+=1,$(n.id).css({"background-image":"url("+n.res+")"}),v==h.pic.length&&setTimeout(function(){e(),t()},2e3)},s.src=n.res})});