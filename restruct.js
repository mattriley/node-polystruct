module.exports = (val, ref) => {

    const recurse = val => {
        if (!val) return recurse([]);

        if (Array.isArray(val)) {
            const obj = Object.fromEntries(val.map(el => {
                if (typeof el === 'string') return [el, true];
                if (Array.isArray(el)) {
                    const [key, val] = el;
                    if (!val) return [key, false]
                    if (val.constructor === Object) return [key, val];
                    return [key, true]
                }
            }));

            return recurse(obj);
        };

        if (val.constructor === Object) {
            const obj = val;
            return Object.fromEntries(Object.entries(ref).map(([key, refobj]) => {
                const val = obj[key];
                if (!val) return [key, { ...refobj, enabled: false }];
                if (val.constructor === Object) return [key, { ...refobj, ...val, enabled: val.enabled ?? false }];
                return [key, { ...refobj, enabled: true }];
            }));
        }

        return recurse(Object.keys(ref));
    };

    return recurse(val);

};
