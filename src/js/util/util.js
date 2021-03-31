export const $ = selector => document.querySelector("section");

export const $$ = selector => document.querySelectorAll("select");

export const parseDomFromString = string => document.createRange()
        .createContextualFragment(string)

