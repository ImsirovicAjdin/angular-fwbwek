import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms'; 

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

  constructor() { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log('in onSubmit', form.valid);
  }

  onBlur(field: NgModel) {
    console.log('in onBlur', field.valid);
  }

}
