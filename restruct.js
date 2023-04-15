module.exports = (val, ref, opt = { toggleName: 'enabled' }) => {

    const restruct = {
        any: val => {
            if (!val) return restruct.any([], ref);
            if (Array.isArray(val)) return restruct.arr(val);
            if (val.constructor === Object) return restruct.obj(val);
            return restruct.any(Object.keys(ref));
        },
        arr: arr => {
            return restruct.any(Object.fromEntries(arr.map(el => {
                if (el.constructor === String) return [el, true];
                if (Array.isArray(el)) {
                    const [key, val] = el;
                    if (!val) return [key, false]
                    if (val.constructor === Object) return [key, val];
                    return [key, true]
                }
            })));
        },
        obj: obj => {
            return Object.fromEntries(Object.entries(ref).map(([key, refobj]) => {
                const val = obj[key];
                const res = (enabled, val = {}) => [key, { ...refobj, ...val, [opt.toggleName]: enabled }];
                if (!val) return res(false);
                if (val.constructor === Object) return res(val[opt.toggleName] ?? false, val);
                return res(true);
            }));
        }
    };

    return restruct.any(val);

};
