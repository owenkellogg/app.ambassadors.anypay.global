import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate: function() {
      let identification = this.get('password');
      this.get('session').authenticate('authenticator:adminkey', identification)
      .then(resp => {

        this.transitionToRoute('list-ambassadors');

      }).catch((reason) => {


        this.set('errorMessage', reason.error || reason);
        this.transitionToRoute('list-ambassadors');
      });

      console.log(this);
    }
  }
});
