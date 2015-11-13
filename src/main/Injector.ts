import { Injectable, MetaData, InjectData } from './Inject';

export class Injector {
  private types: { [className: string]: Object };

  constructor() {
    this.types = {};
  }

  register(injectable: Injectable, instance: Object): void {
    this.types[injectable.name] = instance;
  }

  inject(instance: any, context?: Context): void {
    var services = Reflect.getMetadata(MetaData.INJECTS, instance.constructor.prototype) || [];
    services.forEach((prop: InjectData) => {
      var service: Object = null;
      if (context) {
        service = context.get(prop.type);
        if (service) {
          instance[prop.name] = service;
        } else {
          service = this.types[prop.type['name']];
          if (service) {
            instance[prop.name] = service;
          } else {
            throw new Error(`Unable to find service "${prop.type['name']}" for "${prop.name}" (${instance.constructor.name})`);
          }
        }
      } else {
        service = this.types[prop.type['name']];
        if (service) {
          instance[prop.name] = service;
        } else {
          throw new Error(`Unable to find service "${prop.type['name']}" for "${prop.name}" (${instance.constructor.name}) in global context`);
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

  register(injectable: Injectable, instance: Object): void {
    this.types[injectable.name] = instance;
  }

  get(injectable: Injectable): Object {
    return this.types[injectable.name];
  }
}
