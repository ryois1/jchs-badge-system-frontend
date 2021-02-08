<template>
<footer class="footer bg-dark text-white">
    <div class="footer-version">
        <span>Frontend Version: <code>{{this.$parent.FRONTEND_VERSION}}</code></span> <span>API Version: <code>{{this.$parent.API_VERSION}}</code></span> <span>IP Address: <code>{{this.$parent.STATION_IP}}</code></span> <span>Station Name: <code>{{this.$parent.STATION_NAME}}</code></span>
    </div>
</footer>
</template>
<style scoped>
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f5f5f5;
}
.footer-version{
    padding-left: 1em !important;
}
</style>