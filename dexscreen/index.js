import helper from "./schema.js";
import initCycleTLS from 'cycletls';

const url = 'https://io.dexscreener.com/dex/chart/amm/v3/uniswap/bars/ethereum/0x6Fa73848CfD2c7460A538B55E882C6F4e8Aff68c?&res=5&cb=10';
async function mainCycleTLS(url) {
    let cycleTLS = await initCycleTLS();

    let data = await cycleTLS(url, {}, `get`);

    return helper.barsSchema.safeFromBuffer(Buffer.from(data.body, "ascii"));
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