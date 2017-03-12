document.addEventListener('DOMContentLoaded', function () {

    function audioAutoPlay() {
        var audio = document.getElementById('bg-music');
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
    }
    audioAutoPlay();

});

$(function(){


    var audio = $('#bg-music')[0];
    var audio1 = $('#audio1')[0];
    var audio2 = $('#audio2')[0];
    $('body, #loading, #s1t5, #scene1').one('touchstart', function(){

        audio1.load()
        // audioA.volume = 0.1
        // audio1.play();
        audio2.load()
        // audioB.volume = 0.1
        // audio2.play();

    });
    // 禁用默认的屏幕拖动事件，防止页面上下窜动，和左右滑动翻页
    $('body').on('touchmove', function(event){

            event.preventDefault();
            event.stopPropagation();
            return false;

    });


    var CW = document.body.clientWidth;
    var CH = document.body.clientHeight;

    if(CH > CW){

        $('.scene').css({

            height: CH + 'px'

        })

    }

    console.log(CW, CH);
    var INTERVAL = 1000;
    var canvas = $('#canvas')[0];
    canvas.width = CW;
    canvas.height = CH;
    var context = canvas.getContext('2d');
    var frozenCover = new Image;
    frozenCover.src = './res/hand.jpg';
    frozenCover.onload = function(){
        var imageWidth = frozenCover.width;
        var imageHeight = frozenCover.height;

        var w = CW * imageHeight / CH;

        context.drawImage(frozenCover, (imageWidth - w)/2, 0, w, imageHeight, 0, 0,CW, CH);
        context.globalCompositeOperation = 'destination-out';

        $(canvas).on('touchstart', function(event){
            event.preventDefault();
            event.stopPropagation();

            // audio.pause();
            audio1.pause();
            // audio1.play();

        });
        $(canvas).on('touchmove', function(event){
            event.preventDefault();
            event.stopPropagation();

            // audio.pause();
            // audio1.play();
            var x = event.touches[0].clientX;
            var y = event.touches[0].clientY;
            context.beginPath();
            context.arc(x, y, 30, 0, Math.PI * 2,true);
            context.fill();
        });

        $(canvas).on('touchend', function(event){

            event.preventDefault();
            event.stopPropagation();

            console.log('wh', CW * CH);
            console.log('wh', CW * CH * 0.2);

            var data = context.getImageData(0,0,CW,CH).data;  
             
            for(var i=0,j=0;i<data.length;i+=4){
                if(data[i] && data[i+1] && data[i+2] && data[i+3]){
                    j++;
                }
            }

            console.log('j', j);
            //当图层被擦除剩余80%时触发
            if(j <= CW * CH * 0.8){

                $(canvas).hide();

                audio1.pause();
                audio2.play();

                var sa3 = new ScrollAction($('#scene3'), function(){
                    goto(3);
                    animate3();

                    var sa4 = new ScrollAction($('#s4t1,#s4t2'), function(){}, function(){
                        goto(2);
                    });
                    sa4.listen();

                }, function(){
                    // goto(1);
                });
                sa3.listen();

            }

        });

    }

    $('form').css({

        width: 320 * CH / 568,
        'margin-left': - 320 * CH / 568/ 2 + 'px'

    })

    $('#sex').on('focus', function(){
        $('#sex-select').focus();
    })

    $('#age').on('focus', function(){
        $('#age-select').focus();
    });
    $('#sex-select').on('change', function(){
        $('#sex').val($('#sex-select').val() == 1? '男': '女');
    });
    $('#age-select').on('change', function(){
        $('#age').val($('#age-select').val());
    });

    $('#submit').on('touchend', function(){

        var username = $('#username').val();
        var phone = $('#phone').val();
        var age = $("#age-select").val();
        var sex = $('#sex-select').val();

        var phoneReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(username == '' || phone == ''){

            $('#error').show();

            return;

        }else if(!phoneReg.test(phone)){

            $('#wrong').show();
            return;

        }else{

            $('#request').show();
            $.ajax({
                url: '/info',
                type: 'post',
                data: {
                    username: username,
                    phone: phone,
                    sex: sex,
                    age: age
                },
                success: function(res){

                    $('#request').hide();
                    if(res.success){
                        $('#form').hide();
                        $('#s4t2').hide();
                        $('#success').show();

                    }else{

                        $('#form').hide();
                        $('#s4t2').hide();
                        $('#expire').show();

                    }

                }

            });

        }

        // console.log(username, phone, sex, age);

    });

    $('.back').on('touchend', function(){

        $('.result').hide();
    })
    window.goto = function(index){

        var top = 0;
        if(index){
            // top =  - index + '00%';
            top =  - index * CH + 'px';
        }
        $('#main').css({
            top: top
        })

    }

    window.froze = function(){
        $('#froze').css({
            'background-image': 'url(res/froze.gif)'
        })
    }

    function removeLoading() {

        $('#loading').css({
            opacity: 0
        });

        setTimeout(function(){

            $('#loading').hide();

        }, 1000);

    }

    function animate0(){

        setTimeout(function(){

            $('#s1t1').css({

                left: 0,
                opacity: 1

            })

            setTimeout(function(){

                $('#s1t4').css({

                    left: 0,
                    opacity: 1

                });

                setTimeout(function(){

                    $('#s1t5').css({

                        opacity: 1

                    });
                    var sa1 = new ScrollAction($('#s1t5'), function(){
                        goto(1);
                        animate1();
                    });
                    sa1.listen();

                });

            }, INTERVAL);

        }, INTERVAL);


    }

    function animate1(){

        setTimeout(function(){

            $('#s2t1').css({

                left: 0,
                opacity: 1

            })

            setTimeout(function(){

                $('#s2t4').css({

                    left: 0,
                    opacity: 1

                });

                setTimeout(function(){

                    $('#s2t5').css({

                        opacity: 1

                    });
                    var sa2 = new ScrollAction($('#s2t5'), function(){
                        goto(2);
                        animate2();
                    }, function(){
                        goto(0);
                    });
                    sa2.listen();

                }, INTERVAL);

            }, INTERVAL);

        }, INTERVAL);

    }

    function animate2(){

        setTimeout(function(){

            $('#s3t1').css({

                left: 0,
                opacity: 1

            })
            setTimeout(function(){

                $('#s3t4').css({

                    left: 0,
                    opacity: 1

                });
                $('#froze').one('touchstart', function(event){

                    event.preventDefault();
                    event.stopPropagation();

                // })；

                // setTimeout(function(){

                    audio.pause();
                    audio1.play();

                    $('#froze').css({

                        'background-image': 'url(res/froze.gif)'

                    });

                    setTimeout(function(){

                        $('#canvas').show();
                        $('#s3t1').hide();
                        $('#s3t2').hide();
                        $('#s3t3').hide();
                        $('#s3t4').hide();
                        $('#froze').hide();
                        $('#scene3').css({

                            'background-image': 'url(res/poster.gif)'

                        });

                    }, 5000)

                });
                // }, INTERVAL);

            }, INTERVAL);

        }, INTERVAL);

    }

    function animate3(){

        setTimeout(function(){

            $('#s4t2').css({

                left: 0,
                opacity: 1

            })

            setTimeout(function(){

                $('#start-btn').on('touchend', function(){

                    $('#form').show();

                });

            }, INTERVAL);

        }, INTERVAL);

    }

    function ScrollAction(elm, next, prev){
        this.y0 = 0;
        this.yt = 0;
        this.next = next;
        this.prev = prev;
        this.elm = elm;
    }

    ScrollAction.prototype.listen = function(){

        var self = this;
        this.elm.on('touchstart', function(event){

            event.preventDefault();
            event.stopPropagation();

            // 开始滑动记录原始位置
            self.y0 = event.touches[0].clientY;

        }).on('touchmove', function(){

            event.preventDefault();
            event.stopPropagation();

            // 滑动中记录最终位置
            self.yt = event.touches[0].clientY;

        }).on('touchend', function(){

            event.preventDefault();
            event.stopPropagation();

            // 执行翻页
            if(self.yt > self.y0){

                // typeof self.next == 'function' && self.next();
                typeof self.prev == 'function' && self.prev();

            }else if(self.yt < self.y0){

                // typeof self.prev == 'function' && self.prev();
                typeof self.next == 'function' && self.next();

            }else{


            }

            self.y0 = 0;
            self.yt = 0;

        });

    }



    var resList = {

        pic: [{
            id: '#scene1',
            res: 'res/bg1.jpg'
        },{
            id: '#scene2',
            res: 'res/bg2.jpg'
        },{
            id: '#scene3',
            res: 'res/bg3.jpg'
        },{
            id: '#scene4',
            res: 'res/map.jpg'
        },{
            id: '#s1t1',
            res: 'res/bt1.png'

        },{
            id: '#s1t4',
            res: 'res/wrinkle.jpg'

        },{
            id: '#s2t1',
            res: 'res/bt2.png'
        },{
            id: '#s2t4',
            res: 'res/s2t4.png'
        },{
            id: '#s3t1',
            res: 'res/bt3.png'
        },{
            id: '#s3t3',
            res: 'res/s3t3.png'

        },{
            id: '#s3t4',
            res: 'res/s3t4.png'

        },{
            id: '#s4t2',
            res: 'res/map-btn.png'

        },{
            id: '#error',
            res: 'res/error.png'
        },{
            id: '#wrong',
            res: 'res/wrong-num.png'
        },{
            id: '#success',
            res: 'res/success.png'
        },{
            id: '#expire',
            res: 'res/expire.png'
        },{
            id: '#form',
            res: 'res/form.png'
        },{
            id: '#frozeGifVirt',
            res: 'res/froze.gif'

        },{
            id: '#canvasPic',
            res: 'res/hand.jpg'

        },{
            id: '#posterGifVirt',
            res: 'res/poster.gif'

        }]


    }

    var cache = {}, picReadyCnt = 0;

    resList.pic.forEach(function(item, index){

        var img = new Image()
        img.onload = function(){
            // console.log(index);
            picReadyCnt = picReadyCnt + 1;

            $(item.id).css({
                'background-image': 'url(' + item.res + ')'
            });

            if(picReadyCnt == resList.pic.length){

                setTimeout(function(){

                    // 结束loading，加载第一页
                    removeLoading();
                    animate0();

                }, 2000);

            }

        }

        img.src = item.res;

    })

    // removeLoading();
    // goto(3);
    // animate3();
});

