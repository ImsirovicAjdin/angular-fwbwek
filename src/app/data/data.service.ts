import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {}

  postUserSettingsForm(userSettings: UserSettings) : Observable<UserSettings> {
    // return UserSettings; <-- throws error
    return of(userSettings);
  }

}

/*
6.3
(1)
When we post a form, we send the form data to a server, and we wait for a response, and that's an asynchronous operation. We don't know how long we'll wait for the response (seconds or minutes?). To deal with this asynchronicity, we'll use Observables.

    What's an Observable? 
    https://www.youtube.com/watch?v=XbOuCBuQepI says:

      Observable is a container for an item or collection of items.
      But items in the {O} are not stored in memory.
      Rather the items are added in asynchronous fashion. Like Events.
      Now the OBSERVER comes into picture!
      Whenever the Observer SUBSCRIBES, they can access the existing items in the Observable.
      Later the Observer is able to manipulate the received items.

And we can also specify a type for the observable. We want it to return UserSettings data.

Currently, we'll just return the UserSettings that came in. One way to return the Observable is to just use the of() method. Later on we'll post this to an HTTP server, but for now let's just return the UserSettings that came in when user submitted the form.

But how do we know when to trigger the function we just defined: postUserSettingsForm()?

Of course, we'll call it when the user submits the form: (2)!

*/