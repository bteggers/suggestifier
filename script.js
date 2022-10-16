/*global fetch*/

document.getElementById("generate-button").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("warning").innerHTML = "";
    let suggestionType = document.getElementById("type").value;
    let suggestionPrompt = document.getElementById("prompt").value;
    let error = false;
    if (suggestionType ==="default") {
        error = true;
        document.getElementById("warning").innerHTML += "<p>Select type of suggestion</p>";
    }
    if (suggestionPrompt==="") {
        error = true;
        document.getElementById("warning").innerHTML += "<p>Input prompt for suggestion</p>";
    }
    
    if (!error) {
        console.log(suggestionPrompt);
        if (suggestionType === "quote") {
            let url = 'https://favqs.com/api/quotes/?filter='+suggestionPrompt;
            fetch(url,{headers:{Authorization: 'Bearer '+"8d5a6de35317a26968716f3373795e09"}})
                .then((response)=>{
                    return response.json();
                })
                .then((json)=>{
                    let rawList = json.quotes;
                    let filteredList = rawList.filter(element=>element.body.length < 150);
                    filteredList.sort(() => (Math.random() > .5) ? 1 : -1);
                    if (filteredList.length<5) {
                        document.getElementById("warning").innerHTML += "<p>Less than 5 suggestions found</p>";
                    }
                    document.getElementById("suggestion-list").innerHTML = "";
                    for (let i = 0; i < Math.min(5,filteredList.length); i++) {
                        document.getElementById("suggestion-list").innerHTML += "<p>"+filteredList[i].body+"</p>";
                    }
                    
                }).catch((error)=>{
                    document.getElementById("warning").innerHTML += "<p>Error retrieving suggestions</p>";
                });
        }
        if (suggestionType === "word") {
            let url = 'https://twinword-word-associations-v1.p.rapidapi.com/associations/?entry='+suggestionPrompt;
            fetch(url,{method: 'GET',headers: {
		        'X-RapidAPI-Key': '3c5132c9c5msh977a27623404f72p16a1b0jsn5076714f9d4a',
		        'X-RapidAPI-Host': 'twinword-word-associations-v1.p.rapidapi.com'
	        }})
                .then((response)=>{
                    return response.json();
                })
                .then((json)=>{
                    console.log(json);
                    let rawList = json.associations_array;
                    rawList.sort(() => (Math.random() > .5) ? 1 : -1);
                    if (rawList.length<5) {
                        document.getElementById("warning").innerHTML += "<p>Less than 5 suggestions found</p>";
                    }
                    document.getElementById("suggestion-list").innerHTML = "";
                    for (let i = 0; i < Math.min(5,rawList.length); i++) {
                        document.getElementById("suggestion-list").innerHTML += "<p>"+rawList[i]+"</p>";
                    }
                    
                })
                .catch((error)=>{
                    document.getElementById("warning").innerHTML += "<p>Error retrieving suggestions</p>";
                });
        }
        
    }
  
});