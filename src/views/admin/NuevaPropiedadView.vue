<script setup>
    import { useForm, useField } from 'vee-validate';
    import { collection, addDoc } from "firebase/firestore"; 
    import { useFirestore } from 'vuefire';
    import { useRouter } from 'vue-router';
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
    import { validationSchema, imageSchema } from '@/validation/propiedadSchema';
    import useImage from '@/composables/useImage';
    import useLocationMap from '@/composables/useLocationMap';

    const items = [ 1, 2, 3, 4, 5, 6 ]

    const { uploadImage, image, url } = useImage()
    const { zoom, center, pin } = useLocationMap()

    const db = useFirestore()
    const router = useRouter()

    const { handleSubmit } = useForm({
        validationSchema: {
            ...validationSchema,
            ...imageSchema
        }
    })

    const titulo = useField('titulo')
    const imagen = useField('imagen')
    const precio = useField('precio')
    const habitaciones = useField('habitaciones')
    const wc = useField('wc')
    const estacionamientos = useField('estacionamientos')
    const descripcion = useField('descripcion')
    const piscina = useField('piscina', null, {
        initialValue: false
    })

    const submit = handleSubmit( async (values) => {

        const { imagen, ...propiedad } = values

        const docRef = await addDoc(collection(db, "propiedades"), {
            ...propiedad,
            imagen: url.value,
            ubicacion: center.value
        });
        if(docRef.id) {
            router.push({name: 'admin-propiedades'})
        }
    })

</script>

<template>

    <v-card max-width="800" flat class=" mx-auto my-10">
        <v-card-title
            class="text-h4 font-weight-bold"
        >
            Nueva Propiedad
        </v-card-title>

        <v-card-subtitle
            class=" text-h6"
        >
            Crea una nueva propiedad, llenando el siguiente formulario.
        </v-card-subtitle>

        <v-form class=" mt-10">
            <v-text-field 
                class=" mb-5"
                label="Titulo Propiedad"
                bg-color="blue-lighten-4"
                v-model="titulo.value.value"
                :error-messages="titulo.errorMessage.value"
            />

            <v-file-input
                accept="image/jpeg"
                label="Fotografia"
                prepend-icon="mdi-camera"
                bg-color="blue-lighten-4"
                class="mb-5"
                v-model="imagen.value.value"
                :error-messages="imagen.errorMessage.value"
                @change="uploadImage"
            />

            <div v-if="image" class=" my-5">
                <p class=" font-weight-bold mb-5">Imagen Propiedad:</p>
                <img class=" w-50" :src="image" alt="Imagen de la Propiedad">
            </div>

            <v-text-field 
                class=" mb-5"
                label="Precio"
                bg-color="blue-lighten-4"
                v-model="precio.value.value"
                :error-messages="precio.errorMessage.value"
            />

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
                class="mb-5" 
                label="Descripción" 
                bg-color="blue-lighten-4"
                v-model="descripcion.value.value"
                :error-messages="descripcion.errorMessage.value"
            ></v-textarea>

            <v-checkbox 
                label="Piscina"
                v-model="piscina.value.value" 
                :error-messages="piscina.errorMessage.value"   
            />

            <h2 class=" font-weight-bold text-center">Ubicación</h2>
            <div class=" py-10">
                <div style="height:600px;">
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
                Crear Propiedad
            </v-btn>

        </v-form>
    </v-card>
</template>