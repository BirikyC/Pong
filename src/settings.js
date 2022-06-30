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
    const cookies = [getCookie('maxScore'), getCookie('maxGames'), getCookie('color'), getCookie('theme')]
    const path = [$('.maxScore > input'), $('.maxGames > input'), $('.color'), $('.theme')]

    for(let i=0; i<path.length-2; i++){
        if(typeof cookies[i] === 'undefined') continue
        $(path[i]).val(cookies[i])
    }
    for(let i=2; i<path.length; i++){
        if(typeof cookies[i] === 'undefined') continue
        $(path[i]).html(cookies[i])
    }
})

function getCookie(name) {
    const cookies = `; ${document.cookie}`;
    const parts = cookies.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

$(function(){
    let colors = ['White', 'Green', 'Blue', 'Red']
    let rgb = ['rgb(255, 255, 255)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(255, 0, 0)']
    let actColor = 0

    for(let i=0; i<colors.length; i++){
        if($('.color').text() == colors[i]){
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

    console.log('si')
    for(let i=0; i<bgColors.length; i++){
        if($('.theme').text() == themes[i]){
            actTheme = i
            $('body').css({backgroundColor: bgColors[actTheme]})
            if(actTheme == 1) colors[0] = 'Black'
            
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
        document.cookie = "theme="+themes[actTheme]

        if(actColor != 0) return

        $('.color').html(colors[actColor])
        $('.text').css({color: rgb[actColor]})
        document.cookie = "color="+colors[actColor]
    })
})

$(function(){
    $('.menu.after > .start').click(function(){
        location.reload()
        return false
    })
})