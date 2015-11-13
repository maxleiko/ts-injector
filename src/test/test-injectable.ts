export var SomeServiceImpl = { name: 'SomeService' };
export var OtherServiceImpl = { name: 'OtherService' };

export interface SomeService {
    foo(): void;
}

export interface OtherService {
    bar(): boolean;
}
