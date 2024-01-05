import { $args } from '@/args'

class Hello {
  sayHello() {
    return "Hello World";
  }
}

let s = new Hello().sayHello();
console.log(s);

console.log($args());
