async function getImage(event){
    event.preventDefault()
    var namevalue=document.getElementById("name").value;
    if (namevalue = ''){
        alert("No name error.")
    }

    var bunniForm = document.getElementById("myform");
    var payload = new FormData(bunniForm);
    payload.append(namevalue, document.getElementById("image"));

    var myHeaders = new Headers();
    myHeaders.append("content-type", "file")
    myHeaders.append("codename",namevalue)
    try {
        const response = await fetch(process.env.bunnimage-upload-link, {
            method: "POST" ,
            body: payload , 
            headers: myHeaders
        });
    } catch (e){
        alert("An error occurred.")
    }
    $('#output').text("Your image has been stored successfully!")
}