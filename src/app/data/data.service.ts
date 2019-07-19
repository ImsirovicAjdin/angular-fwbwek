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
    // return this.http.post('url', userSettings);
    return this.http.post('https://putsreq.com/6svnkfxLvb4dRTXVdDLO', userSettings);
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
/*
6.5 Posting a Form
Let's see how we can post our form data to a real HTTP endpoint. We can do that very easily using a web service. Here's a tool that we can use, and it's called PutsReq, PutsReq.
putsreq.com
The Req is for requests, we can send requests, and build a response, and send it back. And it's very easy to use, so I'll click the button Create a PutsReq. 
And we can see our endpoint right here. I'll copy this out of the curl command, 
https://putsreq.com/6svnkfxLvb4dRTXVdDLO
and I'll go to Visual Studio Code, and I'll paste the URL into our post method call. 
So now we'll be posting our userSettings to this endpoint, and it's all wrapped up in an observable. Going back to the website, you can see where we can enter some JavaScript code to build a response. I'll make the font larger here, and we can just go ahead and delete this code. 
If you want to read up on how to build a response, you can click this information button, and you'll go to the GitHub page for the service. You can see here how to access the request. 
https://github.com/phstc/putsreq#response-builder
Because we're posting the rest.request_method will be POST, the request.body will contain the JSON object that we're posting, and we have request.params for parameters and request.headers for headers. And there's some useful code here to parse a JSON request, which is what we have. When we post the form, the data gets placed in the body as a JSON object. So let's just copy this one line of code, and we'll get to that in a second. 
var parsedBody = JSON.parse(request.body);
response.body = parsedBody;
The response is very simple. We have response.status, we can return any status code we'd like, we can specify headers in response.headers, and we can specify some text or an object for the body. So going back to our Response Builder, I'll paste the code we copied. So this will look in the request.body, which will be our userSettings object, and that gets passed to json.parse. It'll end up in this variable parsedBody. Now a real web service would process that object in some way. After it saves it to a database, it might store the ID in there, and we'll see that later in an upcoming clip, or it might alter the data in some fashion. But for now, let's just return the object. And it gets returned in the response.body. I'll hit the Update button. So that's been updated, and we can see that the number of requests made to this endpoint is 0. Let's go to our code. And I'll make sure this is saved. And let's go to our component. So when the user clicks on Submit, we'll execute our dataService.postUserSettingsForm, and on a success, this function will execute. We're using an arrow function here, which is a simple way to go about it, but this could be any function, whether it's a method of this class or a standalone function. But for simplicity, we're just using an arrow function. If any kind of error arises, the second arrow function will execute. So we're expecting a success, along with the object, which would be a userSettings object. Let's go to our form. I'll enter a Name, and I'll hit the Send button to post the form. Looking in our console, we got our success, and we got the userSettings object with a name of Milton. So it appears it worked. Let's look at the website. And now we can see that Requests is set to 1. So everything's working fine. Let's just add some data to parsedBody just to make sure that things are going through properly. It's very common when you post a form or post some kind of data that you're going to want to know the unique ID that was assigned to that in the database. So let's create an ID field. We'll say parsedBody.id = any arbitrary ID, 1234, and remember to hit the Update button. And back in our form, let's post it again. I'll hit the Send button again. So again we got success. And when we open up the object, we see our id of 1234, and our Requests was bumped up to 2. So our Response Builder is working. So we've seen the successful cases where our data gets posted and we get a successful response. In the next clip, we'll take a look at handling errors.

var parsedBody = JSON.parse(request.body);
parsedBody.id = 1234;
response.body = parsedBody;
*/