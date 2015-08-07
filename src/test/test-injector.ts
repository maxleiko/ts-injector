import { Injector, Context } from '../main/Injector';
import { MyClass } from './test-inject';

class Logger {
  private tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  log(msg: string): void {
    console.log(this.tag, msg);
  }
}

class Foo {
  private msg: string;

  constructor(msg?: string) {
    this.msg = msg || 'foo bar';
  }

  bar(): void {
    console.log(this.msg);
  }
}

var injector = new Injector();
injector.register('Foo', new Foo());

var count = 0;
function test(c: MyClass, msg: string) {
  var ctx = new Context();
  ctx.register('Logger', new Logger('log'+count++));
  injector.inject(c, ctx);

  c.doFoo();
  c.doLog(msg);
}

test(new MyClass(), 'potato')
injector.register('Foo', new Foo('dre'));
test(new MyClass(), 'foo')
test(new MyClass(), 'bar')
