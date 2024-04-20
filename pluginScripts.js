function addPluginSection(pluginName, pluginDescription, containerId, imagehref, imgLinkURL) {
    const container = document.getElementById(containerId);
    console.log(`imageLinkURL: ${imgLinkURL}`);


    const imageContent = imgLinkURL ?
        `<a href="${imgLinkURL}">
                    <img src="${imagehref}" alt="${pluginName} placeholder">
                </a>` :
        `<img src="${imagehref}" alt="${pluginName} placeholder">`;

    const pluginHTML = `
            <div class="column is-half"> <!-- Each plugin takes up half the width on desktop, stacks on mobile -->
                <div class="box">
                    <!-- <figure class="image is-2by1 mb-3"> -->
                    <figure class="image mb-3">
                        ${imageContent}
                    </figure>
                    <div>
                        <p class="title is-5 mb-0">${pluginName}</p>
                        <p>${pluginDescription}</p>
                    </div>
                </div>
            </div>`;

    // Append the new section to the container
    container.innerHTML += pluginHTML;
}
console.log("DOM fully loaded and parsed");
addPluginSection("Paw Control", "MIDI note filter with lots of features for enhancing your musical range.", "pluginsID", 'images/paw1000x522_free.png',  "pawcontrol.html");
addPluginSection("Bark Board", "MIDI channel filter, enabling you to play all your favourite instruments from one keyboard.", "pluginsID", 'images/barkboard_coming_soon.png');
addPluginSection("Purr Sine", "Simple sine synth with mathematically pure sines, making it sound amazing.", "pluginsID", 'images/coming_soon.jpg');