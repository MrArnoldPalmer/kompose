/*
 * Util Types
 */
type tUnary<A, R> = (A) => R
type tBinary<A1, A2, R> = (A1, A2) => R
type tVariant<A extends any[], R> = (...args: A) => R

type tPartial = <A extends any[], R>(fn: tVariant<A, R>, args: any[]) => (...rest: any[]) => R
export const partial: tPartial = (fn, args) => (...argsRest) => fn(...args, ...argsRest)

type tPipe = {
    <V, R1>(fns: [tUnary<V, R1>], val: V): R1
    <V, R1, R2>(fns: [(arg: V) => R1, (arg: R1) => R2], val: V): R2
    <V, R1, R2, R3>(fns: [(arg: V) => R1, (arg: R1) => R2, (arg: R2) => R3], val: V): R3;
    <V, R1, R2, R3, R4>(fns: [(arg: V) => R1, (arg: R1) => R2, (arg: R2) => R3, (arg: R3) => R4], val: V): R4;
    <V, R1, R2, R3, R4, R5>(fns: [(arg: V) => R1, (arg: R1) => R2, (arg: R2) => R3, (arg: R3) => R4, (arg: R4) => R5], val: V): R5;
}
// type tPipe = <V, R>(fns: Array<tUnary<V, R>>, val: V) => R
export const pipe: tPipe = (fns, val) => fns.reduce((accum, fn) => fn(accum), val)
const x: number = pipe([(y: number): number => y + 1, (y: number): number => y + 1, (y: number): number => y + 1], 1);

export const compose = (fns, val) => fns.reduceRight((accum, fn) => fn(accum), val)