import { defaultSchema } from 'hast-util-sanitize/lib/schema'
import concat from 'ramda/es/concat'
import mergeDeepWith from 'ramda/es/mergeDeepWith'
/**
 * @type {import('remark-html').ExtraOptionsFields['sanitize']}
 */
const customSchema = {
  allowComments: true,
  tagNames: ['div', 'figure', 'figcaption'],
  attributes: {
    '*': ['className', 'data*', 'data-*', 'aria*', 'line'],
    a: ['href', 'target', 'rel']
  }
}

export const sanitize = mergeDeepWith(concat, defaultSchema, customSchema)
