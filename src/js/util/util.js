export const $ = selector => document.querySelector(selector)

export const $$ = selector => document.querySelectorAll(selector)

export const parseDomFromString = string => document.createRange()
        .createContextualFragment(string)
