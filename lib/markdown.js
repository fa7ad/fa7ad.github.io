import { unified } from 'unified'
import html from 'remark-html'
import parse from 'remark-parse'
import prism from 'remark-prism'
import stringify from 'remark-stringify'
import gfm from 'remark-gfm'

// #region sanitizationconfig
const sanitize = {
  allowComments: true,
  attributes: {
    a: ['href'],
    img: ['src', 'longDesc'],
    input: [
      ['type', 'checkbox'],
      ['disabled', true]
    ],
    li: [['className', 'task-list-item']],
    div: ['itemScope', 'itemType'],
    blockquote: ['cite'],
    del: ['cite'],
    ins: ['cite'],
    q: ['cite'],
    '*': [
      'abbr',
      'accept',
      'acceptCharset',
      'accessKey',
      'action',
      'align',
      'alt',
      'ariaDescribedBy',
      'ariaHidden',
      'ariaLabel',
      'ariaLabelledBy',
      'axis',
      'border',
      'cellPadding',
      'cellSpacing',
      'char',
      'charOff',
      'charSet',
      'checked',
      'className',
      'clear',
      'cols',
      'colSpan',
      'color',
      'compact',
      'coords',
      'data*',
      'data-*',
      'dateTime',
      'dir',
      'disabled',
      'encType',
      'htmlFor',
      'frame',
      'headers',
      'height',
      'hrefLang',
      'hSpace',
      'isMap',
      'id',
      'label',
      'lang',
      'maxLength',
      'media',
      'method',
      'multiple',
      'name',
      'noHref',
      'noShade',
      'noWrap',
      'open',
      'prompt',
      'readOnly',
      'rel',
      'rev',
      'rows',
      'rowSpan',
      'rules',
      'scope',
      'selected',
      'shape',
      'size',
      'span',
      'start',
      'summary',
      'tabIndex',
      'target',
      'title',
      'type',
      'useMap',
      'vAlign',
      'value',
      'vSpace',
      'width',
      'itemProp'
    ]
  }
}
// #endregion

export default async function renderMarkdown(markdown) {
  const result = await unified().use(parse).use(gfm).use(stringify).use(prism).use(html, { sanitize }).process(markdown)
  return result.toString()
}
