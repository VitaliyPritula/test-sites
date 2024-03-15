<?php ()
  use  PHPMailer\PHPMailer\PHPMailer;
  use  PHPMailer\PHPMailer\Exception;
  
  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';
  
  $mail new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  // от кого письмо
  $mail->setForm('vprutyla101@gmail.com');
  // кому отправить
  $mail->addAdress('pritula.vitaly94@gmail.com');
  // Тема письма
  $mail->Subject = 'Привет Как дела';

  // // Рука
  // $yes1 = "Да";
  // if($_POST['yes1'] == "yes1"){
  //   $yes1 = "Левая";
  // }

  // Тело письма
  $body = '<h1>Встречайте супер письмо!</h1>';

  if(trim(!empty($_POST['name']))) {
    $body.='<p><strong>Имя:</strong> ' .$_POST['name'].'</p>';
  }
  if(trim(!empty($_POST['email']))) {
    $body.='<p><strong>E-mail:</strong> ' .$_POST['email'].'</p>';
  }
  // if(trim(!empty($_POST['yes1']))) {
  //   $body.='<p><strong>Рука</strong>' .$yes1.'</p>';
  // }
  // if(trim(!empty($_POST['age']))) {
  //   $body.='<p><strong>Возраст:</strong>' .$_POST['age'].'</p>';
  // }
  // if(trim(!empty($_POST['message']))) {
  //   $body.='<p><strong>Сообщение:</strong>' .$_POST['message'].'</p>';
  // }

  // // Прикрепить файл
  // if(!empty($_FILES['image']['tmp_mname'])) {
  //   // путь загрузки файла
  //   $filePath = __DIR__ . "/files" . $_FILES['image']['name'];
  //   // грузим файл
  //   if(copy($_FILES['image']['tmp_mname'], $filePath)){
  //     $fileAttach = $filePath;
  //     $body.='<p><strong>фото в приложении</strong>';
  //     $mail->addAttachment($fileAttach);
  //   }
  // }

  $mail->Body = $body;

  // отравляем
  if(!$mail->send()){
    $message = 'ошибка';
  } else {
    $message = 'Данные отправлены!';
  }
  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>
