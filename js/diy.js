/*随机背景图片数组,图片可以换成图床链接，注意最后一条后面不要有逗号*/
var backimg =[
    "url(/img/rbg1.jpg)",
    "url(/img/rbg3.jpg)",
    "url(/img/rbg2.jpg)",
    "url(/img/bg.jpg)",
    ];
    /* //获取背景图片总数，生成随机数 */
    var bgindex =Math.ceil(Math.random() * (backimg.length-1));
    /* 重设背景图片 */
    document.getElementById("web_bg").style.backgroundImage = backimg[bgindex];
    /*重设banner图片*/
    document.getElementById("page-header").style.backgroundImage = backimg[bgindex];


let rmf = {};
rmf.showRightMenu = function(isTrue, x=0, y=0){
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top',x+'px').css('left',y+'px');

    if(isTrue){
        $rightMenu.show();
    }else{
        $rightMenu.hide();
    }
}
rmf.switchDarkMode = function(){
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};
rmf.switchReadMode = function(){
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn () {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}

//回到顶部
rmf.scrollToTop = function(){
    btf.scrollToDest(0, 500);
}

// 右键菜单事件
if(! (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
    window.oncontextmenu = function(event){
        $('.rightMenu-group.hide').hide();
        //如果有文字选中，则显示 文字选中相关的菜单项
        if(document.getSelection().toString()){
            $('#menu-text').show();
        }

        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if(pageX + rmWidth > window.innerWidth){
            pageX -= rmWidth+10;
        }
        if(pageY + rmHeight > window.innerHeight){
            pageY -= pageY + rmHeight - window.innerHeight;
        }



        rmf.showRightMenu(true, pageY, pageX);
        return false;
    };

    window.addEventListener('click',function(){rmf.showRightMenu(false);});
}