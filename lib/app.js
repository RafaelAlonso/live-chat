const batch = 156; // change to your own batch id
const baseUrl = "https://wagon-chat.herokuapp.com/";

// Your turn to code!

const chatForm = document.getElementById('comment-form');
const userMessage = document.getElementById('your-message');
const userName = document.getElementById('your-name');
const refresh = document.getElementById('refresh');
const list = document.querySelector('#messages ul');

const getMes = () => {

fetch(`${baseUrl}${batch}/messages`) 
	.then (response => response.json())
	.then ((data) => {
		console.log(data);
		data.messages.forEach ((message) =>{
		const item = `<li>${message.content} (posted <span class="date">10 minutes ago</span>) by ${message.author}</li>`
		list.insertAdjacentHTML('afterbegin', item)		
		})
	});
}

refresh.addEventListener("click", (event) => {
	event.preventDefault();
	getMes();
})



const sendMes = () => {
	const namep = userName.value;
	const messagep = userMessage.value;
	fetch(`${baseUrl}${batch}/messages`, { 
	method: 'POST', 
	headers: {'Content-Type': 'application/json'},
	body: JSON.stringify({author: namep, content: messagep})
	})
	.then (response => response.json())
	.then ((data) => {
		console.log(data);
	});	
}

chatForm.addEventListener('submit', (event) => {
	event.preventDefault();
	sendMes();
})
