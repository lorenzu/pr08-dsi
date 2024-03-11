


/**
 * Interface for observable classes
 */
export interface Observable {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notify(): void;
  }
  
  /**
   * Interface for observer classes
   */
export interface Observer {
    update(observable: Observable): void;
  }
  
  enum NewsEventType {'NO_EVENT', 'NEWS'};
  
  /**
   * Class News that implements the Observable interface, i.e.,
   * News objects can be observed
   */
  export class News implements Observable {
    private observers: Observer[] = [];
    public news: string[] = [];
  
    private eventType: NewsEventType = NewsEventType.NO_EVENT;
  
    constructor(private id: number, private name: string) {
    }
  
    getId() {
      return this.id;
    }
    getName() {
      return this.name;
    }
    getEventType() {
      return this.eventType;
    }
  
    subscribe(observer: Observer) {
      if (this.observers.includes(observer)) {
        throw new Error('The observer had already been subscribed');
      } else {
        this.observers.push(observer);
      }
    }
  
    unsubscribe(observer: Observer) {
      const index = this.observers.indexOf(observer);
      if (index === -1) {
        throw new Error('The observer has not been subscribed');
      } else {
        this.observers.splice(index, 1);
      }
    }
  
    notify() {
      this.observers.forEach((observer) => observer.update(this));
    }
  
    onNewsUpdate(news: string) {
      this.eventType = NewsEventType.NEWS;
      this.news.push(news);
      this.notify();
    }
    
  }
  
  /**
   * Class NewsObserver that implements the interface Observer, i.e.,
   * it is able to observe other objects
   */
  export class NewsObserver implements Observer {
    constructor(private id: number, private name: string) {
    }
  
    getId() {
      return this.id;
    }
    getName() {
      return this.name;
    }
  
    update(observable: Observable) {
      if (observable instanceof News) {
        switch(observable.getEventType()) {
          case NewsEventType.NEWS:
            console.log(`I am a NewsObserver called ${this.name} ` +
                        `and I have observed that News ${observable.getName()} ` +
                        `update`);
            break;
      }
    }
}
  }
  
  // Client code
  /*
  const myButton = new News(0, 'myNews');
  const firstButtonObserver = new NewsObserver(0, 'firstNewsObserver');
  const secondButtonObserver = new NewsObserver(1, 'secondNewsObserver');
  
  console.log('firstNewsObserver subscription');
  myButton.subscribe(firstButtonObserver);
  
  console.log('secondNewsObserver subscription');
  myButton.subscribe(secondButtonObserver);
  
  try {
    myButton.subscribe(secondButtonObserver);
  } catch (error) {
    console.log('secondNewsObserver was already subscribed');
  }
  
  console.log('myNews update');
  myButton.onNewsUpdate();
  
  console.log('firstNewsObserver unsubscription');
  myButton.unsubscribe(firstButtonObserver);
*/

  
  