import { test } from 'qunit';
import moduleForAcceptance from 'admin-app/tests/helpers/module-for-acceptance';
import { setResolver } from '@ember/test-helpers';

moduleForAcceptance('Acceptance | new ambassador');

test('visiting /new-ambassador without a admin user session', function(assert) {
  visit('/new-ambassador');

  /*andThen(function() {
    assert.equal(currentURL(), '/login');
  });
*/
});

