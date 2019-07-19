import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  //postUserSettingsForm(userSettings: UserSettings) : Observable<UserSettings> { <-- throws an error, so <any> 
  postUserSettingsForm(userSettings: UserSettings) : Observable<any> {    
    // return UserSettings; <-- throws error
    // return of(userSettings);
    return this.http.post('url', userSettings);
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

/*
6.4 HTTP Access Using HttpClient
Let's get set up so we can actually post our form to a real web server. So we'll be doing an HTTP post, and the way we can do that in Angular is with the HttpClient, that's the built-in service. 
So let's get that set up. I'll go to our app.module .ts file, and to work with the HttpClient, we need to import the HttpClientModule. So let's import HttpClientModule. That's an @angular/common/http.
And I'll save this because that's all we need for our app.module. Let's go to our DataService. Instead of having HTTP access spread throughout our code, we'll use this DataService exclusively for HTTP access. That makes things a lot simpler and a lot more encapsulated. To work with the HttpClient, we inject it. I'll call the variable http, and that's of type HttpClient. And we'll automatically import that from the right place. We've been working with this fake observable right here, so we don't need that anymore, I'll just comment it out in case it's useful later on, but now we want to use our HTTP variable to post the form, this.http .post. 
And the first argument is our URL. We'll be entering a valid URL soon, so I'll put a placeholder for now. And the second argument is the data, which is the user settings that get passed to this method, and it just so happens that the HttpClient also works with observables, so we can return this post. And to simplify the types, we'll return an observable of any. That way we can handle whatever post returns. So we're all set up with HTTP access. The next thing we need to do is find the place to post our form to. It's too much work to create a whole server in addition to our Angular application, so we'll be posting to an online service, and we'll see how to do that in the next clip.
*/