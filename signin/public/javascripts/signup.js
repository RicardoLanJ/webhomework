$(function(){
  $('input:not(.button)').blur(function(){
    var self = this;
    if (validator.isFieldValid(this.id, $(this).val())) {    //have change status
      $.post('/api/validate-unique', {field: this.id, value: $(this).val() }, function(data, status){
        if (status == 'success'){
          if (data.isUnique){
            $(self).removeClass('wrong').addClass('right').parent().find('.errorAndTip').text('').hide();
          } else {
            $(self).addClass('wrong').parent().find('.errorAndTip').text(validator.form[self.id].chinese + "不唯一").show();
            validator.form[self.id].statuus = false;
          }
        }
      });
    } else {
      var errorMessage = (this.id === 'repeatPassword')? '两次输入的密码不一致' : '格式不正确';
      $(this).addClass('wrong').parent().find('.errorAndTip').text(errorMessage).show();
    }
  }).click(function(){
    $(this).parent().find('.errorAndTip').text(validator.form[this.id].errorMessage).show();
  });

  $('#submit').click(function(){
    $('input:not(.button)').blur();
    if (!validator.isFormValid() && this.type == 'submit') return false;
  });

  $('#reset').click(function(){
    $('.errorAndTip').hide();
    $('.wrong').removeClass('wrong');
    $('.right').removeClass('right');
    validator.init();
  });
});