const { request, response } = require('express');
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs')

const app = express();
const server = {
    port: 6969
}

const ord = fs.readFileSync('ordliste.txt', {encoding: 'utf-8'});
const ordliste = ord.split('\n');

app.listen(server.port, () => {
    console.log(`Følger med på port: ${server.port}`);
})
app.use(express.static('public'));

app.get('/ordbok', async (request, response) => {
    const ord = request.query.ord;
    const fetchUrl = `http://no.wiktionary.org/w/api.php?action=query&format=json&titles=${ord}`;
    const svar = await fetch(fetchUrl);
    const json = await svar.json();
    response.send(json.query.pages);
});
app.get('/ordliste', async (request, response) => {
    const hovedBokstav = request.query.bokstav;
    const andreBokstaverArray = request.query.andre.split('%');
    let andreBokstaver = "";
    andreBokstaverArray.forEach(bokstav => {
        andreBokstaver += bokstav;
    });
    console.log(hovedBokstav);
    const ordMedHovedbokstav = [];
    ordliste.forEach(ord => {
        if(ord.includes(hovedBokstav)) {
            ordMedHovedbokstav.push(ord);
        }
    })
    const gyldigeOrd = [];
    ordMedHovedbokstav.forEach(ord => {
        const hentRiktigeOrd = new RegExp(`^[${hovedBokstav + andreBokstaver}]*$`, 'ig');
        const ordetHarIngenAndreBokstaver = hentRiktigeOrd.test(ord);
        if(ordetHarIngenAndreBokstaver) {
            gyldigeOrd.push(ord);
        }
    })
    response.send(gyldigeOrd);
})