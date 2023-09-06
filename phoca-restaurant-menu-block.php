<?php
/**
 * Plugin Name:       Phoca Restaurant Menu Block
 * Description:       Creating menus (Daily Menu, Weekly Menu, Bill of Fare, Beverage List or Wine List) for restaurants, cafeterias, fast foods, school canteens, buffets or wine rooms. An integral part of this parent block is its inner block: Phoca Restaurant Menu - Groups and Items Block.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           6.0.0
 * Author:            Jan Pavelka ( <a href="https://www.phoca.cz">Phoca</a> )
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       phoca-restaurant-menu-block
 *
 * @package           phoca
 */

function phoca_restaurant_menu_block_init() {
	register_block_type( __DIR__ . '/build' );	
}

function phoca_restaurant_menu_block_set_script_translations() {
	wp_set_script_translations( 'phoca-restaurant-menu-block', 'phoca-restaurant-menu-block',
    plugin_dir_path( __FILE__ ) . '/languages/' );
}

add_action( 'init', 'phoca_restaurant_menu_block_init' );
add_action( 'init', 'phoca_restaurant_menu_block_set_script_translations' );
