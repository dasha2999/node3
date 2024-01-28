document.addEventListener('click', (event) => {
    if(event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        console.log('remove ID:', id)
    }
})