import { ref, computed } from "vue"
import { collection, doc, deleteDoc } from "firebase/firestore"
import { ref as storegeRef, deleteObject } from "firebase/storage"
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire"

export default function usePropiedades() {

    const piscina = ref(false)

    const storege = useFirebaseStorage()
    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))
    const filterItem = computed(() => {
        return piscina.value ?
            propiedadesCollection.value.filter( propiedad => propiedad.piscina ) : propiedadesCollection.value
    })

    async function deleteItem(id, urlImage) {
        if(confirm('¿ ELIMINAR PROPIEDAD ?')) {
            const docRef = doc(db, 'propiedades', id)
            const imageRef = storegeRef(storege, urlImage)

            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ]) 
        }
    }

    return { 
        propiedadesCollection,
        piscina,
        filterItem,
        deleteItem
    }
}