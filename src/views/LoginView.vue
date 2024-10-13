<script setup>
    import { useForm, useField } from 'vee-validate';
    import { loginSchema } from '@/validation/loginSchema';
    import { useAuthStore } from '@/stores/auth';

    const { handleSubmit } = useForm({ validationSchema: loginSchema})
    const auth = useAuthStore()

    const email = useField('email')
    const password = useField('password')

    const submit = handleSubmit((values) => {
        auth.login(values)
    })
</script>

<template>

    <v-card
        flat
        max-width="600"
        class="mx-auto my-5"
    >
        <v-card-title
            class="text-h4 font-weight-bold"
        >
            Iniciar Sesión
        </v-card-title>

        <v-card-subtitle
            class=" text-h6"
        >
            Inicia sesión con tu cuenta
        </v-card-subtitle>

        <v-alert
            v-if="auth.hasError"
            class=" my-5"
            color="error"
            icon="$error"
            :title="auth.errorMsg"
        ></v-alert>

        <v-form
            class=" mt-6"
        >
            <v-text-field 
                type="email"
                label="Email"
                bg-color="blue-lighten-4"
                class=" mb-5"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            />

            <v-text-field 
                type="password"
                label="Password"
                bg-color="blue-lighten-4"
                class=" mb-5"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            />

            <v-btn
                block
                color="indigo-accent-3"
                @click="submit"
            >
                Iniciar Sesión
            </v-btn>
        </v-form>

    </v-card>

</template>
