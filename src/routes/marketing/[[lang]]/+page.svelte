<script>
	import { page } from '$app/stores';
	const greetings = {
		en: 'Hello',
		es: 'hola',
		fr: 'bonjour!'
	};
	const { lang = 'en' } = $page.params;
	const greeting = greetings[lang];
</script>
<h1>{greeting}</h1>
