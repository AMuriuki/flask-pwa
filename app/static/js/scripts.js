function submitFunction() {
    console.log('submitted')
    first_name = $('#first_name').val()
    middle_name = $('#middle_name').val()
    last_name = $('#last_name').val()
    email = $('#email_address').val()
    address = $('#address').val()
    message = $('#message').val()
    console.log('values,', first_name, middle_name, last_name,
        address, message)
    $('#my_form').hide()
    // send  to server
    data = {
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        email: email,
        address: address,
        message: message
    }
    $.ajax({
        type: "POST",
        url: '/submit',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
            console.log('data sent to server successfully')
            var alert = document.getElementById("alert");
            alert.style.display = "block";
            alert.innerHTML = "Your message has been sent to the server";
        },
        dataType: 'json'
    });
    return false
}