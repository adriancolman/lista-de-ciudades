const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');

//search states and filter it

const searchStates = async searchText => {
    const res = await fetch('../departamentos.json');
    const states = await res.json();

    //get Matches to current text input

    let matches = states.departamentos.filter(objeto => {

        const regex = new RegExp(`^${searchText}`, 'gi');
        return objeto.nombre.match(regex);
    })

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHTML(matches);
    console.log(matches);

}

const outputHTML = matches => {
    if (matches.length > 0) {
        const output = matches.map(match =>
            `<div class='card card-body mb-1'> 
            <h4>${match.nombre}</h4><span class='text-primary'>${match.provincia.nombre}</span></div>`

        ).join(' ')
        matchList.innerHTML = output;

    }
}

search.addEventListener('input', () => searchStates(search.value));