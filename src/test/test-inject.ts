import { Inject, Injectable } from '../main/Inject'
import * as Services from './test-injectable';

export class MyClass {
  @Inject(Services.SomeServiceImpl)
  private one: Services.SomeService;

  @Inject(Services.OtherServiceImpl)
  private two: Services.OtherService;

  run(): void {
      this.one.foo();
      this.two.bar();
  }
}
