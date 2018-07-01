import _ = require("lodash");

function mapValuesDeep(obj: object, fn: Function): any {
    return _.mapValues(obj, (val, key) => {
        if (_.isPlainObject(val)) {
            return mapValuesDeep((val as any), fn);
        } else {
            return fn(val, key);
        }
    });
}
