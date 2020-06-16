const content = document.querySelector('.js-content');

const updateUI = (dataToDisplay) => {

    content.innerHTML = '';

    for(const item of dataToDisplay) {

        let {subscriberCount, videoCount, viewCount} = item.statistics;
        const arr = [subscriberCount, videoCount, viewCount];
        const imperialNotation = arr.map( el => {
            return (+el).toLocaleString('en');
        });
        const markup = `
        <a href="${item.customUrl}" target="_blank" class="tile-4 tile">
        <div class="wrapper__image">
            <img src="${item.thumbnails.medium.url}" alt="" class="image">
        </div>
    
        <div class="wrapper__info">
            <h3>${item.title}</h3>
            <div class="wrapper__details">
                <div class="subscribers small-col">
                    <h4>SUBSCRIBERS:</h4>
                    <span class="subscribers-counter counter">${imperialNotation[0]}</span>
                </div>
                <div class="videos small-col">
                    <h4>VIDEOS:</h4>
                    <span class="videos-counter counter">${imperialNotation[1]}</span>
                </div>
                <div class="views small-col">
                    <h4>VIEWS:</h4>
                    <span class="views-counter counter">${imperialNotation[2]}</span>
                </div>
            </div>
        </div>
        </a>`;
    
        content.insertAdjacentHTML('beforeend', markup);
    }
}

export default updateUI;