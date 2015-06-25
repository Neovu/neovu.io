<?php
/** WordPress's config file **/
/** http://wordpress.org/   **/

// ** MySQL settings ** //

$xhostip = '172.17.25.3';

if ( $xhostip =='172.17.24.1') $xhost="mysql4a.winserversecure.com";

if ( $xhostip =='172.17.24.2') $xhost="mysql4b.winserversecure.com";

if ( $xhostip =='172.17.25.1') $xhost="mysql5a.winserversecure.com";

if ( $xhostip =='172.17.25.2') $xhost="mysql5b.winserversecure.com";

if ( $xhostip =='172.17.25.3') $xhost="mysql5c.winserversecure.com";

if ( $xhostip =='172.17.25.4') $xhost="mysql5d.winserversecure.com";

if ( $xhostip =='172.17.25.5') $xhost="mysql5e.winserversecure.com";

define('DB_NAME', 'neovu-sql');     // The name of the database
define('DB_USER', 'neovu');     // Your MySQL username
define('DB_PASSWORD', 'ganjas12'); // ...and password
define('DB_HOST', $xhost);     // 99% chance you won't need to change this value

// Change the prefix if you want to have multiple blogs in a single database.

$table_prefix  = 'wp_';   // example: 'wp_' or 'b2' or 'mylogin_'

// Change this to localize WordPress.  A corresponding MO file for the
// chosen language must be installed to wp-includes/languages.
// For example, install de.mo to wp-includes/languages and set WPLANG to 'de'
// to enable German language support.
define('WPLANG', 'pt_BR');

/* Stop editing */

$server = DB_HOST;
$loginsql = DB_USER;
$passsql = DB_PASSWORD;
$base = DB_NAME;

define('ABSPATH', dirname(__FILE__).'/');

// Get everything else
require_once(ABSPATH.'wp-settings.php');
?>
