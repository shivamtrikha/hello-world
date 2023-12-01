<script>
    export let productId = 100;
</script>
<a href="/">Home</a>

<h1>products lists</h1>
<h2><a href="/products/1">products list 1</a></h2>
<h2><a href="/products/2">products list 2</a></h2>
<h2><a href="/products/3">products list 3</a></h2>
<h2><a href="/products/4">products list 4</a></h2>
<h2><a href={`/products/${productId}`}>Products list {productId}</a></h2>
