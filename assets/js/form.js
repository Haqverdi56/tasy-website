let allInputs = document.querySelectorAll('input');
let select = document.querySelector('select');
let form = document.querySelector('form');
const BASE_URL = 'http://localhost:3000';
let selectValue;
let idElem;
let arr = [];
let newArr = [];

let editStatus = false;
form.addEventListener('submit', function (e) {
	e.preventDefault();

	let obj = {
		name: allInputs[0].value,
		desc: allInputs[1].value,
		url: allInputs[2].value,
		price: allInputs[3].value,
		category: selectValue,
	};
	if (
		allInputs[0].value !== '' &&
		allInputs[1].value !== '' &&
		allInputs[2].value !== '' &&
		allInputs[3].value !== '' &&
		allInputs[3].value > 0
	) {
		if (!editStatus) {
			axios.post(`${BASE_URL}/menu`, obj);
			allInputs.forEach((e) => (e.innerText = ''));
		} else {
			axios.patch(`${BASE_URL}/menu/${idElem}`, obj);
			allInputs.forEach((e) => (e.innerText = ''));
			editStatus = false;
		}
	} else {
		select.style.border = '1px solid red';
		allInputs.forEach((e) => (e.style.border = '1px solid red'));
	}
});

select.addEventListener('change', function (e) {
	selectValue = e.target.value;
	console.log(e.target.value);
});

let tBody = document.querySelector('tbody');

async function getData() {
	let res = await axios.get(`${BASE_URL}/menu`);
	console.log(res.data);
	arr = res.data;
	drawList(res.data);
	newArr = structuredClone(res.data);
}

getData();

function drawList(data) {
	tBody.innerHTML = '';

	data.forEach((e) => {
		tBody.innerHTML += `
        
    <tr>
        <td scope="">${e.id}</td>
        <td scope="">${e.url}</td>
        <td scope="">${e.name}</td>
        <td scope="">${e.desc}</td>
        <td scope="">${e.price}</td>
        <td scope="">${e.category}</td>
        <td scope="">
        <i class="fa-solid fa-trash" onclick=deletThis("${e.id}",this) ></i>
        <i class="fa-solid fa-pen" onclick=editThis("${e.id}")></i>
        </td>
    </tr>
        
        `;
	});
}

async function deletThis(id, btn) {
	await axios.delete(`${BASE_URL}/menu/${id}`);
	btn.querySelector('tr').remove();
}

async function editThis(id) {
	let res = await axios.get(`${BASE_URL}/menu/${id}`);

	allInputs[0].value = res.data.name;
	allInputs[1].value = res.data.desc;
	allInputs[2].value = res.data.url;
	allInputs[3].value = res.data.price;
	editStatus = true;
	idElem = id;
}

let sort = document.querySelector('.btn-sort');

sort.addEventListener('click', function () {
	if (sort.innerText === 'A-Z') {
		let sorted = arr.sort((a, b) => (a.name > b.name ? -1 : 1));

		drawList(sorted);
		sort.innerText = 'Z-A';
	} else if (sort.innerText === 'Z-A') {
		let sorted = arr.sort((a, b) => (a.name < b.name ? -1 : 1));
		drawList(sorted);
		sort.innerText = 'Default';
	} else {
		sort.innerText = 'A-Z';

		drawList(newArr);
	}
});
