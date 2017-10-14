# range-array-to-string
[![Build Status](https://travis-ci.org/Rudimo/range-array-to-string.svg?branch=master)](https://travis-ci.org/Rudimo/range-array-to-string)

## How to use

```bash
npm install range-array-to-string
```
```javascript
const RangeArrayToString = require('range-array-to-string');

const rats = new RangeArrayToString();

rats.range([1, 2, 3, 5, 6, 7, 20])
    .then((string) => {
        // >> '1-3,5-7,20'
    })
    .catch((err) => {
        // handle error
    });
```

Array pre-sorting
```javascript
const rats = new RangeArrayToString({sort: true});

rats.range([44, 20, 1, 2, 3, 5, 6, 7])
    .then((string) => {
        // >> '1-3,5-7,20,44'
    })
```