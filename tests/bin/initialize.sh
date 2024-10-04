#!/bin/bash
wp-env run tests-wordpress chmod -c ugo+w /var/www/html
wp-env run tests-cli wp rewrite structure '/%postname%/' --hard
wp-env run tests-cli wp plugin install wp-mail-catcher --activate
wp-env run tests-cli wp user get testuser || \
wp-env run tests-cli wp user create testuser testuser@example.com --role=administrator
