<script setup>
    import usePropiedades from '@/composables/usePropiedades';
    import { priceProperty } from '@/helpers'

    const { propiedadesCollection, deleteItem } = usePropiedades()

</script>

<template>
    <h2 class=" text-center text-h3 my-5 font-weight-bold">Panel de Administración</h2>

    <v-btn
        color="indigo-accent-3"
        :to="{name: 'nueva-propiedad'}"
    >
        Nueva Propiedad
    </v-btn>

    <v-card class=" mx-auto mt-10" flat>
        <v-list>
            <v-list-item
                v-for="propiedad in propiedadesCollection"
                :key="propiedad.id"
                class="custom-border-bottom"
            >
                <template v-slot:prepend>
                    <v-list-item-media :start="true">
                        <img width="180" :src="propiedad.imagen" alt="Imagen Propiedad" />
                    </v-list-item-media>
                </template>

                <v-list-item-title>{{ propiedad.titulo }}</v-list-item-title>
                <v-list-item-subtitle>{{ priceProperty(propiedad.precio) }}</v-list-item-subtitle>

                <template v-slot:append>
                    <v-btn 
                        color="info" 
                        class=" mr-3" 
                        :to="{name: 'editar-propiedad', params: {id: propiedad.id}}"
                    >
                        Editar
                    </v-btn>

                    <v-btn 
                        color="red-darken-3"
                        @click="deleteItem(propiedad.id, propiedad.imagen)"
                    >Eliminar</v-btn>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<style scoped>
    .custom-border-bottom {
        border-bottom: 2px solid #1565C0;
    }
</style>