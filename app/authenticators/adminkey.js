import Base from 'ember-simple-auth/authenticators/base';
import Ember from 'ember';
import config from '../config/environment';

export default Base.extend({
  restore(data) {
    return Ember.RSVP.Promise.resolve(data);
  },
  authenticate(identifier, password) {

    var apiBase = config.APP.API_BASE || 'https://ambassadors.anypay.global';

    return new Ember.RSVP.Promise((resolve, reject) => {
      console.log('IDENTIFIER', identifier);

      Ember.$
        .ajax({
          url: `${apiBase}/ambassadors`,
          method: "GET",
          headers: {
            'Authorization': `Basic ${btoa(identifier + ":")}`
          }
        })
      .then(ambassadors => resolve({ admin: true, adminkey: identifier }))
      .catch(error => {
        console.log('error', error);
        reject("invalid credentials");
      });

    });
  },
  invalidate() {
    return Ember.RSVP.Promise.resolve();
  }
});

