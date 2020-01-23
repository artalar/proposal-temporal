# Temporal.DateTime

A `Temporal.DateTime` represents a calendar date and wall-clock time, with a precision in nanoseconds, and without any time zone.
Of the `Temporal` classes carrying human-readable time information, it is the most general and complete one.
`Temporal.Date`, `Temporal.Time`, `Temporal.YearMonth`, and `Temporal.MonthDay` all carry less information and should be used when complete information is not required.

"Calendar date" and "wall-clock time" refer to the concept of time as expressed in everyday usage.
`Temporal.DateTime` does not represent an absolute, unique point in time; that is what `Temporal.Absolute` is for.

A `Temporal.DateTime` can be converted to a `Temporal.Absolute` using a `Temporal.TimeZone`.
A `Temporal.DateTime` can also be converted into any of the other `Temporal` objects that carry less information, such as `Temporal.Date` for the date or `Temporal.Time` for the time.

## Constructor

### **new Temporal.DateTime**(_isoYear_: number, _isoMonth_: number, _isoDay_: number, _hour_: number = 0, _minute_: number = 0, _second_: number = 0, _millisecond_: number = 0, _microsecond_: number = 0, _nanosecond_: number = 0, _disambiguation_: 'constrain' | 'balance' | 'reject' = 'constrain') : Temporal.DateTime

**Parameters:**
- `isoYear` (number): A year.
- `isoMonth` (number): A month, ranging between 1 and 12 inclusive.
- `isoDay` (number): A day of the month, ranging between 1 and 31 inclusive.
- `hour` (optional number): An hour of the day, ranging between 0 and 23 inclusive.
- `minute` (optional number): A minute, ranging between 0 and 59 inclusive.
- `second` (optional number): A second, ranging between 0 and 59 inclusive.
- `milliseconds` (optional number): A number of milliseconds, ranging between 0 and 999 inclusive.
- `microseconds` (optional number): A number of microseconds, ranging between 0 and 999 inclusive.
- `nanoseconds` (optional number): A number of nanoseconds, ranging between 0 and 999 inclusive.
- `disambiguation` (optional string): How to deal with out-of-range values of the other parameters.
  Allowed values are `constrain`, `balance`, and `reject`.
  The default is `constrain`.

**Returns:** a new `Temporal.DateTime` object.

Use this constructor if you have the correct parameters for the date already as individual number values, or you need the disambiguation behaviour.
Otherwise, `Temporal.DateTime.from()`, which accepts more kinds of input, is probably more convenient.

