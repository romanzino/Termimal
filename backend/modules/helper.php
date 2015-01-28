<?php
/**
 * Xss security
 * @param  string $data
 * @return string Cleared data
 */
function xss_clean ($data) {
	$data = trim(strip_tags($data));
	return str_replace(" ", "+", $data);
}
