import { defaultSchema } from 'hast-util-sanitize/lib/schema'
import { concat, mergeDeepWith } from 'ramda'

/**
 * @type {import('remark-html').ExtraOptionsFields['sanitize']}
 */
const customSchema = {
  allowComments: true,
  tagNames: ['div', 'figure', 'figcaption'],
  attributes: {
    '*': ['className', 'data*', 'data-*', 'aria*']
  }
}

export const sanitize = mergeDeepWith(concat, defaultSchema, customSchema)
