import { Injectable } from '@angular/core';

import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

interface Event {
  type: string;
  payload?: any;
}

type EventCallback = (payload: any) => void;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private handler = new Subject<Event>();
  public pageHeaderTitle = new BehaviorSubject<string>('');
  constructor() {}

  /**
   * Broadcast the event
   * @param type type of event
   * @param payload payload
   */
  broadcast(type: string, payload = {}): void {
    this.handler.next({ type, payload });
  }

  /**
   * Subscribe to event
   * @param type type of event
   * @param callback call back function
   */
  subscribe(type: string, callback: EventCallback): Subscription {
    return this.handler
      .pipe(filter((event) => event.type === type))
      .pipe(map((event) => event.payload))
      .subscribe(callback);
  }
}
