export class MyClass {
    private _name: string;
    
    constructor(name: string) {
      this._name = name;
    }
    
    public sayHello(): void {
      console.log(`Hello, my name is ${this._name}!`);
    }
  }
  