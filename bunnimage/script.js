async function getImage(event){
    event.preventDefault()
    var myform = document.getElementById("myform");
    let nameInput = document.getElementById("username");
    let fileInput = document.getElementById("image");
    let file = fileInput.files[0]

    var payload = new FormData(myform);
    console.log(payload)
    payload.append("file", file);
    $('#output').text("Thanks!")

    if (nameInput.value != ''){
        try {
            const response = await fetch(process.env.bunnimage-upload-link, {
                method: "POST" ,
                body: payload , 
                headers: {
                    'codename': nameInput.value
                }
            });
            $('output').text("Your image has been stored successfully!")

        }
        catch(e){
            $('output').text(err)
        }
    }
    else{
        alert("No name error.")
    }
}