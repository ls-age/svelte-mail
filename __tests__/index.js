import { renderMail } from '../src/index';
import SimpleTemplate from './fixtures/templates/SimpleTemplate';
import TemplateWithStyles from './fixtures/templates/WithStyles';

test('renders templates', async () => {
  const { html, text } = await renderMail(SimpleTemplate, { data: { user: 'Username' } });

  expect(html).toEqual('<strong>Hello, Username</strong>');
  expect(text).toBe('Hello, Username');
});

test('inlines styles', async () => {
  const { html } = await renderMail(TemplateWithStyles, { data: { user: 'Username' } });

  expect(html).toMatch(
    /^<strong .* style="color: red; text-decoration: underline;">Hello, Username<\/strong>$/
  );
});

test('passes options to juice', async () => {
  const { html } = await renderMail(SimpleTemplate, {
    data: { user: 'Username' },
    extraCss: 'strong { text-decoration: underline; }',
  });

  expect(html).toEqual('<strong style="text-decoration: underline;">Hello, Username</strong>');
});
