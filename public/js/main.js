$(function(){

  var set = false;
  var browser;
  var hash = window.location.hash;

  var width = "auto";
  var height = "auto";

  // do action
  var action = function(link, width, height, refresh) {
    console.log(link);

    var prefix, checkhttp, uri;

    if (prefix) prefix = prefix;
    else if (link.substr(0, 7) == "http://")    prefix = "http://";
    else if (link.substr(0, 8) == "https://")   prefix = "https://";
    else                                        prefix = undefined;

    if (prefix) {
      url = link.split("/")[2];
      uri = link.split(url)[1];
    }
    else {
      url = link.split("/")[0];
      uri = link.split(url)[1];
      prefix = "http://";
    }

    if (uri == "") uri = "/";

    $(".url").html(prefix + '<div class="domain">' + url + "</div>" + uri).blur();

    if(refresh) {
      $(".frame").attr("src", $(".url").text());
    }

    if(width) {
      $(".browser").animate({
        width: width
      }, 300);
      width = width;
    } else width = "auto";

    if(height > 100) {
      $(".window").animate({
        height: height
      }, 300);
      height = height;
    } else height = "auto";

    if ($(".browser").width() < 480 || width < 480 || width == "auto")
      $(".tab.inactive").hide();
    else
      $(".tab.inactive").delay(200).slideDown();

    history.pushState({page: $(".url").text()},
      "iBrowsr", "#!/" + link + "|" + width + "|" + height + "|"
    );

    console.log(link);
  }

  // get link
  if(hash != "") {
    var uri = hash.split("#!/")[1];

    var link = uri.split("|")[0];
    var width = uri.split("|")[1] || "100%";
    var height = uri.split("|")[2] || browser;

    action(link, width, height, true);

    if (width > 100 && height > 100) {
      $(".custom").addClass("active").html("custom: " + width + "x" + height).siblings().removeClass("active");
      set = true;
    }
  }
  else {
    action($(".url").text(), width, height, true);
  }

  $(window).resize(function(){
    browser = $(this).height();

    if (set)
      console.log(set);
    else {
      if ($(".embeded").length > 0) {
        browser -= 75;
        $(".full_screen").attr("href", window.location.origin + '/#!/' + $(".url").text());
      }
      else
        browser -= 180;
      $(".window").height(browser);
    }
  });

  $(window).resize();

  $(document).on("keyup", ".url", function(e){
    var link = $(this).text();

    if(e.keyCode == 13) {
      action(link, width, height, true);
      return false;
    }
  });

  $(".refresh").click(function(){
    var url = $(".url").text();
    action(url, width, height, true);
  });

  $(".left").click(function(){
    history.back();
  });

  $(".right").click(function(){
    history.forward();
  });

  $(".footer nav a").click(function(){
    var size = $(this).text().split("×");
    $(this).addClass("active").siblings().removeClass("active");

    if ($(this).hasClass("custom")) {
      $(".fade, .cust").fadeIn();
      $(".em_width").val(320);
      $(".em_height").val(480);
      $(".fade").addClass("transparent");
    }
    else {
      width = parseInt(size[0]) || "100%";
      height = parseInt(size[1]) || browser;
      action($(".url").text(), width, height, false);
      $(".custom").html("custom");
    }

    if ($(this).hasClass("auto") || $(this).hasClass("custom")) set = false;
    else set = true;
  });

  $(".link").click(function(){
    $(".fade, .lnk").fadeIn();
    $(".em_width").val($(".browser").width());
    $(".em_height").val($(".window").height());
    $(".em_url").val($(".url").text());
  });

  $(".lnk").submit(function(){
    $(".em_link").fadeIn("fast").val(window.location).select();
  });
      
  $(".cust").submit(function(){
    width = $(".cust .em_width").val();
    height = $(".cust .em_height").val();

    action($(".url").text(), width, height, false);

    if (width > 100 && height > 100)
      $(".custom").html("custom: " + width + "x" + height);
    else 
      $(".custom").html("custom: not specified");

    $(".close").click();
    $(".fade").removeClass("transparent");
  });

  $(".embed").click(function(){
    $(".fade, .em").fadeIn();
    $(".em_width").val($(".browser").width());
    $(".em_height").val($(".window").height());
    $(".em_url").val($(".url").text());
  });

  $(".em").submit(function(){
    $(".em_code").fadeIn("fast").val('<iframe src="' + window.location.origin + '/embed/#!/' + $(".url").text() + '" width="' + $(".em_width").val() + '" height="' + $(".em_height").val() + '"  frameborder="0" scrolling="no"></iframe><br><a href="' + window.location + '" target="_blank">Change resolution</a>').select();
  });

  $(".em_code").click(function(){
    $(this).select();
  });

  $(".credits").click(function(){
    $(".fade, .cred").fadeIn();
  });

  $(".contact").click(function(){
    $(".fade, .cont").fadeIn();
  });

  $(".close").click(function(){
    $(".fade, .popup, .em_link, .em_code").fadeOut();
  });


  var e = document.getElementById("fullscrn");
  var b = document.getElementById("body");

  e.onclick = function() {
    if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
      RunPrefixMethod(document, "CancelFullScreen");
    }
    else {
      RunPrefixMethod(b, "RequestFullScreen");
    }

    $(".tab.inactive").hide();
  }

  var pfx = ["webkit", "moz", "ms", "o", ""];
  function RunPrefixMethod(obj, method) {
    
    var p = 0, m, t;
    while (p < pfx.length && !obj[m]) {
      m = method;
      if (pfx[p] == "") {
        m = m.substr(0,1).toLowerCase() + m.substr(1);
      }
      m = pfx[p] + m;
      t = typeof obj[m];
      if (t != "undefined") {
        pfx = [pfx[p]];
        return (t == "function" ? obj[m]() : obj[m]);
      }
      p++;
    }
  }

});










