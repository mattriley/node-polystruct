const restructArray = arr => {
    return Object.fromEntries(arr.map(el => {
        if (typeof el === 'string') return [el, true];
        if (Array.isArray(el)) {
            const [key, val] = el;
            if (!val) return [key, false]
            if (val.constructor === Object) return [key, val];
            return [key, true]
        }
    }))
};

const restructObject = (obj, ref) => {
    return Object.fromEntries(Object.entries(ref).map(([key, refobj]) => {
        const val = obj[key];
        if (!val) return [key, { ...refobj, enabled: false }];
        if (val.constructor === Object) return [key, { ...refobj, ...val, enabled: val.enabled ?? false }];
        return [key, { ...refobj, enabled: true }];
    }));
}

module.exports = (val, ref) => {

    const recurse = val => {
        if (!val) return recurse([]);

        if (Array.isArray(val)) {
            return recurse(restructArray(val));
        };

        if (val.constructor === Object) {
            return restructObject(val, ref);
        }

        return recurse(Object.keys(ref));
    };

    return recurse(val);

};
