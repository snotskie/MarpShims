const MarpShims = (function(){
  const pub = {};
  // usage: create an anchor with href="javascript:MarpShims.toggleTheme()"
  pub.toggleTheme = function(){
    document.querySelectorAll('svg[data-marpit-svg] > foreignObject > section').forEach(
      (e) => e.classList.toggle('invert')
    );
  };

  // usage: call MarpShims.autoTheme() on load
  pub.autoTheme = function(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      pub.toggleTheme();
    }
  };

  // usage: call MarpShims.autoScale() on load. See README for css example
  pub.autoScale = function(){
    if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)){ // always on mobile
      document.querySelectorAll('svg[data-marpit-svg]').forEach(
        (e) => e.classList.add('fitscale');
      );
    } else {
      document.querySelectorAll('svg[data-marpit-svg]').forEach(
        (e) => e.classList.add('fixedscale');
    }
  };

  return pub;
})();
