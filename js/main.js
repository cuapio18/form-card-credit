const 	tarjeta = document.querySelector('#tarjeta'),
		btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'), 
		formulario = document.querySelector('#formulario-tarjeta'), 
		numeroTarjeta = document.querySelector('#tarjeta .numero'), 
		nombreTarjeta = document.querySelector('#tarjeta .nombre'), 
		logoMarca = document.querySelector('#logo-marca'), 
		firma = document.querySelector('#tarjeta .firma p'), 
		mesExpiracion = document.querySelector('.tarjeta .mes'), 
		yearExpiracion = document.querySelector('.tarjeta .year'), 
		ccv = document.querySelector('.tarjeta .ccv');

// volteamos tarjeta para mostrar el frente
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')) {
		tarjeta.classList.remove('active');
	}
};

// ROTACION DE LA TARJETA
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// BOTON DE ABRIR FORMULARIO
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');

});

// RELLENAR SELECT DEL MES DINAMICAMENTE
for(let i = 1; i <= 12; i++) {
	let opcion = document.createElement('option');
	
	if(i.toString().length == 1) {
		i = '0' + i;
	}

	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

// RELLENAR SELECT DEL AÑO DINAMICAMENTE
const yearActual = new Date().getFullYear();

for(let i = yearActual; i <= yearActual + 8; i++) {
	let opcion = document.createElement('option');

	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

// Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminar espacios en blanco
	.replace(/\s/g, '')
	// Eliminar letras
	.replace(/\D/g, '')
	// Poner espacios cada 4 numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elima el ultimo espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == '') {
		numeroTarjeta.textContent = '#### #### #### ####';
		logoMarca.innerHTML = '';
	}

	if(valorInput[0] == 4) {
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/visa.png';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5) {
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	// Volteamos tarjeta para ver el frente
	mostrarFrente();
});

// Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput
	.replace(/[0-9]/g, '');

	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == '') {
		nombreTarjeta.textContent = 'John Doe';
	}

	// Volteamos tarjeta para ver el frente
	mostrarFrente();
});

// Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;

	// Volteamos tarjeta para ver el frente
	mostrarFrente();
});

// Select año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);

	// Volteamos tarjeta para ver el frente
	mostrarFrente();
});

// Input CCV
formulario.inputCCV.addEventListener('keyup', () => {

	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active')
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// eliminar espacios
	.replace(/\s/g, '')
	// eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});