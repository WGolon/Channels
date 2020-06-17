const content = document.querySelector('.js-content');
const filter = document.querySelector('.filter__suggestions');

export const updateChannels = (dataToDisplay) => {

    content.innerHTML = '';

    for(const item of dataToDisplay) {

        let {subscriberCount, videoCount, viewCount} = item.statistics;
        const arr = [subscriberCount, videoCount, viewCount];
        const imperialNotation = arr.map( el => {
            return (+el).toLocaleString('en');
        });
        const markup = `
        <a href="${item.customUrl}" target="_blank" class="tile">
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
    setLinkListeners();

}

export const updateSuggestions = (suggestions) => {
    if(suggestions.length < 0) return;
    filter.innerHTML = '';
    for(const suggestion of suggestions){
        const markup = `<div class="suggestion"> ${suggestion} </div>`
        filter.insertAdjacentHTML('afterbegin', markup);
    }
    return suggestions = [...document.querySelectorAll('.suggestion')];
}

const setLinkListeners = () => {
    let links = [...document.querySelectorAll('a')];
    links.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            let src = el.getAttribute('href');
            const timeStamp = new Date().toISOString();
            src +=`?utm_stamp=${timeStamp}`;
            window.open(
                src,
                '_blank' 
              );
        })
    })
}

