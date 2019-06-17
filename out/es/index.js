import { juiceResources } from 'juice';
import { fromString } from 'html-to-text';

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
    juiceResources(`${css.code ? `<style>${css.code}</style>` : ''}${rawHtml}`, options, (err, result) => err ? reject(err) : resolve(result));
  });
  return {
    html,
    text: fromString(html, {
      ignoreImage: true,
      ...options
    })
  };
}

export { renderMail };
//# sourceMappingURL=index.js.map
