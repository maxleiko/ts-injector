import { Inject } from '../main/Inject'

// definition of service to inject
declare interface Foo {
  bar(): void
}

// definition of service to inject
declare interface Logger {
  log(msg: string): void
}

export class MyClass {
  @Inject('Foo')
  private foo: Foo

  @Inject('Logger')
  private log: Logger

  doFoo(): void {
    this.foo.bar();
  }

  doLog(msg: string): void {
    this.log.log(msg);
  }
}
