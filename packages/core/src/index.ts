/*
 * Util Types
 */
type tUnary<A, R> = (A) => R
type tBinary<A1, A2, R> = (A1, A2) => R
type tVariant<R> = (...args: any[]) => R
type tProp = string | number
type tPath = ReadonlyArray<tProp>

/*
 * Apply
 */
type tApply = <A, R>(fn: (...args: any[]) => R, args: any[]) => R
export const apply = (fn, args) => fn(...args)

/*
 * Partial
 */
type tPartial = <R>(fn: tVariant<R>, args: any[]) => (...rest: any[]) => R
export const partial: tPartial = (fn, args) => (...rest) => fn(...args, ...rest)

/*
 * Pipe
 */
type tPipe = {
  <V, R1>(fns: [tUnary<V, R1>], val: V): R1
  <V, R1, R2>(fns: [(arg: V) => R1, (arg: R1) => R2], val: V): R2
  <V, R1, R2, R3>(
    fns: [(arg: V) => R1, (arg: R1) => R2, (arg: R2) => R3],
    val: V
  ): R3
  <V, R1, R2, R3, R4>(
    fns: [(arg: V) => R1, (arg: R1) => R2, (arg: R2) => R3, (arg: R3) => R4],
    val: V
  ): R4
  <V, R1, R2, R3, R4, R5>(
    fns: [
      (arg: V) => R1,
      (arg: R1) => R2,
      (arg: R2) => R3,
      (arg: R3) => R4,
      (arg: R4) => R5
    ],
    val: V
  ): R5
}
// type tPipe = <V, R>(fns: Array<tUnary<V, R>>, val: V) => R
export const pipe: tPipe = (fns, val) =>
  fns.reduce((accum, fn) => fn(accum), val)

/*
 * Compose
 */
export const compose = (fns, val) =>
  fns.reduceRight((accum, fn) => fn(accum), val)

export const map = (fn, arr) => arr.map(fn)
export const filter = (fn, arr) => arr.filter(fn)
export const reduce = (fn, initialVal, arr) => arr.reduce(fn, initialVal)

export const get = (key, val) => val[key]
export const getIn = (keys, val) =>
  reduce((accum, key) => get(key, accum), val, keys)

const assocArr = (key, val, arr) => Object.assign([...arr], { [key]: val })
const assocObj = (key, val, obj) => Object.assign({ ...obj }, { [key]: val })
export const assoc = (key, val, data) =>
  apply(Array.isArray(data) ? assocArr : assocObj, [key, val, data])

type tAssocIn = <V, O>(path: tPath, val: V, obj: O) => O
export const assocIn: tAssocIn = ([key, ...rest], val, obj) =>
  assoc(key, rest.length ? assocIn(rest, val, obj[key]) : val, obj)

export const contains = (val, arr) => arr.includes(val)
export const append = (val, arr) => [...arr, val]
export const concat = (arr, val) => [...arr, ...val]
export const remove = (val, arr) => filter(item => !equals(item, val), arr)
export const equals = (x, y) => x === y
export const toggleIn = (val, arr) =>
  contains(val, arr) ? remove(val, arr) : append(val, arr)

export const add = (x, y) => x + y

export const merge = (x, y) => ({ ...x, ...y })
export const reverse = x => x.reverse()
