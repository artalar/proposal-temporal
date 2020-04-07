# Temporal Cookbook

## Running the cookbook files

Running cookbook files:

```sh
node --experimental-modules --no-warnings \
	--icu-data-dir ./polyfill/node_modules/full-icu/ \
	-r ./polyfill/index.js ./docs/cookbook/${cookbookFile}
```

_The above code allows `Temporal` to exist as a global object before the cookbook file runs._

## Frequently Asked Questions

These are some of the most common tasks that people ask questions about on StackOverflow with legacy Date.
Here's how they would look using Temporal.

### Current date and time

How to get the current date and time in the local time zone?

```javascript
{{cookbook/getCurrentDate.mjs}}
```

### Unix timestamp

How to get a Unix timestamp?

```javascript
{{cookbook/getTimeStamp.mjs}}
```

## Converting between Temporal types and legacy Date

### Absolute from legacy Date

Map a legacy ECMAScript Date instance into a Temporal.Absolute instance corresponding to the same instant in absolute time.

```javascript
{{cookbook/absoluteFromLegacyDate.mjs}}
```

## Construction

### Zoned instant from instant and time zone

Map a Temporal.Absolute instance and a time zone name into a string serialization of the local time in that zone corresponding to the instant in absolute time.

```javascript
{{cookbook/getParseableZonedStringAtInstant.mjs}}
```

## Sorting

Each Temporal type has a `compare()` static method, which can be passed to `Array.prototype.sort()` as the compare function in order to sort an array of Temporal types.

### Sort DateTimes

Sort a list of `Temporal.DateTime`s, for example in order to get a conference schedule in the correct order.
Sorting other Temporal types would work exactly the same way as this.

```javascript
{{cookbook/getSortedLocalDateTimes.mjs}}
```

### Sort ISO date/time strings

Sort a list of ISO 8601 date/time strings, for example to place log entries in order.

```javascript
{{cookbook/sortAbsoluteInstants.mjs}}
```

## Time zone conversion

### Preserving absolute instant

Map a zoned date and time of day into a string serialization of the local time in a target zone at the corresponding instant in absolute time.
This could be used when converting user-input date-time values between time zones.

```javascript
{{cookbook/getParseableZonedStringWithLocalTimeInOtherZone.mjs}}
```

### UTC offset for a zoned event, as a string

Use `Temporal.TimeZone.getOffsetFor()` to map a `Temporal.Absolute` instance and a time zone into the UTC offset at that instant in that time zone, as a string.

```javascript
{{cookbook/getUtcOffsetStringAtInstant.mjs}}
```