import { $args } from '@/args'

export class Hello {
  sayHello() {
    console.log("Hello World");
    console.log($args());
  }
}