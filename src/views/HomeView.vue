<script setup>
    import usePropiedades from '@/composables/usePropiedades';
    import Propiedad from '@/components/Propiedad.vue';
    import { priceProperty } from '@/helpers'

    const { piscina, filterItem } = usePropiedades()
</script>

<template>
    <h1 class=" text-center text-h3 font-weight-bold my-5">Nuestras Propiedades</h1>
    
    <v-card flat class="py-10">

        <v-card-title class=" text-h5">
            Búsqueda
            <v-checkbox label="Piscina" v-model="piscina"/>
        </v-card-title>

        <v-row>
            <Propiedad
                v-for="propiedad in filterItem"
                :key="propiedad.id"
                :propiedad="propiedad"
                :price="priceProperty"
            />

        </v-row>
    </v-card>
</template>
