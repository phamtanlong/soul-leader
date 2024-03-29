<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Test CodeIgniter</title>
 
    <style type="text/css">
 
    ::selection{ background-color: #E13300; color: white; }
    ::moz-selection{ background-color: #E13300; color: white; }
    ::webkit-selection{ background-color: #E13300; color: white; }
 
    body {
        background-color: #fff;
        margin: 40px;
        font: 13px/20px normal Helvetica, Arial, sans-serif;
        color: #4F5155;
    }
 
    a {
        color: #003399;
        background-color: transparent;
        font-weight: normal;
    }
 
    h1 {
        color: #444;
        background-color: transparent;
        border-bottom: 1px solid #D0D0D0;
        font-size: 19px;
        font-weight: normal;
        margin: 0 0 14px 0;
        padding: 14px 15px 10px 15px;
    }
 
    code {
        font-family: Consolas, Monaco, Courier New, Courier, monospace;
        font-size: 12px;
        background-color: #f9f9f9;
        border: 1px solid #D0D0D0;
        color: #002166;
        display: block;
        margin: 14px 0 14px 0;
        padding: 12px 10px 12px 10px;
    }
 
    #body{
        margin: 0 15px 0 15px;
    }
     
    p.footer{
        text-align: right;
        font-size: 11px;
        border-top: 1px solid #D0D0D0;
        line-height: 32px;
        padding: 0 10px 0 10px;
        margin: 20px 0 0 0;
    }
     
    #container{
        margin: 10px;
        border: 1px solid #D0D0D0;
        -webkit-box-shadow: 0 0 8px #D0D0D0;
    }
    </style>
</head>
<body>
 
<div id="container">
    <h1>Test CodeIgniter 2.1 + Ckeditor 3.6.1 + kcfinder 2.51</h1>
 
    <div id="body"><h2>Textarea con CodeIgniter</h2>
        <?php
        $config_mini = array();  
 
        $config_mini['toolbar'] = array(
            array( 'Source', '-', 'Bold', 'Italic', 'Underline', 'Strike' ,'-', 'Link', 'Unlink', 'Anchor','Image')
        );
         
// B?n c� th? d�ng m?ng full t�y ch?n
// $config_mini =array(
            array( 'Source', '-', 'Bold', 'Italic', 'Underline', '-','Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo','-','NumberedList','BulletedList');
//---- Ho?c t�y bi?n k�ch thu?c
//  $this->ckeditor->config['width'] = '730px';
//        $this->ckeditor->config['height'] = '300px';

        /* Y la configuraci�n del kcfinder, la debemos poner as� si estamos trabajando en local */
        $config_mini['filebrowserBrowseUrl'] = base_url()."ckeditor/kcfinder/browse.php";
        $config_mini['filebrowserImageBrowseUrl'] = base_url()."ckeditor/kcfinder/browse.php?type=images";
        $config_mini['filebrowserUploadUrl'] = base_url()."ckeditor/kcfinder/upload.php?type=files";
        $config_mini['filebrowserImageUploadUrl'] = base_url()."ckeditor/kcfinder/upload.php?type=images";
 
        echo $this->ckeditor->editor("ejemplo", "Valor Inicial", $config_mini);
        ?>
    </div>
 
    <p class="footer">Page rendered in <strong>{elapsed_time}</strong> seconds</p>
</div>
 
</body>
</html>