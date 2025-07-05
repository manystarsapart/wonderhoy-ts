import education_items from "./education_data.json" assert {type:'json'};
import steam_events from "./timeline_data_steam.json" assert {type:'json'};
import language_events from "./timeline_data_language.json" assert {type:'json'};
import media_events from "./timeline_data_media.json" assert {type:'json'};
import volunteering_events from "./timeline_data_volunteering.json" assert {type:'json'};
import misc_events from "./timeline_data_misc.json" assert {type:'json'};

// console.log(language_events);
document.getElementById("education-list")!.innerHTML = education_items.map(item => `
    <li>
        <strong><span style="font-size:1.1rem">${item.event}</span></strong> | ${item.date}
        <ul>
            ${item.details.map(ach => `<li style="font-style:italic;">${ach}</li>`).join('')}
        </ul>
    </li>
`).join('');


document.getElementById("steam-list")!.innerHTML = steam_events.map(item => `
    <li>
        <strong><span style="font-size:1.1rem">${item.event}</span></strong> | ${item.date}
        <ul>
            ${item.details.map(ach => `<li style="font-style:italic;">${ach}</li>`).join('')}
        </ul>
    </li>
`).join('');


document.getElementById("language-list")!.innerHTML = language_events.map(item => `
    <li>
        <strong><span style="font-size:1.1rem">${item.event}</span></strong> | ${item.date}
        <ul>
            ${item.details.map(ach => `<li style="font-style:italic;">${ach}</li>`).join('')}
        </ul>
    </li>
`).join('');

document.getElementById("media-list")!.innerHTML = media_events.map(item => `
    <li>
        <strong><span style="font-size:1.1rem">${item.event}</span></strong> | ${item.date}
        <ul>
            ${item.details.map(ach => `<li style="font-style:italic;">${ach}</li>`).join('')}
        </ul>
    </li>
`).join('');

document.getElementById("volunteering-list")!.innerHTML = volunteering_events.map(item => `
    <li>
        <strong><span style="font-size:1.1rem">${item.event}</span></strong> | ${item.date}
        <ul>
            ${item.details.map(ach => `<li style="font-style:italic;">${ach}</li>`).join('')}
        </ul>
    </li>
`).join('');

document.getElementById("misc-list")!.innerHTML = misc_events.map(item => `
    <li>
        <strong><span style="font-size:1.1rem">${item.event}</span></strong> | ${item.date}
        <ul>
            ${item.details.map(ach => `<li style="font-style:italic;">${ach}</li>`).join('')}
        </ul>
    </li>
`).join('');