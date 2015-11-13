import { Injector } from '../main/Injector';
import { MyClass } from './test-inject';
import * as Services from './test-injectable';

var injector = new Injector();

class SomeServiceImpl implements Services.SomeService {
    foo(): void {
        console.log('SomeService foo');
    }
}

class OtherServiceImpl implements Services.OtherService {
    bar(): boolean {
        console.log('OtherService bar');
        return false;
    }
}

injector.register(Services.SomeServiceImpl, new SomeServiceImpl());
injector.register(Services.OtherServiceImpl, new OtherServiceImpl());

var c = new MyClass();

injector.inject(c);

c.run();
