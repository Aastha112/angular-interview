// tslint:disable-next-line:ban-types
/**
 * @param baseCtors : Function
 * @return Function
 * @Description : mixin decorator to include httOptions class in request.
 */
// tslint:disable-next-line:ban-types
export function Mixin(baseCtors: Function[]) {
    // tslint:disable-next-line:ban-types
    return (derivedCtor: Function) => {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                const descriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
                if (name === 'constructor') {
                    return;
                }
                // tslint:disable-next-line:max-line-length
                if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
                    Object.defineProperty(derivedCtor.prototype, name, descriptor);
                } else {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                }
            });
        });
    };
}
