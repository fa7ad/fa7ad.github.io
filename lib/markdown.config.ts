import { defaultSchema } from 'rehype-sanitize'

export const sanitizationOptions = structuredClone(defaultSchema)

sanitizationOptions.tagNames ??= []
sanitizationOptions.attributes ??= {}
sanitizationOptions.attributes.a ??= []
sanitizationOptions.attributes['*'] ??= []

sanitizationOptions.allowComments = true
sanitizationOptions.tagNames.push('div', 'figure', 'figcaption')
sanitizationOptions.attributes.a.push('href', 'target', 'rel')
sanitizationOptions.attributes['*'].push('className', 'data*', 'data-*', 'aria*', 'line')
