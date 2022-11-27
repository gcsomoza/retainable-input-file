<?php
if (isset($_POST['submit'])) {
    echo "<pre>";
    print_r($_FILES);
    echo "</pre>";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="" method="POST" enctype="multipart/form-data">
        <input type="file" name="upload[]" id="upload_0" class="upload" onchange="retainableInputFile.storeChangedFile(this)">
        <br>
        <input type="file" name="upload[]" id="upload_1" class="upload" onchange="retainableInputFile.storeChangedFile(this)">
        <br>
        <input type="file" name="upload[]" id="upload_2" class="upload" onchange="retainableInputFile.storeChangedFile(this)">
        <br>
        <button type="submit" name="submit">Submit</button>
    </form>
</body>
<script src="RetainableInputFile.js"></script>
<script>
    const retainableInputFile = new RetainableInputFile('.upload');
</script>
</html>