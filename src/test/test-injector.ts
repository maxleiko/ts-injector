import { Injector } from '../main/Injector';
import { MyClass } from './test-inject';
import { SomeService, OtherService, RemoteService } from './test-injectable';

var injector = new Injector();

class SomeServiceImpl implements SomeService {
    foo(): void {
        console.log('SomeService foo');
    }
}

class OtherServiceImpl implements OtherService {
    bar(): boolean {
        console.log('OtherService bar');
        return false;
    }
}

injector.register('SomeService', new SomeServiceImpl());
injector.register('OtherService', new OtherServiceImpl());
injector.register(RemoteService, new RemoteService());

var c = new MyClass();

injector.inject(c);

c.run();
