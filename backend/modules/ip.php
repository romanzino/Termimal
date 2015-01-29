<?php 

/**
 * Ip module
 */

//Helper
require_once("../config.php");
require_once("helper.php");

//Xss protection
$ip = xss_clean($_POST['ip']);

if ($ip === "my") {
	if ($_SERVER['HTTP_CLIENT_IP']) {
	    $ip = $_SERVER['HTTP_CLIENT_IP'];
	} 
	else if ($_SERVER['HTTP_X_FORWARDED_FOR']) {
	    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} 
	else {
	    $ip = $_SERVER['REMOTE_ADDR'];
	}
}



if ($ip) {
	$ip_info = json_decode(file_get_contents("http://ip-api.com/json/".$ip));

	if ($ip_info->status === "success") {
		echo json_encode(array('response' => $ip_info,  'error' => false));	
	}
	else {
		echo json_encode(array('response' => false,  'error' => true, 'errorText' => "Can't get information about ip"));
	}

}
else {
	echo json_encode(array('response' => false,  'error' => true, 'errorText' => "Can't identify your ip"));
}