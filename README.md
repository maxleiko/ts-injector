# injector
TypeScript Dependency Injector using `reflect-metadata` and **tsc** 1.5+ with es7 experimental features enabled

### Purpose
The purpose of this module is to allow you to do something like that:

```ts
// MyClass.ts
import { Inject } from 'ts-injector'

export class MyClass {
  @Inject('Foo')
  private foo: Foo

  doFoo(): void {
    this.foo.foo();
  }
}

// with a Foo declaration somewhere
declare interface Foo {
  foo(): void;
}
```

And then create the instance of **MyClass** and inject the instance of **Foo** at runtime:

```ts
// test.ts
import { Injector } from 'ts-injector'
import { MyClass } from './MyClass'

// create the real Foo class
class Foo {
  foo(): void {
    console.log('foo bar');
  }
}

// instantiate the injector
var injector = new Injector();
// register a new instance for "Foo" type
injector.register('Foo', new Foo());

// create a instance of MyClass
var c = new MyClass();
// inject the needed dependencies
injector.inject(c);

// now you can call
c.doFoo();
// prints "foo bar"
```
