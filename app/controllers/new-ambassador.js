import Ember from 'ember';
import config from '../config/environment';

function createAmbassador(adminkey, name, email, dashaddress) {

  return Ember.$.ajax({
    method: "POST",
    url: `${config.APP.API_BASE}/ambassadors`,
    data: {
      currency: 'DASH',
      email, 
      name,
      address: dashaddress
    },
    headers: {
      'Authorization': `Basic ${btoa(adminkey + ":")}`
    }
  })
  .then(resp => resp.ambassador);

}

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    create: function(e) {

      let adminkey = this.get('session')['session']['content']['authenticated']['adminkey']
      e.preventDefault();

      let {
        name,
        email,
        dashaddress
      } = this.getProperties('name', 'email', 'dashaddress');
      
      console.log("CREATE", {name,email,dashaddress})

      createAmbassador(adminkey, name, email, dashaddress).then(ambassador => {
        this.transitionToRoute('ambassador', ambassador.uid);
      })
      .catch(error => {
        this.set('errorMessage', error.message);
      });
    }
  }
});
