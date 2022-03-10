import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  private subject = new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    onMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
