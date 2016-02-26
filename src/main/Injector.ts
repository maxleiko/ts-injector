import { MetaData, InjectData } from './Inject';

export class Injector {
  private types: { [className: string]: Object };

  constructor() {
    this.types = {};
  }

  register(injectable: any, instance: Object): void {
    var name: string;
    if (typeof injectable === 'string') {
      name = injectable;
    } else {
      name = (<any>injectable).name;
    }

    if (typeof name === undefined) {
      throw new Error('Cannot register "undefined" injectable');
    } else {
      this.types[name] = instance;
    }
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
          service = this.types[prop.type];
          if (service) {
            instance[prop.name] = service;
          } else {
            throw new Error(`Unable to find service "${prop.type}" for "${prop.name}" (${instance.constructor.name})`);
          }
        }
      } else {
        service = this.types[prop.type];
        if (service) {
          instance[prop.name] = service;
        } else {
          throw new Error(`Unable to find service "${prop.type}" for "${prop.name}" (${instance.constructor.name}) in global context`);
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

  register(injectable: any, instance: Object): void {
    this.types[injectable.name] = instance;
  }

  get(injectable: any): Object {
    var name: string;
    if (typeof injectable === 'string') {
      name = injectable;
    } else {
      name = (<any>injectable).name;
    }
    return this.types[name];
  }
}
