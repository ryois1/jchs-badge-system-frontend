<template>
<div>
  <b-jumbotron header="Error 404" lead="Route not found">
    <b-button variant="primary" href="/">Go Home</b-button>
  </b-jumbotron>
</div>
</template>
<script>
export default {
    name: "404",
    created() {
        document.body.classList.remove('branding-ready');
        document.body.classList.remove('branding-not-ready');
        document.body.classList.remove('branding-success');
    },
};
</script>