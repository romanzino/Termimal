<?php 

/**
 * Time module
 */

//Helper
require_once("../config.php");
require_once("helper.php");

//Xss protection
$latitude = xss_clean($_POST['latitude']);
$longitude = xss_clean($_POST['longitude']);

if ($latitude && $longitude) {
	//Get time from coordinates
	$json = file_get_contents("http://api.geonames.org/timezoneJSON?lat=".$latitude."&lng=".$longitude."&username=".$config['geonames_username']);
	$data = json_decode($json);

	echo json_encode(array('response' => $data, error => false));
}
else {
	echo json_encode(array('response' => false, error => true));
}