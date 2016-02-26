import { Inject } from '../main/Inject'
import {
  SomeService, OtherService, RemoteService
} from './test-injectable';

export class MyClass {
  @Inject('SomeService')
  private one: SomeService;

  @Inject('OtherService')
  private two: OtherService;

  @Inject(RemoteService)
  private rService: RemoteService;

  run(): void {
      this.one.foo();
      this.two.bar();
      this.rService.getValue((err, val) => {
        if (!err) {
          console.log(`RemoteService ${val}`);
        }
      });
  }
}
