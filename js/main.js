$(function() {
  String.prototype.decodeHTML = function() {
    return $("<div>", {html: "" + this}).html();
  };

  var $viewContainer = $(".view-container"),
  
  init = function() {
    // Do this when a page loads.
    SVGJQ.setUpSvgs();
  },
  
  ajaxLoad = function(html) {
    document.title = html
      .match(/<title>(.*?)<\/title>/)[1]
      .trim()
      .decodeHTML();

    init();
  },
  
  loadPage = function(href, viewContainer) {
    viewContainer.fadeOut(250, function(){
      addSpinner($(this));
      $(this).load(href + " .view", function(data){
        $(this).fadeIn(250);
        ajaxLoad(data);
      });
    });
  },
  
  addSpinner = function(spinnerContainer){
    var $spinner = $("<div>");
    $spinner
      .addClass("spinner")
      .appendTo(spinnerContainer);
  },
  
  addAnimateAndLoad = function(href){
    loadPage(href, $viewContainer);
  };
  
  init();
  
  $(window).on("popstate", function(e) {
    if (e.originalEvent.state !== null) {
      loadPage(location.href, $viewContainer);
    } else {
      loadPage(location.href, $viewContainer);
    }
  });

  $(document).on("click", "a, area, .menu-item", function(e) {
    var href=  $(this).attr("href");

    if (href.indexOf(document.domain) > -1
      || href.indexOf(':') === -1)
    {
      history.pushState({}, '', href);
      e.preventDefault();
      addAnimateAndLoad(href);
      
      return false;
    }
  });
});