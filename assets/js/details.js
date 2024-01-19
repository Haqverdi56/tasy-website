let details = document.querySelector('.details');
const BASE_URL = 'http://localhost:3000';
let id = new URLSearchParams(window.location.search).get('id');
console.log(id);
async function getData() {
	let res = await axios.get(`${BASE_URL}/menu/${id}`);
	console.log(res.data);
	let e = res.data;
	details.innerHTML = `
        
        <div class="box" onclick="window.history.back()">
							<div class="left-side">
								<img
									src="${e.url}"
									alt=""
								/>
								<div class="text">
								<h4>${e.name}</h4>
									<span>${e.desc}</span>
								</div>
							</div>
							<p>$${e.price}</p>
						</div>
        
        `;
}

getData();
