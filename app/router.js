import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('list-ambassadors');
  this.route('ambassador', { path: '/ambassadors/:uid' });
  this.route('new-ambassador');
  this.route('login');
  this.route('logout');
  this.route('404');
  this.route('home', { path: '/' });
});

export default Router;
