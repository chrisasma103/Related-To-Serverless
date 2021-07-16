async function getImage(event) {
    event.preventDefault()
    var myform = document.getElementById("myform")
    var payload = new FormData(myform);
    console.log(payload)
    if (document.getElementById("username").value != '') {
        $('#output').text("Thanks!")
  
        console.log("Posting your image...");
        const resp = await fetch("https://bunnimagefunctiongroup.azurewebsites.net/api/bunnimage-upload?code=We5LtNYyyaj8X3gId2EzF/xXK/KjvCOB5L5BTaB4mvdGLc2GPyMbcQ==", {
            method: 'POST',
            headers: {
                'codename' : document.getElementById("username").value
            },
            body: payload
        });
        
        try { 
            var data = await resp.text();
            console.log(data);
            $('#output').text("Your image has been stored successfully!")
        } catch (e) {
            alert("Backend error!")
        }
    } else {
        alert("No name error.")
    }
  }