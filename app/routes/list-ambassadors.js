import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  model: function() {
    console.log("session", this.get('session'));
    let adminkey = this.get('session')['session']['content']['authenticated']['adminkey']
    console.log("adminkey", adminkey);

    return Ember.$.ajax({
      method: 'GET',
      url: `${config.APP.API_BASE}/ambassadors`,
      headers: {
        'Authorization': `Basic ${btoa(adminkey + ":")}`
      }
    })
    .then(resp => resp.ambassadors)
  },

  setupController: function(controller, model) {

    controller.set('ambassadors', model);
  }
});

