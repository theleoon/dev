// DOM Content Load (Garantir que ao executar o mesmo não quebre por falta de referência do HTML)
jQuery(document).ready(function(){
  const ui = {
      fields: $("input")
    };
    console.log(ui.fields);


    let validateEntry = function(e){
      //debugger;
      //console.log(e.target.value);
      this.value = this.value.replace(/\D/g, "");
    }

    let validateLength = function(e){
      let cep = this.value;
      //debugger;
      if(cep.length < 8){
        $(this).addClass("error").focus();
      } else {
        $(this).removeClass("error");
        getAddress(cep);
      }
      console.log(cep)
    }

    let getAddress = function(cep){
      let endpoint = `http://viacep.com.br/ws/${cep}/json/`
      console.log(endpoint);
      $.ajax({
        url: endpoint,
        dataType: "JSON",
        error: getAddressError,
        success: getAddressSuccess,
        beforeSend: beforeSend,
        complete: complete
      });
    }

    let getAddressError = function(){
      console.log("Error getAddress");
    }
    let getAddressSuccess = function(data){
      //console.log("Success getAddress", data);
        $.each(data, function(key, value){
          //console.log(key, value);
          $(`#${key}`).val(value);
        });
    }

    let complete = function() {
      $("#carregando").hide();
      $("#concluido").fadeIn(300);
    }

    let beforeSend = function(){
      $("#carregando").fadeIn(500);
    }

    /** Mapeando os eventos do usuário (Eventos) */
    $("#cep") // Para cada evento, utilizar o .on()
        .on("input", validateEntry)
        .on("focusout", validateLength);

});
