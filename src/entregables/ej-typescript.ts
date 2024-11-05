class Stack<T> {
  protected elements: T[] = [];

  push(element: T): void {
    this.elements.push(element);
  }

  pop(): T | undefined {
    return this.elements.pop()
  }

  size(): number {
    return this.elements.length
  }
}

class UniqueStack<T> extends Stack<T> {
  push(element: T): void {
    if (this.elements.includes(element)) {
      console.log(`El elemento ${element} ya se encuentra en la pila.`)
    } else {
      super.push(element)
    }
  }
}