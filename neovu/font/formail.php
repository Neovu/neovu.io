<? 
// NAO ALTERE OS DADOS ABAIXO 
// DIREITOS AUTORAIS 
// Data:  17 de Abril de 2009 
// Autor: Rodrigo Adr. Araujo ( suporte (at) itmnetworks.com.br ) 
// URL: http://www.itmnetworks.com.br/suporte 
$pmensagem = "----\r\n"; 
foreach ($_POST as $pcampo => $pvalor) { $pmensagem .= strtoupper($pcampo) . " : " . $pvalor . "\r\n\r\n"; } 
// NAO ALTERE OS DADOS ACIMA 

# ALTERE OS DADOS ABAIXO 
// endereco do servidor de smtp de seu site 
$smtp_servidor = "mail.neovu.com.br";  
  
// conta de email que vai autenticar no servidor de smtp 
$smtp_email = "contato@neovu.com.br"; 

// senha da conta de email que vai autenticar no servidor de smtp 
$smtp_senha = "sebastiao0@"; 

// conta de email que vai receber as informacoes digitadas no formulario 
$emaildedestino = "contato@neovu.com.br"; 

// Se o email for enviado com SUCESSO sera aberto este endereco 
// nao precisa obrigatoriamente chamar sucesso.php , pode ser 
// feito em qq linguagem de programacao .asp  .htm  .html etc 
$urlsucesso = "http://www.neovu.com.br/apresentacao-neovu";  

// Se o email NAO FOR ENVIADO com sucesso sera aberto este endereco 
// nao precisa obrigatoriamente chamar errodeenvio.php , pode ser 
// feito em qq linguagem de programacao .asp  .htm  .html etc 
$urlfalha = "http://www.neovu.com.br/errodeenvio.php"; 


// NAO ALTERE OS DADOS ABAIXO 
$pmensagem .= "----\r\n"; 
$pmensagem .= "Sender-IP: ".$_SERVER["REMOTE_ADDR"]."\r\n"; 
$cMail = new COM("Persits.MailSender"); 
$cMail->Host = $smtp_servidor; 
$cMail->Username = $smtp_email; 
$cMail->Password = $smtp_senha; 
$cMail->From = $emaildedestino; 
$cMail->FromName = "FORMULARIO DE CONTATO"; 
$cMail->AddAddress($emaildedestino); 
$cMail->Subject = "CONTATO VIA FORMULARIO DO SITE: ".$_SERVER["HTTP_HOST"]; 
$cMail->Body = $pmensagem; 
$urldestino=$urlfalha; 
if (strpos($_SERVER["HTTP_REFERER"],$_SERVER["HTTP_HOST"])) { if ($cMail->Send()) { $urldestino=$urlsucesso; } } 
header("Location: ".$urldestino); 
// NAO ALTERE OS DADOS ACIMA 
?>