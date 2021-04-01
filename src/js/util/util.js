export const $ = selector => document.querySelector(selector)

export const $$ = selector => document.querySelectorAll(selector)

export const parseDomFromString = string => document.createRange()
        .createContextualFragment(string)

export const priorityNumberToString = priority => {
    if(priority === '1') return 'FIRST'
    if(priority === '2') return 'SECOND'
    return 'NONE'
}