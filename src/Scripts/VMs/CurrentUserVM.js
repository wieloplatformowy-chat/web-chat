﻿function CurrentUserVM(root) {
    var self = this;

    //obserwables
    self.IsLogged = ko.observable(false);

    self.Id = ko.observable();
    self.Name = ko.observable();


    //functions
    self.SetAuthToken = function (token) {
        Chat.SetAuthToken(token);
        self.SaveToken(token);
        self.GetUserData();
    }

    self.RestoreToken = function() {
        Chat.SetAuthToken(window.localStorage.AuthToken);
        self.GetUserData();
    }

    self.SaveToken = function(token) {
        window.localStorage.AuthToken = token;
    }

    self.EnableHandlingUnauthorized = function() {
        Chat.setUnauthorizedCallback(function(xhr) {
            self.IsLogged(false);
            self.Id("");
            self.Name("");

            //todo clear other shit when detect user was logged out
            return true;
        });
    }

    /* self.EnableSyncToken = function() {
         window.addEventListener('storage', function(e) {  
             if ("AuthToken" === e.key) {
                 e.newValue
             }
         });
     }*/

    self.GetUserData = function() {
        Chat.getJson("/user/whoami")
            .done(function(response) {
                self.IsLogged(true);
                self.Name(response.name);
                self.Id(response.id);
            });
    }

    //ctor
    self.EnableHandlingUnauthorized();
    self.RestoreToken();
}