const restruct = (val, ref) => restruct.any(val, ref);

restruct.any = (val, ref) => {
    if (!val) return restruct.any([], ref);
    if (Array.isArray(val)) return restruct.array(val, ref);
    if (val.constructor === Object) return restruct.object(val, ref);
    return restruct.any(Object.keys(ref), ref);
};

restruct.array = (arr, ref) => {
    return restruct.any(Object.fromEntries(arr.map(el => {
        if (el.constructor === String) return [el, true];
        if (Array.isArray(el)) {
            const [key, val] = el;
            if (!val) return [key, false]
            if (val.constructor === Object) return [key, val];
            return [key, true]
        }
    })), ref);
};

restruct.object = (obj, ref, opt = { toggleName: 'enabled' }) => {
    return Object.fromEntries(Object.entries(ref).map(([key, refobj]) => {
        const val = obj[key];
        if (!val) return [key, { ...refobj, [opt.toggleName]: false }];
        if (val.constructor === Object) return [key, { ...refobj, ...val, [opt.toggleName]: val.enabled ?? false }];
        return [key, { ...refobj, [opt.toggleName]: true }];
    }));
};

module.exports = restruct;
