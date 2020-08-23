const rovers = Immutable.List(['Curiosity', 'Opportunity', 'Spirit']);

var store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    roversData: []
}

// add our markup to the page
const root = document.getElementById('root')

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {
    let { rovers, apod, Curiosity, Opportunity, Spirit } = state
    return `
        <header></header>
        <main>
        <section>
            <h3 class="text-center mt-4 mb-4">Mars Rover Dashboard !</h3>
            ${RoverTabs(RoversImagesForRender)}
        </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', async () => {
    await getRoverData()
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

function RoverTabs(callback){

return `
    <div class="row">
        <div class="col-lg-3 col-md-12">
        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <a class="nav-link active" id="v-pills-Curiosity-tab" data-toggle="pill" href="#v-pills-Curiosity" role="tab" aria-controls="v-pills-Curiosity" aria-selected="true">Curiosity</a>
            <a class="nav-link" id="v-pills-Opportunity-tab" data-toggle="pill" href="#v-pills-Opportunity" role="tab" aria-controls="v-pills-Opportunity" aria-selected="false">Opportunity</a>
            <a class="nav-link" id="v-pills-Spirit-tab" data-toggle="pill" href="#v-pills-Spirit" role="tab" aria-controls="v-pills-Spirit" aria-selected="false">Spirit</a>
        </div>
        </div>
        <div class="pl-5 col-lg-9 col-md-12 mb-4">
        <hr/>
        <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-Curiosity" role="tabpanel" aria-labelledby="v-pills-Curiosity-tab">${callback(store.roversData[0])}</div>
            <div class="tab-pane fade" id="v-pills-Opportunity" role="tabpanel" aria-labelledby="v-pills-Opportunity-tab">${callback(store.roversData[1])}</div>
            <div class="tab-pane fade" id="v-pills-Spirit" role="tabpanel" aria-labelledby="v-pills-Spirit-tab">${callback(store.roversData[2])}</div>
        </div>
        </div>
    </div>
`;

    
}

function RoversImagesForRender(roverObject) {
    // If image does not already exist, or it is not from today -- request it again
    if(typeof roverObject?.images?.photos?.length !== "undefined")  {
        // If image does not already exist, or it is not from today -- request it again
        return (`
            <p>Launch Date: ${roverObject.images.photos[0].rover.launch_date}</p>
            <p>Landing Date: ${roverObject.images.photos[0].rover.landing_date}</p>
            <p>Status: ${roverObject.images.photos[0].rover.status}</p>
            <p>Last Photo Date: ${new Date(getLastDate(roverObject))}</p>
            <img src="${roverObject.images.photos[0].img_src}" height="150px" width="150px" />
            <img src="${roverObject.images.photos[1].img_src}" height="150px" width="150px" />
            <img src="${roverObject.images.photos[2].img_src}" height="150px" width="150px" />
            <img src="${roverObject.images.photos[3].img_src}" height="150px" width="150px" />
            <img src="${roverObject.images.photos[4].img_src}" height="150px" width="150px" />
            <img src="${roverObject.images.photos[5].img_src}" height="150px" width="150px" />
            <img src="${roverObject.images.photos[6].img_src}" height="150px" width="150px" />
            <img src="${roverObject.images.photos[7].img_src}" height="150px" width="150px" />
            <img src="${roverObject.images.photos[8].img_src}" height="150px" width="150px" />
            <img src="${roverObject.images.photos[9].img_src}" height="150px" width="150px" />
        `)
    } else {
        return `<p>There are no data!1</p>`;
    }
    // check if the photo of the day is actually type video!
    
}

// ------------------------------------------------------  API CALLS

async function getRoverData() {

    store.roversData.push(await roverAPI(rovers.toJS()[0]));
    store.roversData.push(await roverAPI(rovers.toJS()[1]));
    store.roversData.push(await roverAPI(rovers.toJS()[2]));
    
    render(root, store)

}

async function roverAPI(rover){
    let data;
    try{
        data = await fetch(`http://localhost:3000/getRoverData`, { headers: { 'rover': rover } })
        .then(res => {
            if(!res.ok){
                throw new Error("Failed to retrive data");
            } else {
                return res.json();
            }
        })
        .then(data => data)
        .catch(error => error);
    } catch {
        throw new Error("Failed to retrive data");
    }



    return data;
}


// ---------------------------- EXTRAS


function getLastDate(data){

    let dates = data.images.photos.map((cur, index, array) => {
        return Date.parse(cur.earth_date)
    });

    return Math.max.apply(Math, dates)
}