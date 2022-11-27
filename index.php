<?php
$saved = false;
if (isset($_POST['submit'])) {
    // echo "<pre>";
    // print_r($_FILES);
    // echo "</pre>";

    $saved = true;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        img {
            width: 100px;
        }
    </style>
</head>
<body>
    <form action="" method="POST" enctype="multipart/form-data">
        <input type="file" name="upload[]" id="upload_0" class="upload" data-target-img="#img_0" onchange="handleUploadFile(event)">
        <img src="" id="img_0">
        <br>
        <input type="file" name="upload[]" id="upload_1" class="upload" data-target-img="#img_1" onchange="handleUploadFile(event)">
        <img src="" id="img_1">
        <br>
        <input type="file" name="upload[]" id="upload_2" class="upload" data-target-img="#img_2" onchange="handleUploadFile(event)">
        <img src="" id="img_2">
        <br>
        <button type="submit" name="submit">Submit</button>
    </form>
</body>
<script src="RetainableInputFile.js"></script>
<script>
    const retainableInputFile = new RetainableInputFile('.upload', {
        defaultImage: 'https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg'
    });

    <?php if ($saved): ?>
        retainableInputFile.clearStoredFiles();
        alert('File Saved');
        window.location.href = '/list.php';
    <?php endif; ?>

    function handleUploadFile(event) {
        retainableInputFile.storeChangedFile(event.target);
    }
</script>
</html>