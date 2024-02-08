import { ref } from 'vue'
import {defineStore} from 'pinia'

export default defineStore('app', () => {
    const count = ref(0)
    function increment() {
        count.value++
    }
    
    return { count, increment }
})