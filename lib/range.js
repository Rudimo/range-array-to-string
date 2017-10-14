/**
 *
 * Created by Dmitry Kshevsky <rudimo@yandex.ru> on 14/10/17.
 */

'use strict';

class RangeArrayToString {

    constructor(options) {

        if (!options) {
            this.sort = false;
        } else if (options.sort) {
            this.sort = options.sort;
        }
    }

    range(arr) {

        return new Promise((resolve, reject) => {
            try {
                resolve(this.handle(arr));
            } catch (err) {
                reject(err);
            }
        })

    }

    handle(arr) {

        let validateError = this.validate(arr);

        if (this.sort) arr.sort((a, b) => a - b);

        if (validateError) {
            throw new Error(`Validation error: ${validateError}`);
        }

        let intervalIsOpen = false,
            outputString   = '',
            currentValue;

        arr.forEach((item, i) => {

            let nextItemFromArr = arr[i + 1];

            if (nextItemFromArr === item + 1) {

                if (!intervalIsOpen) {

                    intervalIsOpen = true;
                    outputString  += `${item}`;
                    currentValue   = item;
                }

            } else {

                if (intervalIsOpen) {

                    if (item - 1 === currentValue) {
                        outputString += ',';
                    } else {
                        outputString += '-';
                    }
                }

                outputString += item;

                if (nextItemFromArr) outputString += ',';

                intervalIsOpen = false;
            }
        });

        return outputString
    }

    validate(arr) {

        if (!(arr instanceof Array)) return 'Argument of the "range" method should be Array';

        let error;

        arr.forEach((item, i) => {

            if (typeof item !== 'number') return error = `"${item}" is not a number`;

            if (!isIntegerAndPositive(item)) return error = `"${item}" Elements of the array should be Integer and Positive`;

            if (!this.sort) {
                if (i && arr[i - 1] > item) return error = 'Elements of the array should be sort by asc';
            }
        });

        function isIntegerAndPositive(num) {
            if (num > 0 && num === parseInt(num, 10)) return true;
        }


        if (error) return error;

    }
}


module.exports = RangeArrayToString;