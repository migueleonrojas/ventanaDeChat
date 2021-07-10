isMobile = "";

function empezar(){

    var isMobile = {

        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },

        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },

        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },

        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },

        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },

        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    bot_init("209.50.52.99:4620", "email_i", "name_i","message_input","message_box", "login_buttom","send_buttom");

    document.cookie="name=io;Domain & Path=209.50.52.99/; SameSite=None; Secure";

    $('#'+"message_input").prop( "disabled", true );     

    var socket_id = undefined;
    var socket = undefined;

    name_ = "";
    email_ = "";
    message_warning = "";

    function bot_init(ip,email_i,name_i,message_input,message_box,login_buttom,send_buttom){

        var socket = io('http://'+ip);

        $('#'+login_buttom).click(function(){

            if( $('#'+email_i).val().trim() != ""  && $('#'+name_i).val().trim() && name_ =="" && email_ == ""){


                socket.emit('login', {email: $('#'+email_i).val(), name: $('#'+name_i).val(), company: 2});

                if($("."+"content-time").length == 0){

                    $('.'+'form_user').last().append("<div class='content-time'><span class = 'time'>"+ horaActual() + "</span></div>");

                }

                name_ = $('#'+name_i).val();
                email_ = $('#'+email_i).val();

                $('#'+email_i).val('');
                $('#'+name_i).val('');
                $('#'+email_i).prop( "disabled", true );
                $('#'+name_i).prop( "disabled", true );
                $('#'+login_buttom).prop( "disabled", true );      
                $('#'+message_box).animate({ scrollTop: $('#'+message_box).prop("scrollHeight")}, 200);

                if( message_warning == ""){

                    message_warning = setTimeout(function(){ 
                            $('#'+message_box).append("<div class='response'>"+"El bot no se encuentra disponible en estos momentos"+"</div>");
                            $('.'+'response').last().append("<div class='content-time'><span class = 'time'>"+ horaActual() + "</span></div>");
                            $('#'+message_box).animate({ scrollTop: $('#'+message_box).prop("scrollHeight")}, 200);
                        }, 
                            300000
                    );
                }

                return false;
            }

        });

        $('#'+send_buttom).click(function(){

            if($('#'+message_input).val().trim() != ""){

                $('#'+message_box).append("<div class='message_user'>"+$('#'+message_input).val()+"</div>");
                $('.'+'message_user').last().append("<div class='content-time'><span class = 'time'>"+ horaActual() + "</span></div>");
                socket.emit('send_message', {email: $('#'+email_i).val(), message: $('#'+message_input).val()});
                $('#'+message_input).val('');

                if( message_warning == ""){

                    message_warning = setTimeout(function(){ 

                            $('#'+message_box).append("<div class='response'>"+"El bot no se encuentra disponible en estos momentos"+"</div>");
                            $('.'+'response').last().append("<div class='content-time'><span class = 'time'>"+ horaActual() + "</span></div>");
                            $('#'+message_box).animate({ scrollTop: $('#'+message_box).prop("scrollHeight")}, 200);
                        }, 
                            300000
                    );
                }

                $('#'+message_box).animate({ scrollTop: $('#'+message_box).prop("scrollHeight")}, 200);
                return false;
            }
        });

    
        $('#'+message_input).bind('keypress',function(e){

            if(e.which == 13 && e.keyCode == 13 && !e.shiftKey && $('#'+message_input).val().trim() != ""){
                e.preventDefault();
                        
                $('#'+message_box).append("<div class='message_user'>"+$('#'+message_input).val()+"</div>");
                $('.'+'message_user').last().append("<div class='content-time'><span class = 'time'>"+ horaActual() + "</span></div>");
                        
                socket.emit('send_message', {email: $('#'+email_i).val(), message: $('#'+message_input).val()});
                $('#'+message_input).val('');

                if( message_warning == ""){

                    message_warning = setTimeout(function(){ 

                            $('#'+message_box).append("<div class='response'>"+"El bot no se encuentra disponible en estos momentos"+"</div>");
                            $('.'+'response').last().append("<div class='content-time'><span class = 'time'>"+ horaActual() + "</span></div>");
                            $('#'+message_box).animate({ scrollTop: $('#'+message_box).prop("scrollHeight")}, 200);
                        }, 

                            300000
                    );
                }

                $('#'+message_box).animate({ scrollTop: $('#'+message_box).prop("scrollHeight")}, 200);

                return false;

                        
            }
        });


        socket.on('session_new', function(id){
            socket_id = id;
        });

        socket.on('logged', function(msg){
            clearTimeout(message_warning);
            message_warning = "";
            $('#'+message_box).append("<div class='response'>"+msg+"</div>");
            $('.'+'response').last().append("<div class='content-time'><span class = 'time'>"+ horaActual() + "</span></div>");
            $('#'+message_input).prop( "disabled", false ); 
            $('#'+message_box).animate({ scrollTop: $('#'+message_box).prop("scrollHeight")}, 200);
        });

        socket.on('message_response', function(msg){
            clearTimeout(message_warning);
            message_warning = "";
            $('#'+message_box).append("<div class='response'>"+msg+"</div>");
            $('.'+'response').last().append("<div class='content-time'><span class = 'time'>"+ horaActual() + "</span></div>");
            //$('.'+'checks').last().append(palomitas());
            //cambiarColor();
            $('#'+message_input).prop( "disabled", false ); 
            $('#'+message_box).animate({ scrollTop: $('#'+message_box).prop("scrollHeight")}, 200);
        });

    }

    $('.'+'header').bind('click',mostrarOcultar);
    $('#'+'btn_ws').bind('click',mostrarOcultar);


    function mostrarOcultar(){

                
        if(detectarDispositivo() == "computadora"){
                    
            if( $('.'+'windows_milpagos').css("display") == "none"){

                $('.'+'windows_milpagos').fadeIn(500);

            }

            else{
                
                $('.'+'windows_milpagos').fadeOut(500);
                        
    
            }
        }

        else{
                            
            window.open('https://api.whatsapp.com/send?phone=+584123446729', '_blank');

        }
    }
            


    function detectarDispositivo(){
                        
        var dispositivo = "";
        
        if (window.screen.width <= 768 || isMobile.any()){
            
            dispositivo = "telefono movil"     
        
        }
        
        else{
            
            dispositivo = "computadora";
                        
        }
                        
        return dispositivo;
        
    }

    function horaActual(){

        var hora = "";
        var minutos = "";
        var meridiem = "";

        if(new Date().getHours() < 12){

            hora = new Date().getHours().toString();
            meridiem = "A. M ";


            if(new Date().getMinutes() > 9){
                    
                minutos =   new Date().getMinutes().toString();
            }

            else{
                minutos = "0" + new Date().getMinutes().toString();
            }
        }

        else if(new Date().getHours() < 24){
                    
            hora = (new Date().getHours()-12).toString();

            if(hora == 0){hora++}

            meridiem = "P. M ";


            if(new Date().getMinutes() > 9){

                minutos =  new Date().getMinutes().toString();
                        
            }

            else{
                        
                minutos = "0" + new Date().getMinutes().toString();
            }

        }

        return hora + ":"+ minutos + " " + meridiem; 

    }


}

window.addEventListener("load", empezar, false);
