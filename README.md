# svelte-mail

> Renders [Svelte](https://svelte.dev) components for emails. Inlines styles and renders additional plain text version.

## Installation

Run `npm i --save svelte-mail`.

## Usage

Simply pass a Svelte component and some options:

*`./components/Mail.svelte`*

```html
<script>export let user;</script>

<style>strong { color: red }</style>

<strong>Hello, {user}</strong>
```

*`./sendMail.js`*
```javascript
import { renderMail } from 'svelte-mail';
import Mail from './components/Mail.svelte';

async function sendMail() {
  const { html, text } = await renderMail(Mail, { data: { user: 'World' } });

  /*
    `html` contains the rendered html string:
    "<strong style="color: red">Hello, World</strong>"

    `text` contains the rendered plain text message:
    "Hello, World"
  */

  // TODO: Send mail, e.g. using nodemailer...
}

sendMail()
  .catch(console.error);
```

**Note: The mail component must be compiled for server side rendering.**

## Options

This module uses only a

Internally, this module uses [juice](https://www.npmjs.com/package/juice) to inline styles and [html-to-text](https://www.npmjs.com/package/html-to-text) to render plain text messages. All options passed to the *renderMail* function will be passed to them:

```javascript
renderMail(Mail, {
  data: {},
  // add any juice options here, e.g.:
  extraCss: 'strong { text-decoration: underline }',
  // add any html-to-text options here, e.g.:
  uppercaseHeadings: false,
});
```
