$(function() {
	// Validate the contact form
  $('#formContat').validate({
  	// Especifica quais erros podem ser vistos
  	// quando sao gerados dinamicamente dentro do formulário
  	errorElement: "div",
  	wrapper: "aside",
  	errorPlacement: function(error, element) {
  		error.insertBefore( element.parent().parent() );
  		error.wrap("div class='error'></div>");
  		$("").insertBefore(error);
  	},
  	
  	// Adiciona requerimentos nos campos
  	rules: {
            
                mensagem: {
  			required: true,
  			minlength: 10
  		},
  		nome: {
  			required: true,
  			minlength: 4
  		},
  		email: {
  			required: true,
  			email: true
  		}
  		
  	},
  	
  	// Espeficica que erros serão apresentados para o usuário
  	messages: {
            
                mensagem: {
  			required: "Por favor coloque uma mensagem",
  			minlength: jQuery.format("Sua mensagem deve ter no mínimo {0} dígitos.")
  		},
  		nome: {
  			required: "Por favor coloque seu nome",
  			minlength: jQuery.format("Seu nome deve ter no mínimo {0} dígitos.")
  		},
  		email: {
  			required: "Por favor coloque seu email",
  			email: "Tente colocar a @."
        
  		}
  	},
  	
  	// Use Ajax to send everything to processForm.php
  	 submitHandler: function(form) {
  	 	$("#send").attr("value", "Sending...");
  	 	$(form).ajaxSubmit({
  	 		success: function(responseText, statusText, xhr, $form) {
  	 			$(form).slideUp("fast");
  	 			$("#response").html(responseText).hide().slideDown("fast");
  	 		}
  	 	});
  	 	return false;
  	 }
  });
});