function creatAutocomplete({root,renderOption,onOptionSelect,inputValue,getMovieData}){
    //const root=document.querySelector('.autocomplete')
root.innerHTML=`
<label><b>such<b></label>
<input class='input'/>
<div class="dropdown is-active">
<div class="dropdown-menu">
<div class="dropdown-content results"></div>
</div>
</div>
`
const input=root.querySelector('input')
const dropdown =root.querySelector('.dropdown')
const resultsWrapper=root.querySelector('.results')

async function onInput(event) {
    const items = await getMovieData(event.target.value)
    if(!items.length){
        dropdown.classList.remove('is-active')
        return ;
    }

    dropdown.classList.add('is-active')
    for (let item of items) {
        const option = document.createElement('a')
        

        option.classList.add('dropdown-item')
        option.innerHTML = renderOption(item)
    
    
    option.addEventListener('click',()=>{
        dropdown.classList.remove('is-active')
        input.value=inputValue(item)
        onOptionSelect(item)

    })
        resultsWrapper.appendChild(option)
        // console.log(movie)
    }
}

input.addEventListener('input',debounce(onInput,500))
document.addEventListener('click',(event)=>{
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    }
})

}



