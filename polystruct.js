const defaultOptions = { key: null, enabled: 'enabled' };

module.exports = (val, ref, options = {}) => {
    const opt = { ...defaultOptions, ...options };
    const maybeKey = key => opt.key ? { [opt.key]: key } : {};
    const maybeEnabled = enabled => opt.enabled ? { [opt.enabled]: enabled } : {};

    const polystruct = {
        any: val => {
            if (!val) return polystruct.any([], ref);
            if (Array.isArray(val)) return polystruct.arr(val);
            if (val.constructor === Object) return polystruct.obj(val);
            return polystruct.any(Object.keys(ref));
        },
        arr: arr => {
            return polystruct.any(Object.fromEntries(arr.map(el => {
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
                const res = enabled => [key, { ...refobj, ...val, ...maybeEnabled(enabled), ...maybeKey(key) }];
                const val = obj[key];
                if (!val) return res(false);
                if (val.constructor === Object) return res(!!val[opt.enabled]);
                return res(true);
            }));
        }
    };

    return polystruct.any(val);
};
