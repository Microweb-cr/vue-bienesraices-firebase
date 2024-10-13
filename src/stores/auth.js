import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const userAuth = ref(null)
    const router = useRouter()

    const errorMsg = ref('')
    const errorsCodes = {
        'auth/user-not-found': 'Usuario no Encontrado',
        'auth/wrong-password': 'Password Incorrecto',
        'auth/invalid-credential': 'Email o Password Incorrectos'
    }

    onMounted(() => {

        onAuthStateChanged(auth, (user) => {
            if(user) {
                userAuth.value = user
            }
        })
    })

    const login = ({email, password}) => {

        signInWithEmailAndPassword(auth, email, password)
            .then( (userCredential) => {
                const user = userCredential.user
                userAuth.value = user
                router.push({name: 'admin-propiedades'})
            })
            .catch( error => {
                errorMsg.value = errorsCodes[error.code]
            })
    }

    const logout = () => {

        signOut(auth).then(() => {
            userAuth.value = null
            router.push({name: 'login'})

        }).catch(error => {
            console.log(error)
        })
    }

    const hasError = computed(() => {
        return errorMsg.value
    })

    const isAuth = computed(() => {
        return userAuth.value
    })

    return {
        login,
        hasError,
        errorMsg,
        isAuth,
        logout
    }
})