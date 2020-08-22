let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    Curiosity: '',
    Opportunity: '',
    Spirit: '',
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {
    let { rovers, apod, Curiosity, Opportunity, Spirit } = state
    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${ImageOfTheDay(apod)}
                <hr/>
                <div class="row">
                    <div class="col-3">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="nav-link active" id="v-pills-Curiosity-tab" data-toggle="pill" href="#v-pills-Curiosity" role="tab" aria-controls="v-pills-Curiosity" aria-selected="true">Curiosity</a>
                        <a class="nav-link" id="v-pills-Opportunity-tab" data-toggle="pill" href="#v-pills-Opportunity" role="tab" aria-controls="v-pills-Opportunity" aria-selected="false">Opportunity</a>
                        <a class="nav-link" id="v-pills-Spirit-tab" data-toggle="pill" href="#v-pills-Spirit" role="tab" aria-controls="v-pills-Spirit" aria-selected="false">Spirit</a>
                    </div>
                    </div>
                    <div class="col-9">
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="v-pills-Curiosity" role="tabpanel" aria-labelledby="v-pills-Curiosity-tab">${RoversImagesForRender(store.Curiosity, store.rovers[0])}</div>
                        <div class="tab-pane fade" id="v-pills-Opportunity" role="tabpanel" aria-labelledby="v-pills-Opportunity-tab">${RoversImagesForRender(store.Opportunity, store.rovers[1])}</div>
                        <div class="tab-pane fade" id="v-pills-Spirit" role="tabpanel" aria-labelledby="v-pills-Spirit-tab">${RoversImagesForRender(store.Spirit, store.rovers[2])}</div>
                    </div>
                    </div>
                </div>
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
    // console.log('Image of the day Called');
    if(apod == null || apod == '') {
        getImageOfTheDay(store)
    } else {
        // If image does not already exist, or it is not from today -- request it again
        const today = new Date()
        const photodate = new Date(apod.date)
        if (!apod || apod.date === today.getDate() ) {
            getImageOfTheDay(store)
        }

        // check if the photo of the day is actually type video!
        if (apod.media_type === "video") {
            return (`
                <p>See today's featured video <a href="${apod.url}">here</a></p>
                <p>${apod.title}</p>
                <p>${apod.explanation}</p>
            `)
        } else if(apod !== null) {
    
            return (`
                <img src="${apod?.image?.url}" height="350px" width="100%" />
                <p>${apod?.image?.explanation}</p>
            `)
        }
    }
    
}

function RoversImagesForRender(roverObject, roverName) {
    // If image does not already exist, or it is not from today -- request it again
    // console.log('Rover Images Called');
    if(roverObject == '') {
        getRoverData(roverName);
    } else {
        // If image does not already exist, or it is not from today -- request it again
        return (`
            <p>Launch Date: ${roverObject.images.photos[0].rover.launch_date}</p>
            <p>Landing Date: ${roverObject.images.photos[0].rover.landing_date}</p>
            <p>Status: ${roverObject.images.photos[0].rover.status}</p>
            <p>Earth Date: ${roverObject.images.photos[0].earth_date}</p>
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
    }
    // console.log(state);
    // check if the photo of the day is actually type video!
    
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state
    fetch(`http://localhost:3000/apod`).then(res => res.json()).then(apod => updateStore(store, { apod }))

    // return data
}


async function getRoverData(rover) {

    let { Curiosity, Opportunity, Spirit } = store
    const res = await fetch(`http://localhost:3000/apods`, {
        headers: {
            'rover': rover,
        }
    });
    let data = await res.json();


    switch (rover) {
        case 'Curiosity':
            Curiosity = data;
            updateStore(store, { Curiosity })
          break;
        case 'Opportunity':
            Opportunity = data;
            updateStore(store, { Opportunity })
          break;
        case 'Spirit':
            Spirit = data;
            updateStore(store, { Spirit })
          break;
    }

}