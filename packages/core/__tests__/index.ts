import * as K from "../src/index"

describe("Utils", () => {
  describe("apply", () => {
    it("applies an array of arguments to a function", () => {
      const subject = K.apply((x, y, z) => [x, y, z], [1, 2, 3])
      expect(subject).toEqual([1, 2, 3])
    })
  })

  describe("partial", () => {
    it("accepts an 'x' arity function and an array of 'n' arguments and returns a new function accepting 'x - n' arguments applying them all to the original function", () => {
      const subject = K.partial((w, x, y, z) => [w, x, y, z], [0, 1])
      expect(subject).toBeInstanceOf(Function)
      expect(subject(2, 3)).toEqual([0, 1, 2, 3])
    })
  })

  describe("map", () => {
    it("applies a function to each item in an array returning a new array from the resulting values", () => {
      const subject = K.map(x => x * x, [1, 2, 3])
      expect(subject).toEqual([1, 4, 9])
    })
  })

  describe("filter", () => {
    it("applies a predicate function to each item in an array and returns a new array with the values which pass the predicate", () => {
      const subject = K.filter(x => x > 3, [1, 2, 3, 4, 5, 6])
      expect(subject).toEqual([4, 5, 6])
    })
  })

  describe("reduce", () => {
    it("applies a function to an accumulated value and each item in an array from left to right, accumulator initial value is specified", () => {
      const subject = K.reduce((a, x) => `${a}${x}`, 0, [1, 2, 3])
      expect(subject).toEqual("0123")
    })
  })

  describe("reduceRight", () => {
    it("applies a function to an accumulated value and each item in an array from right to left, accumulator initial value is specified", () => {
      const subject = K.reduceRight((a, x) => `${a}${x}`, 4, [1, 2, 3])
      expect(subject).toEqual("4321")
    })
  })

  describe("pipe", () => {
    it("threads a value through an array of unary functions from left to right", () => {
      const subject: number = K.pipe(
        [(x: number): number => x + 1, (x: number): number => x * 2],
        1
      )
      expect(subject).toEqual(4)
    })
  })

  describe("compose", () => {
    it("threads a value through an array of unary functions from right to left", () => {
      const subject = K.compose(
        [x => x + 1, x => x * 2],
        1
      )
      expect(subject).toEqual(3)
    })
  })

  describe("get", () => {
    it("accepts a string key and an object and returns the value at that key", () => {
      const subject = K.get("key", {key: "VALUE"})
      expect(subject).toEqual("VALUE")
    })

    it("accepts an integer and an array and returns the value at that index", () => {
      const subject = K.get(1, [0, "VALUE"])
      expect(subject).toEqual("VALUE")
    })
  })

  describe("getIn", () => {
    it("accepts an array of string keys and returns the corresponding nested value inside an object", () => {
      const subject = K.getIn(["x", "y", "z"], {x: {y: {z: "VALUE"}}})
      expect(subject).toEqual("VALUE")
    })

    it("accepts an array of integers and returns the corresponding nested value inside an array", () => {
      const subject = K.getIn([0, 1, 2], [[0, [0, 1, "VALUE"]]])
      expect(subject).toEqual("VALUE")
    })

    it("accepts an array of string keys and integers and returns the corresponding value inside a complex data structure", () => {
      const subject = K.getIn(["x", 0, "y", 1], {x: [{y: [0, "VALUE"]}]})
      expect(subject).toEqual("VALUE")
    })
  })

  describe("assoc", () => {
    it("accepts a string key, a value, and an object and returns a new object with the objects key associated with the new value", () => {
      const subject = K.assoc("x", "VALUE", {x: "ORIGINAL"})
      expect(subject).toEqual({
        x: "VALUE"
      })
    })

    it("accepts an integer, a value, and an array and returns a new array with the index associated with the new value", () => {
      const subject = K.assoc(1, "VALUE", [0, "ORIGINAL"])
      expect(subject).toEqual([0, "VALUE"])
    })
  })

  describe("assocIn", () => {
    it("accepts an array of string keys, a value, and an object and returns a new object with the nested value associated with the nested keys", () => {
      const subject = K.assocIn(["x", "y", "z"], "VALUE", {
        x: {y: {z: "ORIGINAL"}}
      })
      expect(subject).toEqual({
        x: {
          y: {
            z: "VALUE"
          }
        }
      })
    })

    it("accepts an array of integers, a value, and an array and returns a new array with the nested value asssociated with the nested indices", () => {
      const subject = K.assocIn([0, 1, 2], "VALUE", [[0, [0, 1, "ORIGINAL"]]])
      expect(subject).toEqual([[0, [0, 1, "VALUE"]]])
    })

    it("accepts an array of mixed string keys and integers, a value, and an array and returns a new complex data structure with the value associated with the nested path", () => {
      const subject = K.assocIn(["x", 0, "y", 1], "VALUE", {
        x: [{y: [0, "ORIGINAL"]}]
      })
      expect(subject).toEqual({x: [{y: [0, "VALUE"]}]})
    })
  })

  describe("contains", () => {
    it("accepts a value and an array and returns true if the value is an element in the array", () => {
      const subject = K.contains("x", ["x", "y"])
      expect(subject).toBe(true)
    })

    it("accepts a value and an array and returns false if the value is not an element in the array", () => {
      const subject = K.contains("z", ["x", "y"])
      expect(subject).toBe(false)
    })
  })

  describe("append", () => {
    it("accepts a value and an array and returns a new array with the value appended to the original", () => {
      const subject = K.append("VALUE", ["ORIGINAL"])
      expect(subject).toEqual(["ORIGINAL", "VALUE"])
    })
  })

  describe("concat", () => {
    it("accepts two arrays and returns a new array with the elements of the second appended to the first", () => {
      const subject = K.concat([1, 2, 3], [4, 5, 6])
      expect(subject).toEqual([1, 2, 3, 4, 5, 6])
    })
  })

  describe("remove", () => {
    it("accepts a value and an array and returns a new array with any of the values removed from the original", () => {
      const subject = K.remove(1, [1, 2, 3])
      expect(subject).toEqual([2, 3])
    })
  })

  describe("toggleIn", () => {
    it("appends a value to an array if it is not already present", () => {
      const subject = K.toggleIn("VALUE", ["ORIGINAL"])
      expect(subject).toEqual(["ORIGINAL", "VALUE"])
    })

    it("removes a value from an array if it is already an element", () => {
      const subject = K.toggleIn("VALUE", ["ORIGINAL", "VALUE"])
      expect(subject).toEqual(["ORIGINAL"])
    })
  })

  describe("equals", () => {
    it("returns true if both arguments are strictly (===) equal", () => {
      const subject = K.equals("1", "1")
      expect(subject).toBe(true)
    })
  })

  describe("add", () => {
    it("accepts two numbers and returns the sum", () => {
      const subject = K.add(1, 2)
      expect(subject).toEqual(3)
    })
  })

  describe("merge", () => {
    it("accepts two objects and returns a single object with properties merged between the two", () => {
      const subject = K.merge({x: "x"}, {y: "y"})
      expect(subject).toEqual({x: "x", y: "y"})
    })
  })

  describe("reverse", () => {
    it("accepts and array and returns a new array with elements reversed", () => {
      const input = [1, 2, 3]
      const subject = K.reverse(input)
      expect(input).toEqual([1, 2, 3])
      expect(subject).toEqual([3, 2, 1])
    })
  })
})
