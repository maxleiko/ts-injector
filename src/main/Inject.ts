import 'reflect-metadata';

/**
 * @param injectable (string|{name: string}|FunctionConstructor)
 */
export function Inject(injectable: string | { name: string } | Function | any) {
  return function(target: any, propertyKey: string) {
    var className: string;
    switch (typeof injectable) {
      case 'string':
        className = injectable;
        break;

      case 'function':
        className = injectable.name;
        if (!className || className.trim().length === 0) {
          className = null;
        }
        break;

      case 'object':
        className = injectable.name;
        break;

      case 'undefined':
        break;

      default:
        className = injectable.toString();
        break;
    }

    if (typeof className !== 'string') {
      throw new Error(`@Inject(...) for "${propertyKey}" in ${target.constructor.name} must be a String or a function constructor`);
    }

    var services = new Array<InjectData>();
    if (Reflect.hasMetadata(MetaData.INJECTS, target)) {
      services = Reflect.getMetadata(MetaData.INJECTS, target);
    } else {
      Reflect.defineMetadata(MetaData.INJECTS, services, target);
    }
    services.push({
      name: propertyKey,
      type: className
    });
  };
}

export class MetaData {
  static INJECTS: string = 'ts-injector:injects'
}

export interface InjectData {
  name: string;
  type: string;
}
