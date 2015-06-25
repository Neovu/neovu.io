<?php
function wc_email_inquiry_install(){
	update_option('a3rev_wc_email_inquiry_version', '1.1.0.2');
	update_option('a3rev_wc_email_inquiry_ultimate_version', '1.0.9.2');
	update_option('a3rev_wc_orders_quotes_version', '1.1.7.7');

	// Set Settings Default from Admin Init
	global $wc_ei_admin_init;
	$wc_ei_admin_init->set_default_settings();
	
	
	update_option('a3rev_wc_email_inquiry_just_installed', true);
}

update_option('a3rev_wc_email_inquiry_plugin', 'wc_email_inquiry');

/**
 * Load languages file
 */
function wc_email_inquiry_init() {
	if ( get_option('a3rev_wc_email_inquiry_just_installed') ) {
		delete_option('a3rev_wc_email_inquiry_just_installed');
		wp_redirect( admin_url( 'admin.php?page=email-cart-options', 'relative' ) );
		exit;
	}
	load_plugin_textdomain( 'wc_email_inquiry', false, WC_EMAIL_INQUIRY_FOLDER.'/languages' );
}
// Add language
add_action('init', 'wc_email_inquiry_init');

// Add custom style to dashboard
add_action( 'admin_enqueue_scripts', array( 'WC_Email_Inquiry_Hook_Filter', 'a3_wp_admin' ) );

// Add admin sidebar menu css
add_action( 'admin_enqueue_scripts', array( 'WC_Email_Inquiry_Hook_Filter', 'admin_sidebar_menu_css' ) );

