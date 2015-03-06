$(document).ready(function() {

  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });

  Opentip.styles.tab = {
    target: true, // Takes the <a /> element as target
    tipJoint: "right",
    group: "tags", // Ensures that only one tag Opentip is visible
    fixed: true,
    background: [
      [0, "white"],
      [1, "gray"]
    ],
    borderWidth: false
  };

  Opentip.styles.project = {
    target: null,
    tipJoint: "bottom center",
    targetJoint: null,
    group: "tags",
    fixed: true,
    hideEffect: "fade",
    background: [
      [0, "white"],
      [1, "#CCD1D9"]
    ],
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#8CC152",
    stem: false,
    offset: [0, 0],
    className: "project-tip"
  }

  resize_height();

  $('a[href*=#]:not([href=#])').click(function() {
    var herodiv = $("#content");

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('#' + this.hash.slice(1));
      if (target.length) {
        herodiv.animate({
          scrollTop: (target.offset().top + herodiv.scrollTop())
        }, 1000);
        return false;
      }
    }
  });

  $(".opentip-hover").each(function(_, tabEle) {
    new Opentip(tabEle, $(tabEle).data("text"), {
      style: "tab"
    });
  });

  $(".project-img").hover(function() {
    $(this).find(".project-desc").fadeIn();
  }, function() {
    $(this).find(".project-desc").fadeOut();
  });

  $(".project-img").each(function(_, pEle) {
    new Opentip(pEle, constants.image_text[$(pEle).attr("id")].text, {
      style: "project"
    });
  });

  $(window).resize(function(){
    resize_height();
  });
});

function resize_height() {
  var height = $(window).innerHeight() - $("footer").innerHeight();
  var width = $(window).innerWidth();
  if (height < 300) {
    height = 300;
  }
  $("#content").height(height);
  $(".tabbable").height(height);

}
