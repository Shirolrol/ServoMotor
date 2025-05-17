/**
 * Jasmine 2.0 standalone `boot.js` modified for Karma.
 * This file is registered in `index.js`. This version
 * does not include `HtmlReporter` setup.
 */
;(function (global) {
  /* global jasmineRequire */
  'use strict'

  /**
   * Require Jasmine's core files. Specifically, this requires and
   * attaches all of Jasmine's code to the `jasmine` reference.
   */
  var jasmine = jasmineRequire.core(jasmineRequire)

  /**
   * Obtain the public Jasmine API.
   */
  var jasmineInterface = jasmineRequire.interface(jasmine, jasmine.getEnv())

  /**
   * Setting up timing functions to be able to be overridden.
   * Certain browsers (Safari, IE 8, PhantomJS) require this hack.
   */
  /* eslint-disable no-self-assign */
  global.setTimeout = global.setTimeout
  global.setInterval = global.setInterval
  global.clearTimeout = global.clearTimeout
  global.clearInterval = global.clearInterval
  /* eslint-enable no-self-assign */

  /**
   * Add all of the Jasmine global/public interface to the proper
   * global, so a project can use the public interface directly.
   * For example, calling `describe` in specs instead of
   * `jasmine.getEnv().describe`.
   */
  for (var property in jasmineInterface) {
    if (Object.prototype.hasOwnProperty.call(jasmineInterface, property)) {
      global[property] = jasmineInterface[property]
    }
  }
}(typeof window !== 'undefined' ? window : global))
teWithNewParam: function (key, value) {
            return queryString.navigateWithNewParam(key, value);
        },
        addToExistingQueryString: function (key, value) {
            return queryString.fullStringWithNewParam(key, value);
        },
        getContainer: function () {
            return document.body;
        },
        createElement: function () {
            return document.createElement.apply(document, arguments);
        },
        createTextNode: function () {
            return document.createTextNode.apply(document, arguments);
        },
        timer: new jasmine.Timer(),
        filterSpecs: filterSpecs
    });

    /**
     * The `jsApiReporter` also receives spec results, and is used by any environment that needs to extract the results  from JavaScript.
     */
    env.addReporter(jsApiReporter);
    env.addReporter(htmlReporter);

    /**
     * Filter which specs will be run by matching the start of the full name against the `spec` query param.
     * Don't override the specFilter unless the query param exists since it may be provided by external config.
     */
    var specQueryParam = queryString.getParam("spec")
    if (specQueryParam) {
        var specFilter = new jasmine.HtmlSpecFilter({
            filterString: function () {
                return specQueryParam;
            }
        });

        config.specFilter = function (spec) {
            return specFilter.matches(spec.getFullName());
        };
    }

    env.configure(config);

    /**
     * ## Execution
     *
     * Replace the browser window's `onload`, ensure it's called, and then run all of the loaded specs. This includes initializing the `HtmlReporter` instance and then executing the loaded Jasmine environment. All of this will happen after all of the specs are loaded.
     */
    htmlReporter.initialize();
})();
