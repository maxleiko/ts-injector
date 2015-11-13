import 'reflect-metadata';

export function Inject(injectable: Injectable) {
    return function (target: any, propertyKey: string) {
        var services = new Array<InjectData>();
        if (Reflect.hasMetadata(MetaData.INJECTS, target)) {
          services = Reflect.getMetadata(MetaData.INJECTS, target);
        } else {
          Reflect.defineMetadata(MetaData.INJECTS, services, target);
        }
        services.push({
          name: propertyKey,
          type: injectable
        });
    };
}

export class MetaData {
  static INJECTS: string = 'ts-injector:injects'
}

export interface InjectData {
  name: string;
  type: Injectable;
}

export interface Injectable {
    name: string;
}
