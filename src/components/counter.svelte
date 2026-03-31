<script>
	// 1. Declare reactive state using the $state rune
	let count = $state(0);

	// 2. Declare derived state (computed values) using $derived
	let double = $derived(count * 2);

	function increment() {
		count += 1;
	}

	function decrement() {
		count -= 1;
	}
</script>

<div class="counter">
	<h2>Count is {count}</h2>
	<p>Double is {double}</p>

	<button onclick={increment}>
		Add 1
	</button>

	<button onclick={decrement} disabled={count === 0}>
		Subtract 1
	</button>
</div>

<style>
	.counter {
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		text-align: center;
	}
	button {
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
</style>
