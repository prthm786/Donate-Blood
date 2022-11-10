const log = console.log

const inps = document.querySelectorAll('form input')
log(inps)

const selects = document.querySelectorAll('form select')
log(selects)

const btn = document.querySelector('form #submit')
log(btn)

btn.onclick = async (e) => {

	e.preventDefault()

	const obj = {}

	// for (let i = 0; i < inps.length ; i++) 
	// {
	// 	log(inps[i].value)
	// 	obj[`inp${i}`] = inps[i].value
    // }

    inps.forEach(inp => {

        // alert(inp.value)
    	if(inp.value === " " || inp.value === "" || inp.value === null)
    	{
    		alert("inp.value is empty")
	    	return;
    	}
    })

    selects.forEach(inp => {

    	if(inp.value === " " || inp.value === "" || inp.value === null)
    	{
	    	alert("select is empty")
	    	return;
    	}	
    })

	obj["Full Name"] = inps[0].value
	obj["Blood Group"] = selects[0].value

	if(inps[1].value === " " || inps[1].value === null || inps[1].value === undefined)
		obj["Gender"] = inps[2].value
    else
		obj["Gender"] = inps[1].value

	obj["DOB"] = inps[3].value
	obj["Contact"] = inps[4].value

	obj["District"] = selects[1].value

	obj["Email"] = inps[5].value
	obj["Password"] = inps[6].value
    alert(obj)

    const b = JSON.stringify(obj)
    alert(b)

    let h = new Headers();
    h.append("Content-Type","application/json")

    let req = new Request("http://localhost:3000/signup" , {
        method: 'POST',
        body: b,
        headers: h,
        credentials: 'include' 
    });
    let res = await fetch(req)

	let jD = await res.json()

	if(jD !== null)
	{
		// window.location.href = 'http://localhost:3000/home'
	    // log(obj)


		const myWindow = window.open("", "MsgWindow" ); // "width=200,height=100"
		myWindow.document.write('<h style="font-size:24px; font-weight:bolder; margin:10px; padding:10px"> Thank you for Registering with us . We will notify you when someone needs blood . Please make sure to check your mail for further details. </h> <br> <p style="font-size:20px; margin:10px; padding:10px"> Thank you </p>');

	    

	}

}