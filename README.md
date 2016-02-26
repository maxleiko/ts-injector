# injector
TypeScript Dependency Injection using `reflect-metadata` and **typescript** 1.7+ with es7 experimental features enabled

### How it works
The purpose of this module is to allow you to do something like that:

```ts
// MyClass.ts
import { Inject } from 'ts-injector';

export class MyClass {
  @Inject('Foo')
  private foo: Foo;

  doFoo(): void {
    this.foo.foo();
  }
}

// Foo.ts
declare interface Foo {
  foo(): void;
}
```

And then create the instance of **MyClass** and inject the instance of **Foo** at runtime:

```ts
// test.ts
import { Injector } from 'ts-injector';
import { MyClass } from './MyClass';
import { Foo } from './Foo';

// create the real Foo class
class FooImpl implements Foo {
  foo(): void {
    console.log('foo bar');
  }
}

// instantiate the injector
var injector = new Injector();
// register an instance of FooImpl to be bind with people asking for @Inject("Foo")
injector.register('Foo', new FooImpl());

// create an instance of MyClass
var c = new MyClass();
// inject the needed dependencies
injector.inject(c);

// now you can call
c.doFoo();
// prints "foo bar"
```

### Dev env
Init the project:
```sh
npm install
```
Compile TypeScript:
```sh
npm run build
```
Run the tests
```sh
npm test
```
