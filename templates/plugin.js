export default async ({ app }) => {
  /*
  ** Include Google Analytics Script
  */
  /* eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /* eslint-enable */
  /* global ga */

  /*
  ** Set the current page
  */
  ga('create', '<%= options.id %>', 'auto')

  /**
   * Register autotrack plugins
   */
  const dynamicImports = []
  <% _.each(options.autotrack, function (value, key) { %>
    <% if (value) { %>
      // import the module, transform name to kebab-case
      dynamicImports.push(
        import('autotrack/lib/plugins/<%= _.kebabCase(key) %>')
      )
    <% } %>
  <% }) %>
  await Promise.all(dynamicImports)

  <% _.each(options.autotrack, function (value, key) { %>
    <% if (value) { %>
      // register to ga
      ga('require', '<%= key %>', <%= serialize(value) %>)
    <% } %>
  <% }) %>

  /*
  ** Every time the route changes (fired on initialization too)
  */
  app.router.afterEach(to => {
    setTimeout(() => {
      /*
      ** We tell Google Analytics to add a `pageview`
      */
      ga('set', 'page', to.fullPath)
      // ga('send', 'pageview') // send via pageVisibilityTracker plugin
    }, <%= options.pageTransitionTime %>) // WTF
  })
}
