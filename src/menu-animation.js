$(function(){
    const hide = 'hide'
    const hideAni = 'hide-animation'
    const aniTime = 1900
    
    $('.settings.text').click(function(e){
        if(typeof($('.menu.settings.hide')[0]) === 'undefined') return

        $('.menu.start').addClass(hideAni)
        setTimeout(clearStart, aniTime)
        $('.menu.settings').removeClass(hide)
    })

    $('.back > span').click(function(){
        if(typeof($('.menu.start.hide')[0]) === 'undefined') return

        $('.menu.settings').addClass(hideAni)
        setTimeout(clearSettings, aniTime)
        $('.menu.start').removeClass(hide)
    })
})

function clearStart(){
    $('.menu.start').addClass('hide').removeClass('hide-animation')
}

function clearSettings(){
    $('.menu.settings').addClass('hide').removeClass('hide-animation')
}