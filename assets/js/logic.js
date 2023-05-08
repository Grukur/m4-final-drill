
// contadores para cada sección
let countPrincipal = 1;
let countSecundario = 6;
let countOtros = 11;


// capturamos el mouse y vemos de donde fue llamada la funcion para luego entregar los datos 
// que corresponden
const mouseOver = (id, location, color) => {
    if (id == 'overPrincipal') {
        if (countPrincipal < 6) {
            generator(countPrincipal, id, location, color).next()
            countPrincipal++
        } else {
            $('div').remove(`.${id}`)
            countPrincipal = 1
        }
    } else if (id == 'overSecundario') {
        if (countSecundario < 11) {
            generator(countPrincipal, id, location, color).next()
            countSecundario++
        } else {
            $('div').remove(`.${id}`)
            countSecundario = 6
        }
    } else if (id == 'overOtros') {
        if (countOtros < 16) {
            generator(countPrincipal, id, location, color).next()
            countOtros++
        } else {
            $('div').remove(`.${id}`)
            countOtros = 11
        }
    }
}

// clase que guardara los datos del personaje
class Character{
    constructor(name, height, weight,){
        this.name = name;
        this.height = height;   
        this.weight = weight;
    }
}

// clase que hereda desde Character y suma datos para crear el objeto que manejaremos finalmente
class ObjToSearch extends Character{
    constructor(name, height, weight, id, location, color) {   
        super(name, height, weight);
        this.id = id;
        this.location = location;
        this.color = color;
        }
}

function* generator (i, id, location, color){
    while(true){ 
        yield fetcher(i, id, location, color)
    }
}


// capturamos nuestra info desde la api
const fetcher = async (i, id, location, color) => {
    let url = 'https://swapi.dev/api/people/' + i;
    try{
        await $.get(url, (data, status) => {
            builder(data, id, location, color)
        })
    }
    catch{
        console.log('error ', error)
    }
}

//construimos nuestro objeto
const builder = (data, id, location, color)=>{
    let person = new ObjToSearch(data.name, data.height, data.mass, id, location, color)
    printer(person)
}

// entregamos la info desde nuestro objeto a nuestro incrustrador 
// e inyectamos el codigo en nuestro html
const printer = (person) => {
    $(`#${person.location}`).append(`
        <div class="${person.id} col-12 col-md-6 col-lg-4 ">
            <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"
                style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                <div class="timeline-icon" style="background-color: ${person.color};"><i class="fa fa-address-card" aria-hidden="true"></i></div>
                <div class="timeline-text">
                    <h6 style='font-weight:bold'>${person.name}</h6>
                    <p>Estatura ${person.height} cm. Peso ${person.weight} kg.</p>
                </div>
            </div>
        </div>
    `)
}




