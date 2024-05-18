import helper from "./schema.js";
import initCycleTLS from './cycleTLS_byted/index.js';

const url = 'https://io.dexscreener.com/dex/chart/amm/v3/uniswap/bars/ethereum/0x0c3fdf9c70835f9be9db9585ecb6a1ee3f20a6c7?&res=5&cb=100';
async function mainCycleTLS(url) {
    let cycleTLS = await initCycleTLS();

    let data = await cycleTLS(url, {}, `get`);

    // Experimental, only if you have replaced go binary and js file of cycleTLS with custom ones
    return helper.barsSchema.safeFromBuffer(Buffer.from(data.bytes, "base64"));

    // Default
    // return helper.barsSchema.safeFromBuffer(Buffer.from(data.body, "ascii"));
}

async function mainFetch(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} | ${res.statusText}`);
    }

    const data = await res.arrayBuffer();

    return helper.barsSchema.safeFromBuffer(Buffer.from(data));
}

// En
// CycleTLS is not parsing avro correctly because of conversion string -> bytes
// when url has cb=100 or more it fails to decode

// Ru
// CycleTLS не парсит avro корректно из-за конвертации string -> bytes
// когда в url указан параметр cb=100 или больше (кол-во баров), он не сможет декодировать
console.log((await mainCycleTLS(url)));

console.log((await mainFetch(url)));

// generate a console bar chart
