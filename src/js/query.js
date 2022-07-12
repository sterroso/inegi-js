
const base_url = "https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/";
const id_indicador = "628194";
const idioma = "es";
const area_geo = "0700";
const recientes = "false";
const fuente_datos = "BIE/2.0";
const api_token = "db89a6f7-35a5-cfb7-609a-cb5006ed1faa";
const output_format = "json";

const query_url = new URL(id_indicador+"/"+idioma+"/"+area_geo+"/"+recientes+"/"+fuente_datos+"/"+api_token,
                          base_url);

query_url.searchParams.append('type', output_format);

console.log(query_url.toString());

async function getData(url) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'omit'
    });

    return response.toString();
}

getData(query_url.toString()).then(data => {
    console.log("Resultado: " + data);
}).catch(err => console.log("No se pudo localizar la información. ErrObj: %o.", err));