// Add text on right of Visit the plugin on Plugin manager page
add_filter( 'plugin_row_meta', array('WC_Email_Inquiry_Hook_Filter', 'plugin_extra_links'), 10, 2 );

	
	// Need to call Admin Init to show Admin UI
	global $wc_ei_admin_init;
	$wc_ei_admin_init->init();

	$woocommerce_db_version = get_option( 'woocommerce_db_version', null );
		
	// Add upgrade notice to Dashboard pages
	add_filter( $wc_ei_admin_init->plugin_name . '_plugin_extension', array( 'WC_Email_Inquiry_Functions', 'plugin_extension' ) );
				
	// Include style into header
	add_action('get_header', array('WC_Email_Inquiry_Hook_Filter', 'add_style_header') );
	
	// Include google fonts into header
	add_action( 'wp_head', array( 'WC_Email_Inquiry_Hook_Filter', 'add_google_fonts'), 11 );
	
	// Add Custom style on frontend
	add_action( 'wp_head', array( 'WC_Email_Inquiry_Hook_Filter', 'include_customized_style'), 11);
	
	// Include script into footer
	add_action('get_footer', array('WC_Email_Inquiry_Hook_Filter', 'script_contact_popup'), 2);
	
	// Change item meta value as long url to short url
	add_filter('woocommerce_order_item_display_meta_value', array('WC_Email_Inquiry_Hook_Filter', 'change_order_item_display_meta_value' ) );
	
	// AJAX hide yellow message dontshow
	add_action('wp_ajax_wc_ei_yellow_message_dontshow', array('WC_Email_Inquiry_Functions', 'wc_ei_yellow_message_dontshow') );
	add_action('wp_ajax_nopriv_wc_ei_yellow_message_dontshow', array('WC_Email_Inquiry_Functions', 'wc_ei_yellow_message_dontshow') );
	
	// AJAX hide yellow message dismiss
	add_action('wp_ajax_wc_ei_yellow_message_dismiss', array('WC_Email_Inquiry_Functions', 'wc_ei_yellow_message_dismiss') );
	add_action('wp_ajax_nopriv_wc_ei_yellow_message_dismiss', array('WC_Email_Inquiry_Functions', 'wc_ei_yellow_message_dismiss') );
	
	// AJAX wc_email_inquiry contact popup
	add_action('wp_ajax_wc_email_inquiry_popup', array('WC_Email_Inquiry_Hook_Filter', 'wc_email_inquiry_popup') );
	add_action('wp_ajax_nopriv_wc_email_inquiry_popup', array('WC_Email_Inquiry_Hook_Filter', 'wc_email_inquiry_popup') );
	
	// AJAX wc_email_inquiry_action
	add_action('wp_ajax_wc_email_inquiry_action', array('WC_Email_Inquiry_Hook_Filter', 'wc_email_inquiry_action') );
	add_action('wp_ajax_nopriv_wc_email_inquiry_action', array('WC_Email_Inquiry_Hook_Filter', 'wc_email_inquiry_action') );
	
	// Hide Add to Cart button on Shop page
	add_action('woocommerce_before_template_part', array('WC_Email_Inquiry_Hook_Filter', 'shop_before_hide_add_to_cart_button'), 100, 4 );
	add_action('woocommerce_after_template_part', array('WC_Email_Inquiry_Hook_Filter', 'shop_after_hide_add_to_cart_button'), 1, 4 );
	
	// Hide Add to Cart button on Details page
	add_action('woocommerce_before_add_to_cart_button', array('WC_Email_Inquiry_Hook_Filter', 'details_before_hide_add_to_cart_button'), 100 );
	add_action('woocommerce_after_add_to_cart_button', array('WC_Email_Inquiry_Hook_Filter', 'details_after_hide_add_to_cart_button'), 1 );
	
	// Hide Quantity Control and Add to Cart button for Child Product of Grouped Product Type in Details Page
	add_action('woocommerce_before_add_to_cart_form', array('WC_Email_Inquiry_Hook_Filter', 'grouped_product_hide_add_to_cart_style'), 100 );
	add_filter('single_add_to_cart_text', array('WC_Email_Inquiry_Hook_Filter', 'grouped_product_hide_add_to_cart'), 100, 2 );
	add_filter('woocommerce_product_single_add_to_cart_text', array('WC_Email_Inquiry_Hook_Filter', 'grouped_product_hide_add_to_cart'), 100, 2 ); // for Woo 2.1
	add_action('woocommerce_before_template_part', array('WC_Email_Inquiry_Hook_Filter', 'before_grouped_product_hide_quatity_control'), 100, 4 );
	add_action('woocommerce_after_template_part', array('WC_Email_Inquiry_Hook_Filter', 'after_grouped_product_hide_quatity_control'), 1, 4 );
	
	// Add Email Inquiry Button on Shop page
	$wc_email_inquiry_customize_email_button_settings = get_option( 'wc_email_inquiry_customize_email_button', array( 'inquiry_button_position' => 'below' ) );
	$wc_email_inquiry_button_position = $wc_email_inquiry_customize_email_button_settings['inquiry_button_position'];
	if ($wc_email_inquiry_button_position == 'above' )
		add_action('woocommerce_before_template_part', array('WC_Email_Inquiry_Hook_Filter', 'shop_add_email_inquiry_button_above'), 9, 4);
	else
		add_action('woocommerce_after_shop_loop_item', array('WC_Email_Inquiry_Hook_Filter', 'shop_add_email_inquiry_button_below'), 12);
	
	// Add Email Inquiry Button on Product Details page
	if ($wc_email_inquiry_button_position == 'above' )
		add_action('woocommerce_before_template_part', array('WC_Email_Inquiry_Hook_Filter', 'details_add_email_inquiry_button_above'), 9, 4 );
	else
		add_action('woocommerce_after_template_part', array('WC_Email_Inquiry_Hook_Filter', 'details_add_email_inquiry_button_below'), 2, 4);
	
	
	// Add meta boxes to product page
	add_action( 'admin_menu', array('WC_Email_Inquiry_MetaBox', 'add_meta_boxes') );
	
	// Include script admin plugin
	if (in_array(basename($_SERVER['PHP_SELF']), array('post.php', 'page.php', 'page-new.php', 'post-new.php'))){
		add_action('admin_footer', array('WC_Email_Inquiry_Hook_Filter', 'admin_footer_scripts'));
	}
	
	// Check upgrade functions
	add_action('plugins_loaded', 'wc_ei_upgrade_plugin');
	function wc_ei_upgrade_plugin () {
		
		// Upgrade to 1.0.3
		if(version_compare(get_option('a3rev_wc_email_inquiry_version'), '1.0.3') === -1){
			WC_Email_Inquiry_Functions::upgrade_version_1_0_3();
			WC_Email_Inquiry_Functions::reset_products_to_global_settings();
			update_option('a3rev_wc_email_inquiry_version', '1.0.3');
		}
		
		// Upgrade Ultimate to 1.0.8
		if(version_compare(get_option('a3rev_wc_email_inquiry_version'), '1.0.8') === -1){
			WC_Email_Inquiry_Functions::lite_upgrade_version_1_0_8();
			update_option('a3rev_wc_email_inquiry_version', '1.0.8');	
		}
		
		if(version_compare(get_option('a3rev_wc_email_inquiry_version'), '1.0.9.2') === -1){
			update_option('a3rev_wc_email_inquiry_version', '1.0.9.2');
			
			WC_Email_Inquiry_Functions::upgrade_version_1_0_9_2();
		}
	
		update_option('a3rev_wc_email_inquiry_version', '1.1.0.2');	
		update_option('a3rev_wc_email_inquiry_ultimate_version', '1.0.9.2');
		update_option('a3rev_wc_orders_quotes_version', '1.1.7.7');
		
	}

?>
