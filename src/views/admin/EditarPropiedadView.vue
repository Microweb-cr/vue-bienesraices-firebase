<script setup>
    import { watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import { useFirestore, useDocument } from 'vuefire';
    import { doc, updateDoc } from 'firebase/firestore';
    import { useField, useForm } from 'vee-validate'
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
    import useImage from '@/composables/useImage'
    import useLocationMap from '@/composables/useLocationMap'
    import { validationSchema } from '@/validation/propiedadSchema'

    const items = [1,2,3,4,5]

    const { url, uploadImage, image } = useImage()
    const { zoom, center, pin } = useLocationMap()
    const { handleSubmit } = useForm({ validationSchema });

    const titulo = useField('titulo')
    const imagen = useField('imagen')
    const precio = useField('precio')
    const habitaciones = useField('habitaciones')
    const wc = useField('wc')
    const estacionamientos = useField('estacionamientos')
    const descripcion = useField('descripcion')
    const piscina = useField('piscina')

    const route = useRoute()
    const router = useRouter()
    
    // Obtener la propiedad a Editar
    const db = useFirestore()
    const docRef = doc(db, 'propiedades', route.params.id)
    const propiedad = useDocument(docRef)

    watch(propiedad, (propiedad) => {
        titulo.value.value = propiedad.titulo
        precio.value.value = propiedad.precio
        habitaciones.value.value = propiedad.habitaciones
        wc.value.value = propiedad.wc
        estacionamientos.value.value = propiedad.estacionamientos
        descripcion.value.value = propiedad.descripcion
        piscina.value.value = propiedad.piscina
        center.value = propiedad.ubicacion
    })

    const submit = handleSubmit( async values => {

        const { imagen, ...propiedad } = values

        if(image.value) {
            const data = {
                ...propiedad,
                imagen: url.value,
                ubicacion: center.value
            }
            await updateDoc(docRef, data)

        } else {
            const data = {
                ...propiedad,
                ubicacion: center.value
            }
            await updateDoc(docRef, data)
        }
        router.push({name: 'admin-propiedades'})
    })

</script>

<template>
    <v-card max-width="800" flat class="mx-auto my-10">
        <v-card-title class="mt-5">
            <h1 class="text-h4 font-weight-bold">Editar Propiedad</h1>
        </v-card-title>
        <v-card-subtitle > 
            <p class="text-h5">Edita los detalles de la propiedad</p>
        </v-card-subtitle>

        <v-form class="mt-10">
            <v-text-field
                v-model="titulo.value.value"
                :error-messages="titulo.errorMessage.value"
                label="Titulo"
                bg-color="blue-lighten-4"
                class="mb-5"
            ></v-text-field>

            <v-file-input
                v-model="imagen.value.value"
                :error-messages="imagen.errorMessage.value"
                accept="image/jpeg"
                prepend-icon="mdi-camera"
                label="Fotografía"
                bg-color="blue-lighten-4"
                class="mb-5"
                @change="uploadImage"
            ></v-file-input>

            <div class="my-5">
                <div v-if="image">
                    <p class="font-weight-bold mb-5">Imagen Nueva:</p>
                    <img
                        class=" w-50" 
                        :src="image" 
                        alt="Imagen Propiedad"
                    />
                </div>
                <div v-else>
                    <p class="font-weight-bold mb-5">Imagen Actual:</p>
                    <img
                        class=" w-50" 
                        :src="propiedad?.imagen" 
                        alt="Imagen Propiedad"
                    />
                </div>
            </div>


            <v-text-field
                v-model="precio.value.value"
                :error-messages="precio.errorMessage.value"
                label="Precio"
                bg-color="blue-lighten-4"
                class="mb-5"
            ></v-text-field>

            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Habitaciones"
                        bg-color="blue-lighten-4"
                        class="mb-5"
                        :items="items"
                        v-model="habitaciones.value.value"
                        :error-messages="habitaciones.errorMessage.value"
                    />
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Baños"
                        bg-color="blue-lighten-4"
                        class="mb-5"
                        :items="items"
                        v-model="wc.value.value"
                        :error-messages="wc.errorMessage.value"
                    />
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Estacionamientos"
                        bg-color="blue-lighten-4"
                        class="mb-5"
                        :items="items"
                        v-model="estacionamientos.value.value"
                        :error-messages="estacionamientos.errorMessage.value"
                    />
                </v-col>
            </v-row>

            <v-textarea
                v-model="descripcion.value.value"
                :error-messages="descripcion.errorMessage.value"
                label="Descripción"
                bg-color="blue-lighten-4"
                class="mb-5"
            ></v-textarea>

            <v-checkbox 
                v-model="piscina.value.value"
                label="Alberca"
            ></v-checkbox>


            <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
            <div class="pb-10">
                <div style="height:600px">
                    <LMap 
                        v-model:zoom="zoom" 
                        :center="center" 
                        :use-global-leaflet="false" 
                    >
                        <LMarker
                            :lat-lng="center"
                            draggable
                            @moveend="pin"
                        />
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ></LTileLayer>
                    </LMap>
                </div>
            </div>

            <v-btn
                color="indigo-accent-3"
                block
                @click="submit"
            >
                Actualizar Propiedad
            </v-btn>
        </v-form>
    </v-card>
</template>