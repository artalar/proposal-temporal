// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindate.prototype.add
features: [Symbol]
---*/

const instance = Temporal.PlainDate.from({ year: 2000, month: 5, day: 2 });
assert.throws(RangeError, () => instance.add(undefined), "undefined");
assert.throws(RangeError, () => instance.add(null), "null");
assert.throws(RangeError, () => instance.add(true), "boolean");
assert.throws(RangeError, () => instance.add(""), "empty string");
assert.throws(TypeError, () => instance.add(Symbol()), "Symbol");
assert.throws(RangeError, () => instance.add(7), "number");
assert.throws(RangeError, () => instance.add(7n), "bigint");
