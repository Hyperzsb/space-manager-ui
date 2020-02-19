<template>
    <b-container fluid>
        <b-row >
            <b-col cols="6" class="text-right">
                <b-spinner style="width: 3.5rem; height: 3.5rem;" label="Large Spinner"></b-spinner>
            </b-col>
            <b-col cols="6" class="text-left pt-3">
                <strong>Loading...</strong>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped>

</style>
