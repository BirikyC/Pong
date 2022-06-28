$(function(){
    $('input[type="number"]').change(function(){
        if(this.value > 99) this.value = 99
    })
})

$(function(){
    let colors = ['White', 'Green', 'Blue', 'Red']
    let rgb = ['rgb(255, 255, 255)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(255, 0, 0)']
    let actColor = 0

    $('.color').click(function(){
        changeText(this, actColor, colors)
        
        $('.text').css({color: rgb[actColor]})
        console.log(actColor)
    })

    const bgColors = ['Black', 'White']
    const themes = ['Dark', 'Light']
    let actTheme = 0

    $('.theme').click(function(){
        changeText(this, actTheme, themes)
        
        if(actTheme === 0){
            colors[0] = 'White'
            rgb[0] = 'rgb(255, 255, 255)'
        }
        else{
            colors[0] = 'Black'
            rgb[0] = 'rgb(0, 0, 0)'
        }

        $('body').css({backgroundColor: bgColors[actTheme]})

        if(actColor != 0) return

        $('.color').html(colors[actColor])
        $('.text').css({color: rgb[actColor]})
    })
})

function changeText(name, num, list){
    num++
    if(num >= list.length) num = 0

    $(name).html(list[num])
    return num
}