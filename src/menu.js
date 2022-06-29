$(function(){
    $('.start').click(function(){
        location.reload()
        return false
    })

    $('.rematch').click(function(){
        $('.score-points > span').html(0)
        $('.score-games > span').html(0)
    })
})