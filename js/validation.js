
// Đối tượng Validator
function Validator(options) {

    var selectorRules = {};

    // Xử lý blur ra khỏi input
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;
        
        // Lấy ra các rules của selectorRules
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rules để kiểm tra xem có lỗi không, có lỗi thì dừng luôn
        for(var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }

        if(errorMessage) {
            errorElement.innerHTML = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerHTML = "";
            inputElement.parentElement.classList.remove('invalid');
        }

        // Phủ định lại chuyển errorMessage sang boolean 
        return !!errorMessage; 

    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if(formElement) {

        // Bỏ đi hành động mặc định khi bấm submite form
        formElement.onsubmit = function(e) {
            e.preventDefault();

            // Check xem Formvalid có đúng không 
            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(isValid) {
                    isFormValid = false;
                }
            });

            // Trường hợp formValid đúng,sai thì không làm gì cả
            if(isFormValid) {
                
                // Trường hợp submit với javascript
                if(typeof options.onSubmit === 'function') {

                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')

                    var formValues = Array.from(enableInputs).reduce(function(values, enableinput) {
                        (values[enableinput.name] = enableinput.value);
                        return values;
                    }, {});
                    options.onSubmit(formValues);
                    // changeStatus();
                } 
                // Trường hợp submite với hành vi mặc định
                // else {
                //     formElement.submit();
                // }
        
            } 
        }

        // Xử lý lặp qua mỗi rule và xử lý( lắng nghe sự kiện: blur, input)
        options.rules.forEach(function (rule) {

            // Lưu lại các rule cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            
            var inputElement = formElement.querySelector(rule.selector);
            
            if(inputElement) {
                // Xử lý trường hợp blur ra khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                // Xử lý mỗi khi người dùng nhập
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerHTML = "";
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
        // console.log(selectorRules);
    }
}


// Định nghĩa các rules

Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : message || "Vui lòng nhập trường này";
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || "Trường này phải là email";
        }
    };
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined :  `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfimValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfimValue() ? undefined : message || "Giá trị nhập lại không đúng";
        }
    }
}

Validator.isCheckPassword = function (selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            return regex.test(value) ? undefined : message || "Mật khẩu không đủ mạnh <br> Mật khẩu phải có chữ hoa, chữ thường và số";
        }
    };
}

function changeStatus() {
    var chuaDangNhap = document.querySelector('#chuaDangNhap');
    var dangNhapThanhCong = document.querySelector('#dangNhapThanhCong');
    console.log("abacs")
    chuaDangNhap.style.display = "none";
    dangNhapThanhCong.style.display = "block";
}