export interface SomeService {
    foo(): void;
}

export interface OtherService {
    bar(): boolean;
}

export class RemoteService {
  getValue(cb: (err: Error, val: string) => void) {
    setTimeout(() => {
      cb(null, 'baz');
    }, 250);
  }
}
