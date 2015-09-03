'use strict';

(function(Pattern) {
  // Request-Reply Patterns
  Pattern[Pattern.LAZY_PIRATE = 0] = 'LAZY_PIRATE';
  Pattern[Pattern.SIMPLE_PIRATE = 1] = 'SIMPLE_PIRATE';
  Pattern[Pattern.PARANOID_PIRATE = 2] = 'PARANOID_PIRATE';
  Pattern[Pattern.MAJORDOMO = 3] = 'MAJORDOMO';
  Pattern[Pattern.TITANIC = 4] = 'TITANIC';
  Pattern[Pattern.BINARY_STAR = 5] = 'BINARY_STAR';
  Pattern[Pattern.FREELANCE = 6] = 'FREELANCE';

  // Pub-Sub Patterns
  Pattern[Pattern.SUICIDAL_SNAIL = 7] = 'SUICIDAL_SNAIL';
  Pattern[Pattern.BLACK_BOX = 8] = 'BLACK_BOX';
  Pattern[Pattern.ESPRESSO = 9] = 'ESPRESSO';
  Pattern[Pattern.CLONE = 10] = 'CLONE';

  // Custom
  Pattern[Pattern.CUSTOM = 9999] = 'CUSTOM';
})(module.exports = {});
