const html = {
  /**
   * Create and return DOM element
   *
   * @param  {String}         htmlTag         HTML tag
   * @param  {String}         innerHTML       HTML text
   *         {Object}         DOM element
   *         {Array}          array of DOM elements
   * @param  {Object}         attrs           Attributes
   *                                          {
   *                                            id: 'example-id',
   *                                            class: [
   *                                              'example-class-1',
   *                                              'example-class-2'
   *                                              ]
   *                                          }
   * @param  {Object}         style           CSS style
   *                                          {
   *                                            display: 'block',
   *                                            top: '10px'
   *                                          }
   * @return {Object}         DOM element
   */
  tag(htmlTag, innerHTML, attrs, style) {
    let element;
    function addAttrs() {
      Object.keys(attrs).forEach((key) => {
        let valueStr;
        if (Array.isArray(attrs[key])) {
          valueStr = attrs[key].join(' ');
        } else {
          valueStr = attrs[key];
        }
        element.setAttribute(key, valueStr);
      });
    }

    function addChildren() {
      if (typeof innerHTML === 'string') {
        element.innerHTML = innerHTML;
        return;
      }
      if (innerHTML instanceof HTMLElement) {
        element.appendChild(innerHTML);
        return;
      }
      if (Array.isArray(innerHTML)) {
        innerHTML.forEach((value) => {
          if (value instanceof HTMLElement) {
            element.appendChild(value);
          }
        });
      }
    }

    function addStyles() {
      Object.keys(style).forEach((key) => {
        if (typeof style[key] === 'string') {
          element.style[key] = style[key];
        }
      });
    }

    /* BEGIN */

    if (typeof htmlTag === 'string') {
      element = document.createElement(htmlTag);
    } else {
      element = document.createElement('div');
    }

    if (typeof attrs === 'object') {
      addAttrs();
    }

    if (innerHTML) {
      addChildren();
    }

    if (typeof style === 'object') {
      addStyles();
    }

    return element;
  },

  /**
   * Create and return DOM element of link
   *
   * @param  {String}         innerHTML       HTML text
   *         {Object}         DOM element
   *         {Array}          array of DOM elements
   * @param  {String}         url             Web address
   * @param  {Object}         attrs           Attributes
   *                                          {
   *                                            id: 'example-id',
   *                                            class: [
   *                                              'example-class-1',
   *                                              'example-class-2'
   *                                              ]
   *                                          }
   * @param  {Object}         style           CSS style
   *                                          {
   *                                            display: 'block',
   *                                            top: '10px'
   *                                          }
   * @return {Object}         DOM element     Link element
   */
  a(innerHTML, url, attrs, style) {
    const element = html.tag('a', innerHTML, attrs, style);
    if (typeof url === 'string') {
      element.setAttribute('href', url);
    }
    return element;
  },
};

export default html;