All values are given as reckoned in the [ISO 8601 calendar](https://en.wikipedia.org/wiki/ISO_8601#Dates).

The `disambiguation` parameter works as follows:
- In `constrain` mode (the default), any out-of-range values are clamped to the nearest in-range value.
- In `balance` mode, any out-of-range values are resolved by balancing them with the next highest unit.
- In `reject` mode, the presence of out-of-range values will cause the constructor to throw a `RangeError`.

> **NOTE**: Although Temporal does not deal with leap seconds, dates coming from other software may have a `second` value of 60.
> In the default `constrain` disambiguation mode, this will be converted to 59, and in `balance` mode, to 00 of the next minute.
> In `reject` mode, the constructor will throw, so if you have to interoperate with times that may contain leap seconds, don't use `reject`.

Usage examples:
```javascript
// Leet hour on pi day in 2020
datetime = new Temporal.DateTime(2020, 3, 14, 13, 37)  // => 2020-03-14T13:37

// Different disambiguation modes
datetime = new Temporal.DateTime(2001, 13, 1, 0, 0, 0, 0, 0, 0, 'constrain')  // => 2001-12-01T00:00
datetime = new Temporal.DateTime(2001, -1, 1, 0, 0, 0, 0, 0, 0, 'constrain')  // => 2001-01-01T00:00
datetime = new Temporal.DateTime(2001, 13, 1, 0, 0, 0, 0, 0, 0, 'balance')  // => 2002-01-01T00:00
datetime = new Temporal.DateTime(2001, -1, 1, 0, 0, 0, 0, 0, 0, 'balance')  // => 2000-11-01T00:00
datetime = new Temporal.DateTime(2001, 13, 1, 0, 0, 0, 0, 0, 0, 'reject')  // throws
datetime = new Temporal.DateTime(2001, -1, 1, 0, 0, 0, 0, 0, 0, 'reject')  // throws
```

## Static methods

### Temporal.DateTime.**from**(_thing_: string | object) : Temporal.DateTime

**Parameters:**
- `thing` (string or object): The value representing the desired date and time.

**Returns:** a new `Temporal.DateTime` object (or the same object if `thing` was a `Temporal.DateTime` object.)

This static method creates a new `Temporal.DateTime` object from another value.
If the value is a string, it must be in ISO 8601 format.
If the string designates a time zone, the time zone will be ignored.
If the value is another `Temporal.DateTime` object, the same object is returned.
If the value is any other object, a `Temporal.DateTime` will be constructed from the values of any `year`, `month`, `day`, `hour`, `minute`, `second`, `millisecond`, `microsecond`, and `nanosecond` properties that are present.
At least the `year`, `month`, and `day` properties must be present.
Any other missing ones will be assumed to be 0.

Example usage:
```javascript
dt = Temporal.DateTime.from('1995-12-07T03:24:30');
dt = Temporal.DateTime.from('1995-12-07T03:24:30Z');  // => 1995-12-07T03:24:30
dt = Temporal.DateTime.from('1995-12-07T03:24:30+01:00[Europe/Brussels]');
  // => same as above; time zone is ignored
dt === Temporal.DateTime.from(dt)  // => true

dt = Temporal.DateTime.from({
    year: 1995,
    month: 12,
    day: 7,
    hour: 3,
    minute: 24,
    second: 30,
    millisecond: 0,
    microsecond: 3,
    nanosecond: 500
});  // => 1995-12-07T03:24:30.000003500
dt = Temporal.DateTime.from({year: 1995, month: 12, day: 7});  // => 1995-12-07T00:00
dt = Temporal.DateTime.from(Temporal.Date.from('1995-12-07T03:24:30'));
  // => same as above; Temporal.Date has year, month, and day properties
```

### Temporal.DateTime.**compare**(_one_: Temporal.DateTime, _two_: Temporal.DateTime) : number

**Parameters:**
- `one` (`Temporal.DateTime`): First date/time to compare.
- `two` (`Temporal.DateTime`): Second date/time to compare.

**Returns:** &minus;1, 0, or 1.

Compares two `Temporal.DateTime` objects.
Returns an integer indicating whether `one` comes before or after or is equal to `two`.
- &minus;1 if `one` comes before `two`;
- 0 if `one` and `two` are the same;
- 1 if `one` comes after `two`.

This function can be used to sort arrays of `Temporal.DateTime` objects.
For example:
```javascript
one = Temporal.DateTime.from('1995-12-07T03:24');
two = Temporal.DateTime.from('1995-12-07T01:24');
three = Temporal.DateTime.from('2015-12-07T01:24');
sorted = [one, two, three].sort(Temporal.DateTime.compare);
sorted.join(' ');
// => 1995-12-07T01:24 1995-12-07T03:24 2015-12-07T01:24
```

## Properties

### datetime.**year** : number

### datetime.**month** : number

### datetime.**day** : number

### datetime.**hour**: number

### datetime.**minute**: number

### datetime.**second**: number

### datetime.**millisecond**: number

### datetime.**microsecond**: number

### datetime.**nanosecond**: number

The above read-only properties allow accessing each component of the date or time individually.

Usage examples:
```javascript
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
dt.year         // => 1995
dt.month        // => 12
dt.day          // => 7
dt.hour         // => 3
dt.minute       // => 24
dt.second       // => 30
dt.millisecond  // => 0
dt.microsecond  // => 3
dt.nanosecond   // => 500
```

### datetime.**dayOfWeek** : number

The `dayOfWeek` read-only property gives the weekday number that the date falls on.
The weekday number is defined as in the ISO 8601 standard: a value between 1 and 7, inclusive, with Monday being 1, and Sunday 7.
For an overview, see [ISO 8601 on Wikipedia](https://en.wikipedia.org/wiki/ISO_8601#Week_dates).

Usage example:
```javascript
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][dt.dayOfWeek - 1]  // => THU
```

### datetime.**dayOfYear** : number

The `dayOfYear` read-only property gives the ordinal day of the year that the date falls on.
This is a value between 1 and 365, or 366 in a leap year.

Usage example:
```javascript
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
// ISO ordinal date
console.log(dt.year, dt.dayOfYear);  // => 1995 341
```

### datetime.**weekOfYear** : number

The `weekOfYear` read-only property gives the ISO week number of the date.
This is normally a value between 1 and 52, but in a few cases it can be 53 as well.
ISO week 1 is the week containing the first Thursday of the year.
For more information on ISO week numbers, see for example the Wikipedia article on [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date).

Usage example:
```javascript
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
// ISO week date
console.log(dt.year, dt.weekOfYear, dt.dayOfWeek);  // => 1995 49 4
```

### datetime.**daysInMonth** : number

The `daysInMonth` read-only property gives the number of days in the month that the date falls in.
This is 28, 29, 30, or 31, depending on the month and whether the year is a leap year.

Usage example:
```javascript
// Attempt to write some mnemonic poetry
const monthsByDays = {};
for (let month = 1; month <= 12; month++) {
    const dt = Temporal.now.dateTime().with({month});
    monthsByDays[dt.daysInMonth] = (monthsByDays[dt.daysInMonth] || []).concat(dt);
}

const strings = monthsByDays[30].map(dt => dt.toLocaleString('en', {month: 'long'}));
// Shuffle to improve poem as determined empirically
strings.unshift(strings.pop());
const format = new Intl.ListFormat('en');
const poem = `Thirty days hath ${format.format(strings)}`;

console.log(poem);
```

### datetime.**daysInYear** : number

The `daysInYear` read-only property gives the number of days in the year that the date falls in.
This is 365 or 366, depending on whether the year is a leap year.

Usage example:
```javascript
dt = Temporal.now.dateTime();
percent = dt.dayOfYear / dt.daysInYear;
`The year is ${percent.toLocaleString('en', {style: 'percent'})} over!`
// example output: "The year is 10% over!"
```

### datetime.**isLeapYear** : boolean

The `isLeapYear` read-only property tells whether the year that the date falls in is a leap year or not.
Its value is `true` if the year is a leap year, and `false` if not.

Usage example:
```javascript
// Is this year a leap year?
dt = Temporal.now.dateTime();
dt.isLeapYear  // example output: true
// Is 2100 a leap year? (no, because it's divisible by 100 and not 400)
dt.with({year: 2100}).isLeapYear  // => false
```

## Methods

### datetime.**with**(_dateTimeLike_: object, _disambiguation_: 'constrain' | 'balance' | 'reject' = 'constrain') : Temporal.DateTime

**Parameters:**
- `dateTimeLike` (object): an object with some or all of the properties of a `Temporal.DateTime`.
- `disambiguation` (optional string): How to deal with out-of-range values.
  Allowed values are `constrain`, `balance`, and `reject`.
  The default is `constrain`.

**Returns:** a new `Temporal.DateTime` object.

This method creates a new `Temporal.DateTime` which is a copy of `datetime`, but any properties present on `dateTimeLike` override the ones already present on `datetime`.

Since `Temporal.DateTime` objects are immutable, use this method instead of modifying one.

Usage example:
```javascript
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
dt.with({year: 2015, second: 31})  // => 2015-12-07T03:24:31.000003500
```

### datetime.**plus**(_duration_: string | object, _disambiguation_: 'constrain' | 'balance' | 'reject' = 'constrain') : Temporal.DateTime

**Parameters:**
- `duration` (string or object): A `Temporal.Duration` object, a duration-like object, or a string from which to create a `Temporal.Duration`.
- `disambiguation` (optional string): How to deal with additions that result in out-of-range values.
  Allowed values are `constrain`, `balance`, and `reject`.
  The default is `constrain`.

**Returns:** a new `Temporal.DateTime` object which is the date and time indicated by `datetime` plus `duration`.

This method adds `duration` to `datetime`, returning a point in time that is in the future relative to `datetime`.

The `duration` argument can be any value that could be passed to `Temporal.Duration.from()`:
- a `Temporal.Duration` object;
- any object with properties denoting a duration, such as `{ hours: 5, minutes: 30 }`;
- a string in ISO 8601 duration format, such as `PT5H30M`.

Some additions may be ambiguous, because months have different lengths.
For example, adding one month to August 31 would result in September 31, which doesn't exist.
For these cases, the `disambiguation` argument tells what to do:
- In `constrain` mode (the default), out-of-range values are clamped to the nearest in-range value.
- In `balance` mode, out-of-range values are resolved by balancing them with the next highest unit.
- In `reject` mode, an addition that would result in an out-of-range value fails, and a `RangeError` is thrown.

Usage example:
```javascript
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
dt.plus({years: 20, months: 4, nanoseconds: 500})  // => 2016-04-07T03:24:30.000004
dt.plus('P14Y7MT7H14M21S')  // => 2010-07-07T10:38:51.000003500

dt = Temporal.DateTime.from('2019-01-31T15:30')
dt.plus({months: 1}, 'constrain')  // => 2019-02-28T15:30
dt.plus({months: 1}, 'balance')  // => 2019-03-03T15:30
dt.plus({months: 1}, 'reject')  // => throws
```

### datetime.**minus**(_duration_: string | object, _disambiguation_: 'constrain' | 'balance' | 'reject' = 'constrain') : Temporal.DateTime

**Parameters:**
- `duration` (string or object): A `Temporal.Duration` object, a duration-like object, or a string from which to create a `Temporal.Duration`.
- `disambiguation` (optional string): How to deal with subtractions that result in out-of-range values.
  Allowed values are `constrain`, `balance`, and `reject`.
  The default is `constrain`.

**Returns:** a new `Temporal.DateTime` object which is the time indicated by `datetime` minus `duration`.

This method subtracts `duration` from `datetime`, returning a point in time that is in the past relative to `datetime`.

The `duration` argument can be any value that could be passed to `Temporal.Duration.from()`:
- a `Temporal.Duration` object;
- any object with properties denoting a duration, such as `{ hours: 5, minutes: 30 }`;
- a string in ISO 8601 duration format, such as `PT5H30M`.

Some subtractions may be ambiguous, because months have different lengths.
For example, subtracting one month from July 31 would result in June 31, which doesn't exist.
For these cases, the `disambiguation` argument tells what to do:
- In `constrain` mode (the default), out-of-range values are clamped to the nearest in-range value.
- In `balance` mode, out-of-range values are resolved by balancing them with the next highest unit.
- In `reject` mode, an addition that would result in an out-of-range value fails, and a `RangeError` is thrown.

Usage example:
```javascript
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
dt.minus({years: 20, months: 4, nanoseconds: 500})  // => 1975-08-07T03:24:30.000003
dt.minus('P14Y7MT7H14M21S')  // => 1981-05-06T20:10:09.000003500

dt = Temporal.DateTime.from('2019-03-31T15:30')
dt.minus({months: 1}, 'constrain')  // => 2019-02-28T15:30
dt.minus({months: 1}, 'balance')  // => 2019-03-03T15:30
dt.minus({months: 1}, 'reject')  // => throws
```

### datetime.**difference**(_other_: Temporal.DateTime) : Temporal.Duration

**Parameters:**
- `other` (`Temporal.DateTime`): Another date/time with which to compute the difference.

**Returns:** a `Temporal.Duration` representing the difference between `datetime` and `other`.

This method computes the difference between the two times represented by `datetime` and `other`, and returns it as a `Temporal.Duration` object.
The difference is always positive, no matter the order of `datetime` and `other`, because `Temporal.Duration` objects cannot represent negative durations.

Usage example:
```javascript
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
dt.difference(Temporal.DateTime.from('2019-01-31T15:30'))  // => P23Y1M24DT12H5M29.999996500S
```

### datetime.**toString**() : string

**Returns:** a string in the ISO 8601 date format representing `datetime`.

This method overrides the `Object.prototype.toString()` method and provides a convenient, unambiguous string representation of `datetime`.
The string can be passed to `Temporal.DateTime.from()` to create a new `Temporal.DateTime` object.

Example usage:
```js
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
dt.toString();  // => 1995-12-07T03:24:30.000003500
```

### datetime.**toLocaleString**(_locale_?: string, _options_?: object) : string

**Parameters:**
- `locales` (optional string or array of strings): A string with a BCP 47 language tag with an optional Unicode extension key, or an array of such strings.
- `options` (optional object): An object with properties influencing the formatting.

**Returns:** a language-sensitive representation of `datetime`.

This method overrides `Object.prototype.toLocaleString()` to provide a human-readable, language-sensitive representation of `datetime`.

The `locales` and `options` arguments are the same as in the constructor to [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).

> **NOTE**: Unlike in [`Temporal.Absolute.prototype.toLocaleString()`](./absolute.html#toLocaleString), `locales.timeZone` will have no effect, because `Temporal.DateTime` carries no time zone information and is just a wall-clock time.

Example usage:
```js
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
dt.toLocaleString();  // => example output: 1995-12-07, 3:24:30 a.m.
dt.toLocaleString('de-DE');  // => example output: 7.12.1995, 03:24:30
dt.toLocaleString('de-DE', { timeZone: 'Europe/Berlin', weekday: 'long' });  // => Donnerstag, 7.12.1995, 03:24:30
dt.toLocaleString('en-US-u-nu-fullwide-hc-h12');  // => １２/７/１９９５, ３:２４:３０ AM
```

### datetime.**inTimeZone**(_timeZone_ : Temporal.TimeZone | string, _disambiguation_ : 'earlier' | 'later' | 'reject' = 'earlier') : Temporal.Absolute

**Parameters:**
- `timeZone` (optional string or `Temporal.TimeZone`): The time zone in which to interpret `dateTime`.
- `disambiguation` (optional `string`): How to disambiguate if the date and time given by `dateTime` does not exist in the time zone, or exists more than once.
  Allowed values are `earlier`, `later`, and `reject`.
  The default is `earlier`.

**Returns:** A `Temporal.Absolute` object indicating the absolute time in `timeZone` at the time of the calendar date and wall-clock time from `dateTime`.

This method is one way to convert a `Temporal.DateTime` to a `Temporal.Absolute`.
It is identical to [`(Temporal.TimeZone.from(timeZone || 'UTC')).getAbsoluteFor(dateTime, disambiguation)`](./timezone.html#getAbsoluteFor).

In the case of ambiguity, the `disambiguation` parameter controls what absolute time to return:
- `earlier`: The earlier of two possible times.
- `later`: The later of two possible times.
- `reject`: Throw a `RangeError` instead.

For usage examples and a more complete explanation of how this disambiguation works and why it is necessary, see [Resolving ambiguity](./ambiguity.md).

### datetime.**getDate**() : Temporal.Date

**Returns:** a `Temporal.Date` object that is the same as the date portion of `datetime`.

### datetime.**getYearMonth**() : Temporal.YearMonth

**Returns:** a `Temporal.YearMonth` object that is the same as the year and month of `datetime`.

### datetime.**getMonthDay**() : Temporal.MonthDay

**Returns:** a `Temporal.MonthDay` object that is the same as the month and day of `datetime`.

### datetime.**getTime**() : Temporal.Time

**Returns:** a `Temporal.Time` object that is the same as the wall-clock time portion of `datetime`.

The above four methods can be used to convert `Temporal.DateTime` into a `Temporal.Date`, `Temporal.YearMonth`, `Temporal.MonthDay`, or `Temporal.Time` respectively.
The converted object carries a copy of all the relevant fields of `datetime` (for example, in `getDate()`, the `year`, `month`, and `day` properties are copied.)

Usage example:
```javascript
dt = new Temporal.DateTime(1995, 12, 7, 3, 24, 30, 0, 3, 500);
dt.getDate()  // => 1995-12-07
dt.getYearMonth()  // => 1995-12
dt.getMonthDay()  // => 12-07
dt.getTime()  // => 03:24:30.000003500
```