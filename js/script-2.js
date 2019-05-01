(function() {
  validate.extend(validate.validators.datetime, {
    parse: function(value, options) {
      return +moment.utc(value);
    },
    format: function(value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });
  var constraints = {
    "email": {  
      presence:  {
        message: "是必填的欄位"
      }, // Email 是必填欄位
      email: true // 需要符合 email 格式
    }
    ,
    "姓名": {
      presence: {
        message: "是必填的欄位"
      }// 必填使用者名稱
     
    },
    "服務項目": {
      presence: {
        message: "是必填的欄位"
      }, // 服務項目為必填
   
    },
    "電話": {
      presence:{
        message: "是必填的欄位"
      },
    },
  };

  // Hook up the form so we can prevent it from being posted
  var form = document.querySelector("form#main");
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });
  
  // 監聽 input 值改變的狀況
  var inputs = document.querySelectorAll("input, textarea, select")
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {
      var errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name])
    });
  }

  // 沒有錯誤就顯示成功傳送
  function handleFormSubmit(form, input) {
    var errors = validate(form, constraints);// validate the form aainst the constraints
    showErrors(form, errors || {}); // then we update the form to reflect the results
    if (!errors) {
      showSuccess();
    }
  }

  // Updates the inputs with the validation errors
  function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
      // Since the errors can be null if no errors were found we need to handle
      // that
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  // Shows the errors for a specific input
  function showErrorsForInput(input, errors) {
    // This is the root of the input
    var formGroup = closestParent(input.parentNode, "form__group")
      // Find where the error messages will be insert into
      , messages = formGroup.querySelector(".messages");
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add("has-error");
      // then we append all the errors
      _.each(errors, function(error) {
        addError(messages, error);
      });
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add("has-success");
    }
  }

  // Recusively finds the closest parent that has the specified class
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    // and remove any old messages
    _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
      el.parentNode.removeChild(el);
    });
  }

  // Adds the specified error with the following markup
  // <p class="help-block error">[message]</p>
  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    console.log(block);
    messages.appendChild(block);
  }
  function showSuccess() {
    alert("寄出成功，我們將盡快與您聯絡"); // We made it \:D/
  }
})();