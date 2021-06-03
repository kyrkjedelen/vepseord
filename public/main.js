const sjekkOmOrdFinnes = async (ord) => {
    const svar = await fetch(`/ordbok?ord=${ord}`);
    const json = await svar.json();
    if(json['-1']){
        return false;
    }else {
        return true;
    }
}

const ordIn = document.querySelector('#ordIn');
const ordUt = document.querySelector('#ordUt');

ordIn.addEventListener('change', async () => {
    const ordFinnes = await sjekkOmOrdFinnes(ordIn.value.trim().toLowerCase());
    console.log(ordIn.value, ord);
    console.log(ordFinnes);
    if(ordFinnes){
        ordUt.textContent = `${ordIn.value.trim()} er et ord på norsk!`;
    }else {
        ordUt.textContent = `${ordIn.value.trim()} er ikke et ord på norsk.`;
    }
});

const testFetch = async (hovedBokstav, andreBokstaver = []) => {
    let fetchUrl = `/ordliste?bokstav=${hovedBokstav}&andre=`;
    andreBokstaver.forEach(bokstav => fetchUrl += `%${bokstav}`);
    const svar = await fetch(fetchUrl);
    const json = await svar.json();
    console.log(json);
}
testFetch('n', ['e', 'a', 't', 'd']);