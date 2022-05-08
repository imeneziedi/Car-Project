jQuery.fn.validate = function ()
{
    /* Mensajes por defecto */
    var _mensaje = {
        campo_obligatorio: 'This field is required',
        campo_numerico: 'This field is not numeric',
        campo_correo: 'This field is not an email',
        campo_longitud: 'This field must be {0} characters long',
        campo_min: 'This field must have at least {0} characters',
        campo_max: 'This field must have at most {0} characters',
        campo_valido: 'This field is not valid',
        campo_ip: 'This field is not a valid IP',
        campo_url: 'This field is not a valid URL',
        campo_social_twitter: 'This field is not a valid Twitter URL',
        campo_social_facebook: 'This field is not a valid Facebook URL',
        campo_social_youtube: 'This field is not a valid Youtube URL'
    };

    var form = $(this);

    try {
        /* Cuenta los posibles errores encontrados */
        var errores = 0;

        /* Los controles encontrados por nuestra Clase de CSS */
        var controles = $('[data-validacion-tipo]', form);

        /* Comenzamos a validar cada control */
        $.each(controles, function () {

            /* El control actual del arreglo */
            var obj = $(this);

            /* No nos interesa validar controles con el estado readonly/disabled */
            if (!obj.prop('readonly') || !obj.prop('disabled'))
            {
                if ($(this).data('validacion-tipo') != undefined) {
                    /* El tipo de validacion asignado a este control */
                    $.each($(this).data('validacion-tipo').split('|'), function (i, v) {

                        /* El control donde vamos agregar el texto */
                        var small = $('<small />');

                        /* El contenedor del control */
                        var form_group = obj.closest('.form-group');
                        form_group.removeClass('has-error'); /* Limpiamos el estado de error */

                        /* Capturamos el label donde queremos mostrar el mensaje */
                        var label = form_group.find('label');
                        label.find('small').remove(); /* Eliminamos el mensaje anterior */
                        label.append(small);

                        /* Validamos si es requerido */
                        if (v == 'requerido') {
                            if (obj.val().length == 0) {

                                /* Contamos que hay un error */
                                errores++;

                                /* Agregamos la clase de bootstrap de errores */
                                form_group.addClass('has-error');

                                /* Mostramos el mensaje */
                                if (obj.data('validacion-mensaje') == undefined) {
                                    small.text(_mensaje.campo_obligatorio);
                                } else {
                                    small.text(obj.data('validacion-mensaje'));
                                }

                                return false; /* Rompe el bucle */
                            }
                        }

                        /* Validamos si es numérico */
                        if (v == 'numero') {
                            if (!obj.val().match(/^([0-9])*[.]?[0-9]*$/) && obj.val().length > 0) {

                                errores++;
                                form_group.addClass('has-error');

                                /* Mostramos el mensaje */
                                if (obj.data('validacion-mensaje') == undefined) {
                                    small.text(_mensaje.campo_numerico);
                                } else {
                                    small.text(obj.data('validacion-mensaje'));
                                }

                                return false; /* Rompe el bucle */
                            }
                        }

                        /* Validamos si es un email */
                        if (v == 'email') {
                            if (!obj.val().match(/^[0-9a-z_\-\.]+@[0-9a-z\-\.]+\.[a-z]{2,4}$/i) && obj.val().length > 0) {

                                errores++;
                                form_group.addClass('has-error');

                                /* Mostramos el mensaje */
                                if (obj.data('validacion-mensaje') == undefined) {
                                    small.text(_mensaje.campo_correo);
                                } else {
                                    small.text(obj.data('validacion-mensaje'));
                                }

                                return false; /* Rompe el bucle */
                            }
                        }

                        /* Longitud de caracteres a tener */
                        if (v.indexOf('longitud') > -1 && obj.val().length > 0) {

                            // Necesitamos saber la longitud máxima
                            var _longitud = v.split(':');
                            if (obj.val().length != _longitud[1]) {

                                errores++;
                                form_group.addClass('has-error');

                                /* Mostramos el mensaje */
                                if (obj.data('validacion-mensaje') == undefined) {
                                    small.text(_mensaje.campo_longitud.replace('{0}', _longitud[1]));
                                } else {
                                    small.text(obj.data('validacion-mensaje'));
                                }

                                return false; /* Rompe el bucle */
                            }
                        }

                        /* Cantidad minima de caracteres */
                        if (v.indexOf('min') > -1 && obj.val().length > 0) {

                            // Necesitamos saber la longitud máxima
                            var _min = v.split(':');
                            if (obj.val().length < _min[1]) {

                                errores++;
                                form_group.addClass('has-error');

                                /* Mostramos el mensaje */
                                if (obj.data('validacion-mensaje') == undefined) {
                                    small.text(_mensaje.campo_min.replace('{0}', _min[1]));
                                } else {
                                    small.text(obj.data('validacion-mensaje'));
                                }

                                return false; /* Rompe el bucle */
                            }
                        }

                        /* Cantidad maxima de caracteres */
                        if (v.indexOf('max') > -1 && obj.val().length > 0) {

                            // Necesitamos saber la longitud máxima
                            var _min = v.split(':');
                            if (obj.val().length > _min[1]) {

                                errores++;
                                form_group.addClass('has-error');

                                if (obj.data('validacion-mensaje') == undefined) {
                                    small.text(_mensaje.campo_max.replace('{0}', _min[1]));
                                } else {
                                    small.text(obj.data('validacion-mensaje'));
                                }

                                return false; /* Rompe el bucle */
                            }
                        }

                        /* Validación mediante una funcion personalizada */
                        if (v.indexOf('funcion') > -1 && obj.val().length > 0) {

                            // Necesitamos saber la longitud máxima
                            var _funcion = v.split(':');

                            // Respuesta de la funcion
                            var _respuesta = false;

                            // Espera parámetros
                            if (_funcion.length >= 3) {
                                _respuesta = window[_funcion[1]].apply(this, _funcion[2].split(','));
                            } else {
                                _respuesta = window[_funcion[1]]();
                            }

                            /* Mostramos el mensaje */
                            if (!_respuesta || _respuesta == undefined) {

                                errores++;
                                form_group.addClass('has-error');

                                if (obj.data('validacion-mensaje') == undefined) {
                                    small.text(_mensaje.campo_valido);
                                } else {
                                    small.text(obj.data('validacion-mensaje'));
                                }

                                return false;
                            }
                        }

                        /* Válidamos una IP */
                        if (v == 'ip') {
                            if (!obj.val().match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/) && obj.val().length > 0) {

                                errores++;
                                form_group.addClass('has-error');

                                /* Mostramos el mensaje */
                                if (obj.data('validacion-mensaje') == undefined) {
                                    small.text(_mensaje.campo_ip);
                                } else {
                                    small.text(obj.data('validacion-mensaje'));
                                }

                                return false; /* Rompe el bucle */
                            }
                        }

                        /* Válidamos una URL válida */
                        if (v == 'url') {
                            if (!obj.val().match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/) && obj.val().length > 0) {

                                errores++;
                                form_group.addClass('has-error');

                                /* Mostramos el mensaje */
                                if (obj.data('validacion-mensaje') == undefined) {
                                    small.text(_mensaje.campo_url);
                                } else {
                                    small.text(obj.data('validacion-mensaje'));
                                }

                                return false; /* Rompe el bucle */
                            }
                        }

                        /* Comparamos con otro control */
                        if (v.indexOf('compara') > -1 && obj.val().length > 0) {
                            var _comparacion = true;
                            var _aComparar = v.split(':');

                            $(_aComparar[1], form).each(function () {
                                if (obj.val() != $(this).val()) {

                                    errores++;
                                    form_group.addClass('has-error');

                                    if (obj.data('validacion-mensaje') == undefined) {
                                        small.text(_mensaje.campo_valido);
                                    } else {
                                        small.text(obj.data('validacion-mensaje'));
                                    }
                                }
                            })
                        }

                    })
                }                
            }
        })

        /* Verificamos si ha sido validado */
        return (errores == 0);
    } catch (e) {
        console.error(e);
        return false;
    }
}