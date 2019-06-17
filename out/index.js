'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var juice = require('juice');
var htmlToText = require('html-to-text');

/* eslint-disable import/prefer-default-export */
async function renderMail(Component, {
  data = {},
  ...options
} = {}) {
  const {
    html: rawHtml,
    css,
    head
  } = Component.render(data);

  if (head) {
    // eslint-disable-next-line no-console
    console.error('Rendering a document head is not supported');
  }

  const html = await new Promise((resolve, reject) => {
    juice.juiceResources(`${css.code ? `<style>${css.code}</style>` : ''}${rawHtml}`, options, (err, result) => err ? reject(err) : resolve(result));
  });
  return {
    html,
    text: htmlToText.fromString(html, {
      ignoreImage: true,
      ...options
    })
  };
}

exports.renderMail = renderMail;
//# sourceMappingURL=index.js.map
