const { resolve } = require('path')
const merge = require('lodash/merge')

module.exports = function module (moduleOptions) {
  const defaults = {
    id: null,
    autotrack: {
      cleanUrlTracker: {
        stripQuery: true,
        indexFilename: 'index.html',
        trailingSlash: 'remove',
        queryDimensionIndex: 4
      },
      eventTracker: {
        events: ['click', 'auxclick', 'contextmenu']
      },
      impressionTracker: false,
      maxScrollTracker: {
        increaseThreshold: 10,
        maxScrollMetricIndex: 1
      },
      mediaQueryTracker: {
        definitions: [
          {
            name: 'Breakpoint',
            dimensionIndex: 1,
            items: [
              { name: 'xs', media: 'all' },
              { name: 'sm', media: '(min-width: 600px)' },
              { name: 'md', media: '(min-width: 900px)' },
              { name: 'lg', media: '(min-width: 1200px)' },
              { name: 'xl', media: '(min-width: 1800px)' }
            ]
          },
          {
            name: 'Pixel Density',
            dimensionIndex: 2,
            items: [
              { name: '1x', media: 'all' },
              { name: '1.5x', media: '(min-resolution: 144dpi)' },
              { name: '2x', media: '(min-resolution: 192dpi)' }
            ]
          },
          {
            name: 'Orientation',
            dimensionIndex: 3,
            items: [
              { name: 'landscape', media: '(orientation: landscape)' },
              { name: 'portrait', media: '(orientation: portrait)' }
            ]
          }
        ],
        changeTimeout: 3000
      },
      outboundFormTracker: false,
      outboundLinkTracker: {
        events: ['click', 'auxclick', 'contextmenu']
      },
      pageVisibilityTracker: {
        sendInitialPageview: true,
        pageLoadsMetricIndex: 2,
        visibleMetricIndex: 3
      },
      socialWidgetTracker: false,
      urlChangeTracker: false
    },
    pageTransitionTime: 800
  }
  const options = merge(
    {},
    defaults,
    this.options['ga-autotrack'],
    moduleOptions
  )

  // No matter you pass `id` or `ua`, both works
  if (options.ua) {
    options.id = options.ua
    delete options.ua
  }

  this.addPlugin({
    src: resolve(__dirname, '../templates/plugin.js'),
    options,
    ssr: false
  })
}
