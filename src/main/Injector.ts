import { MetaData, InjectData } from './Inject';

export class Injector {
  private types: { [className: string]: Object };

  constructor() {
    this.types = {};
  }

  register(className: string, instance: Object): void {
    this.types[className] = instance;
  }

  inject(instance: any, context?: Context): void {
    var services = Reflect.getMetadata(MetaData.INJECTS, instance.constructor.prototype);

    services.forEach((prop: InjectData) => {
      var service: Object = null;
      if (context) {
        service = context.get(prop.className);
        if (service) {
          instance[prop.name] = service;
        } else {
          service = this.types[prop.className];
          if (service) {
            instance[prop.name] = service;
          } else {
            throw new Error(`Unable to find service "${prop.className}" for "${prop.name}" (${instance.constructor.name})`);
          }
        }
      } else {
        service = this.types[prop.className];
        if (service) {
          instance[prop.name] = service;
        } else {
          throw new Error(`Unable to find service "${prop.className}" for "${prop.name}" (${instance.constructor.name}) in global context`);
        }
      }
    });
  }
}

export class Context {
  private types: { [className: string]: Object };

  constructor() {
    this.types = {};
  }

  register(className: string, instance: Object): void {
    this.types[className] = instance;
  }

  get(className: string): Object {
    return this.types[className];
  }
}
