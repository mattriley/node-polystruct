const restruct = (val, ref) => {

    const refKeys = Object.keys(ref);

    const restructure = (arg) => {
        console.warn(typeof arg, arg)
        return Object.fromEntries(refKeys.map(key => {
            const refConfig = ref[key] ?? {};
            const valConfig = typeof val === 'object' ? val[key] ?? {} : {};
            const argConfig = typeof arg === 'function' ? arg(key) : arg ?? {};
            return [key, { ...refConfig, ...valConfig, ...argConfig }];
        }));
    };

    // if (val === true || val === undefined) return restructure({ enabled: true });

    if (val === true || val === undefined) return restruct(Object.keys(ref), ref);

    if (val === false || val === null) return restructure({ enabled: false });

    if (Array.isArray(val)) {
        const arr = val;
        if (!arr.length) return restructure({ enabled: false });

        const obj = Object.fromEntries(arr.map(el => {
            if (typeof el === 'string') return [el, true];
            if (Array.isArray(el)) {
                const [key, val] = el;
                if (val === true || val === undefined) return [key, true];
                if (val === false || val === null) return [key, false];
            }
            if (typeof el === 'object') return [el.key, el];
        }));

        const refobj = Object.fromEntries(Object.keys(ref).map(key => [key, false]));

        return restruct({ ...refobj, ...obj }, ref);
    };



    if (typeof val === 'object') {
        const obj = val;
        return Object.fromEntries(Object.entries(ref).map(([key, refobj]) => {
            const val = obj[key];
            if (Array.isArray(val)) throw new Error('Value as array is not supported');
            if (val === true || val === undefined) return [key, { ...refobj, enabled: true }];
            if (val === false || val === null) return [key, { ...refobj, enabled: false }];
            if (typeof val === 'object') return [key, { ...refobj, ...val, enabled: val.enabled ?? true }];
            throw new Error('Value type is not supported');
        }));

    }

    throw new Error('Value type is not supported');

};

module.exports = restruct;
