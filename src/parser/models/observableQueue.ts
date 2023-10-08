export class ObservableQueue<T> {
  queue = new Array<T>();
  consumer: QueueConsumer<T>;

  constructor(consumer: QueueConsumer<T>) {
    this.consumer = consumer;
  }

  push(el: T) {
    this.queue.push(el);
    this.consumer(this.queue);
  }

  length() {
    return this.queue.length;
  }
}

type QueueConsumer<T> = (oq: T[]) => unknown;
