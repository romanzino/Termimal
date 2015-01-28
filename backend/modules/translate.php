<?php
/**
 * Translate module
 */
require_once("../config.php");
require_once("helper.php");

$text = $_POST['text'];
$keys = $_POST['keys'];

if ($text && is_array($keys)) {
	$keysCount = count($keys);

	for ($i = 0; $i < $keysCount; $i++) {
		$text = str_replace($keys[$i], "", $text);
		$keys[$i] = str_replace("--", "", $keys[$i]);
	}

	if (strlen($text) > 1) {
		$translated_data = json_decode(file_get_contents("https://translate.yandex.net/api/v1.5/tr.json/translate?key=".$config['translate_api_key']."&lang=".$keys[0]."-".$keys[1]."&text=".$text), true);
		$response = "Translated from ". $keys[0]. " to " .$keys[1]. ": " .$translated_data['text']['0'];
		echo json_encode(array("response" => $response, error => false));
	}
	else {
		echo json_encode(array('response' => false, error => true));
	}
}
else {
	echo json_encode(array('response' => false, error => true));
}
?>