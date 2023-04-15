const restruct = (val, ref = val) => {
    if (!val) return restruct([], ref);
    if (Array.isArray(val)) return restruct.array(val, ref);
    if (val.constructor === Object) return restruct.object(val, ref);
    return restruct(Object.keys(ref), ref);
};

restruct.array = (arr, ref) => {
    return restruct(Object.fromEntries(arr.map(el => {
        if (typeof el === 'string') return [el, true];
        if (Array.isArray(el)) {
            const [key, val] = el;
            if (!val) return [key, false]
            if (val.constructor === Object) return [key, val];
            return [key, true]
        }
    })), ref);
};

restruct.object = (obj, ref) => {
    return Object.fromEntries(Object.entries(ref).map(([key, refobj]) => {
        const val = obj[key];
        if (!val) return [key, { ...refobj, enabled: false }];
        if (val.constructor === Object) return [key, { ...refobj, ...val, enabled: val.enabled ?? false }];
        return [key, { ...refobj, enabled: true }];
    }));
};

module.exports = restruct;
