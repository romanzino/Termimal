<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Javascript + PHP Terminal emulator</title>
	<script data-main='js/bootstrap' src="js/lib/require.js"></script>
	<link rel="stylesheet" href="css/screen.css">
</head>
<body>
<?php require_once("backend/config.php"); ?>

<?php foreach ($config as $value): ?>
	<?php if (strlen($value) < 1): ?>
		<?php $error = true; ?>
		<h2 class='fatal-error'>
			<span class='error'>Error: </span> can't start app. You must set api keys in config.php file
		</h2>
		<?php break; ?>
	<?php endif; ?>
<?php endforeach; ?>
	<?php if (!$error): ?>
	<div class="terminal">
		<div class="terminal-title">
			<span class='username'>username</span>@myPC: ~
		</div>
		<div class="scrolled-area">
			<div class="history">
				<div id="command">
					
				</div>
				<div class="command-enter-wrapper">
					<span class="username-wrapper">
						<span class='username'>uknownuser</span>: ~$ 
					</span>
					<form action="#" id='commandForm' class='command-form'>
						<input type="text" name='command' class='command-input' id='commandInput' autocomplete='off' autofocus>
						<button class='send-request' type='submit'>Ok</button>
					</form>
				</div>
			</div>
		</div>
	</div>
	<h1>Javascript terminal emulator</h1>
	<?php endif; ?>
</body>
</html>