/*
 * Util Types
 */
type tUnary<A, R> = (A) => R
type tBinary<A1, A2, R> = (A1, A2) => R
type tVariant<R> = (...args: any[]) => R
type tProp = string | number
type tPath = ReadonlyArray<tProp>

/*
 * apply
 */
type tApply = <A, R>(fn: (...args: any[]) => R, args: any[]) => R
export const apply = (fn, args) => fn(...args)

/*
 * partial
 */
type tPartial = <R>(fn: tVariant<R>, args: any[]) => (...rest: any[]) => R
export const partial: tPartial = (fn, args) => (...rest) => fn(...args, ...rest)

/*
 * reduce
 */
export const reduce = (fn, initialVal, arr) => arr.reduce(fn, initialVal)

/*
 * reduceRight
 */
export const reduceRight = (fn, initialVal, arr) =>
  arr.reduceRight(fn, initialVal)

/*
 * map
 */
export const map = (fn, arr) => arr.map(fn)

/*
 * filter
 */
export const filter = (fn, arr) => arr.filter(fn)

/*
 * pipe
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
  reduce((accum, fn) => fn(accum), val, fns)

/*
 * compose
 */
export const compose = (fns, val) =>
  reduceRight((accum, fn) => fn(accum), val, fns)

/*
 * get
 */
export const get = (key, val) => val[key]

/*
 * getIn
 */
export const getIn = (keys, val) =>
  reduce((accum, key) => get(key, accum), val, keys)

/*
 * assoc
 */
const assocArr = (key, val, arr) => Object.assign([...arr], {[key]: val})
const assocObj = (key, val, obj) => Object.assign({...obj}, {[key]: val})
export const assoc = (key, val, data) =>
  apply(Array.isArray(data) ? assocArr : assocObj, [key, val, data])

/*
 * assocIn
 */
type tAssocIn = <V, O>(path: tPath, val: V, obj: O) => O
export const assocIn: tAssocIn = ([key, ...rest], val, obj) =>
  assoc(key, rest.length ? assocIn(rest, val, obj[key]) : val, obj)

/*
 * contains
 */
export const contains = (val, arr) => arr.includes(val)

/*
 * append
 */
export const append = (val, arr) => [...arr, val]

/*
 * concat
 */
export const concat = (arr, val) => [...arr, ...val]

/*
 * remove
 */
export const remove = (val, arr) => filter(item => !equals(item, val), arr)

/*
 * toggleIn
 */
export const toggleIn = (val, arr) =>
  contains(val, arr) ? remove(val, arr) : append(val, arr)

/*
 * equals
 */
export const equals = (x, y) => x === y

/*
 * add
 */
export const add = (x, y) => x + y

/*
 * merge
 */
export const merge = (x, y) => ({...x, ...y})

/*
 * reverse
 */
export const reverse = x => [...x].reverse()
