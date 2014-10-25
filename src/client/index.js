$('body').ready(function () {

  (Chart.defaults = {}).global = {
    responsive: true
  };

  document.title = Sfty.Config.title;

  // while initialisation is taking place
  React.renderComponent(Sfty.View.App({
    ready: false
  }), document.body);

  // initialisation promise
  var init = Sfty.Config.init();

  init.then(function () {
    
    // on success
    React.renderComponent(Sfty.View.App({
      ready: true
    }), document.body);
  
  }, function (err) {
  
    // on failure
    console.error(err.stack);
  
  });
});

