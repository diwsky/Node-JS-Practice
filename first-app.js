const fetchData = () => {
    const promise = new Promise((resolve, reject) =>{
        setTimeout(()=>{
            resolve("Mantap done resolve!")
        },1500)
    });
    return promise
}

setTimeout(()=>{
    console.log(`after waiting setTimeout!`)
    fetchData().then(text =>{
        console.log(`hasil resolve: `+text)
        return fetchData()
    }).then(text2=>{
        console.log(`fetch data kedua: `+text2)
    })
}, 1500)

console.log("Test 1")
console.log("Test 2")
