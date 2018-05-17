import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  setupController: function(controller) {
    this.get('session').invalidate();
    controller.transitionToRoute('/login'); 
  }
});
