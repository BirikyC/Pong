$(function(){
    const maxNum = 9
    $('input[type="number"]').change(function(){
        let path = this.parentNode.className.replace(' text', '')
        if(this.value > maxNum) this.value = maxNum
        else if(this.value < 1) this.value = 1

        document.cookie = path+"="+this.value
    })
})

$(function(){
    let colors = ['White', 'Green', 'Blue', 'Red']
    let rgb = ['rgb(255, 255, 255)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(255, 0, 0)']
    let actColor = 0

    for(let i=0; i<colors.length; i++){
        if($('.color').innerText == colors[i]){
            actColor = i
            $('.text').css({color: rgb[actColor]})
            break
        }
    }

    $('.color').click(function(){
        actColor++
        if(actColor >= colors.length) actColor = 0
        
        $(this).html(colors[actColor])
        $('.text').css({color: rgb[actColor]})
        
        document.cookie = "color="+colors[actColor]
    })

    const bgColors = ['Black', 'White']
    const themes = ['Dark', 'Light']
    let actTheme = 0

    for(let i=0; i<bgColors.length; i++){
        if($('.theme').innerText == bgColors[i]){
            actTheme = i
            $('body').css({backgroundColor: bgColors[actTheme]})
            break
        }
    }

    $('.theme').click(function(){
        actTheme++
        if(actTheme >= themes.length) actTheme = 0

        $(this).html(themes[actTheme])
        
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

        document.cookie = "color="+colors[actColor]
        document.cookie = "theme="+bgColors[actTheme]
    })
})

$(function(){
    $('.menu.after > .start').click(function(){
        location.reload()
        return false
    })
})