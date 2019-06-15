/* eslint-disable import/prefer-default-export */

import { juiceResources, Options as JuiceOptions } from 'juice';
import { fromString as getPlainText } from 'html-to-text';

interface SvelteSSRComponent {
  render(data: {}): { html: string; css: { code: string }; head: string };
}

export async function renderMail(
  Component: SvelteSSRComponent,
  { data = {}, ...options }: { data?: {} } & JuiceOptions & HtmlToTextOptions = {}
): Promise<{
  html: string;
  text: string;
}> {
  const { html: rawHtml, css, head } = Component.render(data);

  if (head) {
    // eslint-disable-next-line no-console
    console.error('Rendering a document head is not supported');
  }

  const html: string = await new Promise((resolve, reject) => {
    juiceResources(
      `${css.code ? `<style>${css.code}</style>` : ''}${rawHtml}`,
      options,
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });

  return {
    html,
    text: getPlainText(html, { ignoreImage: true, ...options }),
  };
}
