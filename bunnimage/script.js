async function getImage(event) {
    event.preventDefault()
    var myform = document.getElementById("myform")
    var payload = new FormData(myform);
    console.log(payload)
    var username = document.getElementById("username").value;
    if (username != '') {
        $('#output').text("Thanks!")
  
        console.log("Posting your image...");
        const resp = await fetch("https://bunnimagefunctiongroup.azurewebsites.net/api/bunnimage-upload?code=We5LtNYyyaj8X3gId2EzF/xXK/KjvCOB5L5BTaB4mvdGLc2GPyMbcQ==", {
            method: 'POST',
            headers: {
                'codename' : username
            },
            body: payload
        });
  
        var data = await resp.json();
        console.log(data);
        $('#output').text("Your image has been stored!")
    } else {
        alert("No name error.")
    }
  }
  
  async function downloadImage() {
    var username = document.getElementById("downloadusername").value;
    console.log("Attempting to get your pdf...");
    const resp = await fetch("https://bunnimagefunctiongroup.azurewebsites.net/api/bunnimage-download?code=YthJjC6ASn1FQdwfUrFEaPkl/5a1a/bsdDomK9nkkp6Z3dAltO1ciQ==", {
        method: 'GET',
        headers: {
            'username' : username
        },
    });
  
    var data = await resp.json();
    console.log("PDF link received!")
    console.log(data.downloadUri)
    console.log(data.success)
    const link = data.downloadUri
    var success = data.success
  
    window.open(link, "_self")
  }