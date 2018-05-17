import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  model: function(params) {

    let adminkey = this.get('session')['session']['content']['authenticated']['adminkey']

    return Ember.$.ajax({
      method: 'GET',
      url: `${config.APP.API_BASE}/ambassadors/${params.uid}`,
      headers: {
        'Authorization': `Basic ${btoa(adminkey + ":")}`
      }
    })
    .then(resp => resp.ambassador)
    .catch(error => {
      window.location = '/404';
      console.log("ERROR", error);
    })
  },

  setupController: function(controller, model) {
    console.log("MODEL", model);
    controller.set('ambassador', model);

    Ember.run.schedule("afterRender",this,function() {
      new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");
    });

  }
  
});
