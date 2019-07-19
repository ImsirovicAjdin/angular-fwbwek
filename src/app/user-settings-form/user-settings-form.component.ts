import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms'; 
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: [ './user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  //userSettings : UserSettings = {
    originalUserSettings : UserSettings = {
    /*
    name: 'Linus',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'Here are some notes...',
    password: 'abc',
    testing: '2019-07-05'
    */
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null,
    password: null,
    testing: null    
  }

  userSettings : UserSettings = { ...this.originalUserSettings};
  postError = false;
  postErrorMessage = '';

  constructor(private dataService: DataService) { }

  ngOnInit() { }

  onHttpError(errorResponse: any) {
    error => console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit', form.valid);

    if(form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error => console.log('error: ', error)
      )
    } else {
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors";
    }
    
  }

  onBlur(field: NgModel) {
    console.log('in onBlur', field.valid);
  }

}

/*
6.3 Form Posting Using Observables
(2)
We need access to our DataService, so in the constructor, I'll specify a private dataService variable of type DataService.

So in our onSubmit method we're calling our dataService.postUserSettingsForm(). And the call to this function takes in our **this.userSettings**. Remember, the this.userSettings is the object that gets built up as the form is modified. We can actually see that live inside our HTML with the help of: {{ userSettings | json }}

So, currently, this line of code will return an observable:

this.dataService.postUserSettingsFrom(this.userSettings)

... but it's not doing anything with it.

To get an observable to start working, you need to call the subscribe method. The first argument we need to send is a function that'll execute on success. The second argument is a function that'll get called if there's an error.

Let's recap:
We call a method on the DataService, postUserSettingsForm, and we pass it the data from the form. And we need to subscribe to this observable. 
    (When I say 'observable', I mean the result of calling this: this.dataService.postUserSettingsFrom(this.userSettings) This code returns an {O} ).
If you forget to subscribe, you'll never get a result!

So le't look at this in the browser. I'll specify a Name, and I'll hit the Send button to submit the form, and we can see that our success handler got called, success, and the result is the object that we originally passed into our DataService.

If we look bak at the DataService again, we're simply using the of function from RxJs to create a new observable, passing back the userSettings data.

*/