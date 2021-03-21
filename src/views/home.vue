<script>
export default {
    name: "home",
    created() {
        const vm = this.$parent;
        const retrievedStationType = vm.getStoredStationType();
        if(retrievedStationType == "normal"){
            window.location.href = '/scan';
        }
        if(retrievedStationType == "express"){
            window.location.href = '/express';
        }
  }
};
</script>