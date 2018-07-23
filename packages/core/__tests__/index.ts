/* eslint-env jest */
import {compose, partial, pipe} from "../src"

const add = (x, y) => x + y
describe("Kompose Core", () => {
    describe("partial", () => {
        it("accepts an x arity function and an array of n args and returns a function with first n arguments applied with an x - n arity", () => {
            const subject = partial(add, [1])
            expect(subject(1)).toEqual(2)
        })
    })

    describe("pipe", () => {
        it("accepts an array of functions and a value and threads value through functions in order", () => {
            const subject = pipe([
                x => x + 1,
                x => x * x
            ], 2)
            expect(subject).toEqual(9)
        })
    })

    describe("compose", () => {
        it("accepts an array of functions and a value and threads value through functions in reverse order", () => {
            const subject = compose([
                x => x + 1,
                x => x *x
            ], 2)
            expect(subject).toEqual(5)
        })
    })
})
