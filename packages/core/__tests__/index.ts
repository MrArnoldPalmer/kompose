/* eslint-env jest */
import {add} from "../src"

describe("Kompose Core", () => {
    describe("add", () => {
        it("passes", () => {
            expect(add(1, 1)).toEqual(2)
        })
    })
})
