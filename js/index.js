$(document).ready(function(){
    
    // * Phần scroll lên trên
    $(window).scroll(function(){

        if($("html,body").scrollTop()>200){
            $(".nutlen").addClass("hienthi");
            $(".header__nav").addClass("fixed-top")
        }
        else {
            $(".nutlen").removeClass("hienthi");
            $(".header__nav").removeClass("fixed-top")

        }
    })
    $(".nutlen").click(function(){
        $("html, body").animate({"scrollTop":0})
        return false;
    })
    // * Hết Phần scroll lên trên


});

// Tạo đối tượng sản phẩm từ localStorage





// Tạo đối tượng sản phẩm từ localStorage
