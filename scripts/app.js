// Scrolls to the selected menu item on the page ONLY INSIDE THE HERO DIV
$(document).ready(function() {
    Opentip.styles.tab = {
      target: true, // Takes the <a /> element as target
      tipJoint: "right", // So the tooltip floats above the link
      group: "tags", // Ensures that only one tag Opentip is visible
      fixed: true,
      background: [ [ 0, "white" ], [ 1, "gray" ] ],
      borderWidth: false
    };

    Opentip.styles.project = {
      target: "#project-view",
      tipJoint: "bottom",
      group: "tags",
      fixed: true,
      hideEffect: "fade",
      background: [ [ 0, "white" ], [ 1,  "#CCD1D9"] ],
      borderWidth: 2,
      borderRadius: 10,
      borderColor: "#48CFAD",
      stem: false,
      offset: [0, 0],
      className: "project-tip"
    }

    resize_height();

    $('a[href*=#]:not([href=#])').click(function() {
        var herodiv = $("#content");

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('#'+this.hash.slice(1));
            if (target.length) {
                herodiv.animate({
                    scrollTop: (target.offset().top + herodiv.scrollTop())*0.9
                }, 1000);
                return false;
            }
        }
    });

    $(".opentip-hover").each(function(_, tabEle) {
        new Opentip(tabEle, $(tabEle).data("text"), { style: "tab" });
    });

    $(".project-img").hover(function(){
      $(this).find(".project-desc").fadeIn();
    }, function(){
      $(this).find(".project-desc").fadeOut();
    });

    $(".project-img").each(function(_, pEle){
        new Opentip(pEle, constants.image_text[$(pEle).attr("id")].text, {style:"project"});
    });
});

function resize_height(){
    var height = $(window).innerHeight()-$("footer").innerHeight();
    if(height < 300){
        height = 300;
    }
    $("#content").height(height);
    $(".tabbable").height(height);
}
$(window).resize(resize_height());

