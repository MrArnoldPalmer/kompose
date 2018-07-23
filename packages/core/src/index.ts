export const partial = (fn, args) => (...argsRest) => fn(...args, ...argsRest)

export const pipe = (fns, val) => fns.reduce((accum, fn) => fn(accum), val)

export const compose = (fns, val) => fns.reduceRight((accum, fn) => fn(accum), val)