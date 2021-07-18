async function y1k3s() {
    console.log("Im running")
    let url = `https://bunnimagefunctiongroup.azurewebsites.net/api/twocatz?code=hc8H6DBE1c6C3diZ0pORheOKICDKzgZV5F477wTdHfDl53n2YegmeA==&name1=${document.getElementById("name1").value}&name2=${document.getElementById("name2").value}&name3=${document.getElementById("name3").value}&name4=${document.getElementById("name4").value}`
    let resp = await fetch(url, {
            method: 'GET'
        });
        
        let result = await resp.json()
  
        document.getElementById("image1").src = "data:image/png;base64," + result.name1
        document.getElementById("image2").src = "data:image/png;base64," + result.name2
        document.getElementById("image3").src = "data:image/png;base64," + result.name3
        document.getElementById("image4").src = "data:image/png;base64," + result.name4
  }