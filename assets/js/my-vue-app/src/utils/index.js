export const useClipboard = () => {
    const legacyCopy = (text) => {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()

        try {
            document.execCommand('copy')
            return true
        } finally {
            document.body.removeChild(textarea)
        }
    }

    const navigatorCopy = (text) => {
        return navigator.clipboard.writeText(text)
    }

    let copyFunc = navigator?.clipboard?.writeText ? navigatorCopy : legacyCopy
    return {
        copy: (text) => {
            const promise = new Promise((resolve, reject) => {
                try {
                    const successOrPromise = copyFunc(text)
                    if (successOrPromise instanceof Promise) {
                        successOrPromise
                            .then(() => {
                                console.log(
                                    'Text copied to clipboard ✌🏼:',
                                    text
                                )
                                resolve(text)
                            })
                            .catch((error) => {
                                console.error('Failed to copy text:', error)
                                reject(error)
                            })
                    } else if (successOrPromise === true) {
                        console.log('Text copied to clipboard ✌🏼:', text)
                        resolve(text)
                    }
                } catch (error) {
                    console.error('Failed to copy text:', error)
                    reject(error)
                }
            })
            return promise
        },
    }
}