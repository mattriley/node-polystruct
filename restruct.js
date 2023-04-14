

module.exports = (val, ref) => {

    const refKeys = Object.keys(ref);

    const restructure = (arg) => {
        return Object.fromEntries(refKeys.map(key => {
            const refConfig = ref[key] ?? {};
            const valConfig = typeof val === 'object' ? val[key] ?? {} : {};
            const argConfig = typeof arg === 'function' ? arg(key) : arg ?? {};
            return [key, { ...refConfig, ...valConfig, ...argConfig }];
        }));
    };

    if (val === true || val === undefined) return restructure({ enabled: true });
    if (val === false || val === null) return restructure({ enabled: false });

    if (Array.isArray(val)) return restructure(key => ({ enabled: val.includes(key) }));

    if (typeof val === 'object') {
        return Object.fromEntries(refKeys.map(key => {
            const config = val[key] ?? {};
            const enabled = config.enabled ?? true;
            return [key, { ...config, enabled }];
        }));
    }

    throw new Error('Failed to interpret extensions');

};
