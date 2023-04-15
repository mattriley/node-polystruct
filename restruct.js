const restruct = (val, ref) => {

    if (!val) return restruct([], ref);

    if (Array.isArray(val)) {
        const arr = val;
        const obj = Object.fromEntries(arr.map(el => {
            if (typeof el === 'string') return [el, true];
            if (Array.isArray(el)) {
                const [key, val] = el;
                if (!val) return [key, false]
                if (val.constructor === Object) return [key, val];
                return [key, true]
            }
        }));

        const refobj = Object.fromEntries(Object.keys(ref).map(key => [key, false]));
        return restruct({ ...refobj, ...obj }, ref);
    };

    if (val.constructor === Object) {
        const obj = val;
        return Object.fromEntries(Object.entries(ref).map(([key, refobj]) => {
            const val = obj[key];
            if (Array.isArray(val)) throw new Error('Value as array is not supported');
            if (val === true) return [key, { ...refobj, enabled: true }];
            if (val === false || val === null || val == undefined) return [key, { ...refobj, enabled: false }];
            if (val.constructor === Object) return [key, { ...refobj, ...val, enabled: val.enabled ?? false }];
            throw new Error('Value type is not supported');
        }));

    }

    return restruct(Object.keys(ref), ref);

};

module.exports = restruct;
