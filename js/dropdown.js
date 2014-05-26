/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#dropdowns
 * ============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict";


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element, options) {
        var $el = this.$el = $(element)
        this.options = getOptions($el, options)
        if (!$el.data("toggle")) {
          $el.attr("data-toggle", 'dropdown')
        }
        var trigger = this.options.trigger
            , $container = getContainer($el)
        if(trigger == 'click') {
          $el.on('click.dropdown.data-api', $.proxy(this.toggle, this))
          $('html').on(trigger + '.dropdown.data-api', function () {
            $container.removeClass('open')
          })
        } else if (trigger == 'hover') {
          $container.on('mouseover.dropdown.data-api', $.proxy(this.show, this))
          $container.on('mouseleave.dropdown.data-api', $.proxy(this.hide, this))
        }

        $container.find(".sui-dropdown-menu").on("click", 'a', $.proxy(this.setValue, this))
      }

    , getContainer = function($el) {
      var $parent = $el.parent()
      if ($parent.hasClass("dropdown-inner")) return $parent.parent()
      return $parent;
    }
    , getOptions = function ($el, options) {
      return $.extend({}, $.fn.dropdown.defaults, $el.data(), options)
    }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $el = this.$el
          , $parent
          , isActive

      if ($el.is('.disabled, :disabled')) return

      $parent = getParent($el)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          // if mobile we we use a backdrop because click events don't delegate
          $('<div class="dropdown-backdrop"/>').insertBefore($el).on('click', clearMenus)
        }
        $parent.toggleClass('open')
      }

      $el.focus()

      return false
    }

  , show: function() {
    getParent(this.$el).addClass("open")
  }
  , hide: function() {
    getParent(this.$el).removeClass("open")
  }

  , setValue: function(e) {
    var $target = $(e.currentTarget),
        $container = $target.parents(".sui-dropdown"),
        $menu = $container.find("[role='menu']")
    $container.find("input").val($target.attr("value") || "").trigger("change")
    $container.find(toggle + ' span').html($target.html())
    $menu.find(".active").removeClass("active")
    $target.parent().addClass("active")
  }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $('.dropdown-backdrop').remove()
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = getContainer($this)

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
        , options = typeof option == 'object' && option
      if (!data) $this.data('dropdown', (data = new Dropdown(this, options)))
      if (typeof option == 'string') data[option].call(data)
    })
  }

  $.fn.dropdown.Constructor = Dropdown

  $.fn.dropdown.defaults = $.extend({}, {
    trigger: 'click'  //click or hover
  })


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function() {
    $(toggle).each(function() {
      $(this).dropdown()
    })
  })


}(window.jQuery);
