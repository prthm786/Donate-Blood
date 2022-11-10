
const log = console.log

const inps = document.querySelectorAll('form input')
log(inps)

const btn = document.querySelector('#formbtn')
log(btn)

btn.onclick = async (e) => {

	e.preventDefault()

	// inps.forEach(i => log(i))
	const obj = {}

	// for (let i = 0; i < inps.length ; i++) 
	// {
	// 	log(inps[i].value)
	// 	obj[`inp${i}`] = inps[i].value
    // }

	obj["Email"] = inps[0].value
	obj["Password"] = inps[1].value
    log(obj)

    const b = JSON.stringify(obj)
    log(b)

    let h = new Headers();
    h.append("Content-Type","application/json")

    let req = new Request("http://localhost:3000/signin" , {
        method: 'POST',
        body: b,
        headers: h,
        credentials: 'include' 
    });
    let res = await fetch(req)
    let jd = await res.json()
 
    log(jd , typeof jd)

    if(jd.Done === false)
    	window.location.href = "http://localhost:3000/signup"

    if(jd.Done === true)
    	window.location.href = "http://localhost:3000/home"
}