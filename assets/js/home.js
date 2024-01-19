const BASE_URL = 'http://localhost:3000';
let buttons = document.querySelectorAll('.button-thing');
let boxes = document.querySelector('.boxes');
let arr = [];
async function getData() {
	let res = await axios.get(`${BASE_URL}/menu`);
	console.log(res.data);
	arr = res.data;
	let filtered = res.data.filter(q=>q.category.toLocaleLowerCase()==="main")
	drawList(filtered);
}

getData();

function drawList(data) {
	boxes.innerHTML = '';

	data.forEach((e) => {
		boxes.innerHTML += `
        
        <div class="box">
							<div class="left-side">
								<img
									src="${e.url}"
									alt=""
								/>
								<div class="text">
								<a href="details.html?id=${e.id}"><h4>${e.name}</h4></a>
									<span>${e.desc}</span>
								</div>
							</div>
							<p>$${e.price}</p>
						</div>
        
        `;
	});
}

buttons.forEach((item) =>
	item.addEventListener('click', function () {
		let filtered = arr.filter(
			(e) =>
				item.innerText.toLocaleLowerCase() === e.category.toLocaleLowerCase()
		);
		console.log('aaa');
		drawList(filtered);
	})
);

$('.owl-carousel').owlCarousel({
	loop: true,
	margin: 10,
	responsiveClass: true,
	responsive: {
		100: {
			items: 1,
			nav: true,
		},
		600: {
			items: 3,
			nav: false,
		},
	},
});

let search = document.querySelector('.search');

search.addEventListener('input', function (e) {
	let filtered = arr.filter((item) =>
		item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
	);

	drawList(filtered);
});
