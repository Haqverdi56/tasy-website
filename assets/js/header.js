let bars = document.querySelector('.fa-bars');
let navBar = document.querySelector('nav');
let header = document.querySelector('header');

bars.addEventListener('click', function () {
	bars.classList.toggle('fa-x');
	navBar.classList.toggle('show');
});

window.addEventListener('scroll', function () {
	if (this.window.scrollY > 200) {
		header.style.position = 'fixed';
		header.style.backgroundColor = '#27272b';
	} else {
		header.style.position = 'absolute';
		header.style.backgroundColor = 'transparent';
	}
});
