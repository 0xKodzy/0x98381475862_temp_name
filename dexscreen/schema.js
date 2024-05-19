const { f4: AvroObject, f_: doubleType, f$: stringType, g0: boolType, f5: literalType, f6: ArrayType, fd: pr } = require("./pages_catch-all.js");

const makerScreenerType = AvroObject({
    buys: doubleType(),
    sells: doubleType(),
    volumeUsdBuy: doubleType(),
    volumeUsdSell: doubleType(),
    amountBuy: stringType(),
    amountSell: stringType(),
    balanceAmount: stringType().nullable(),
    balancePercentage: doubleType().nullable(),
    firstSwap: doubleType(),
    new: boolType()
})
const customLogType1 = AvroObject({
    logType: literalType("swap"),
    blockNumber: doubleType(),
    blockTimestamp: doubleType(),
    txnHash: stringType(),
    maker: stringType().optional(),
    makerScreener: makerScreenerType.optional(),
    logIndex: doubleType(),
    txnType: literalType("buy").or(literalType("sell")),
    priceUsd: stringType().optional(),
    volumeUsd: stringType().optional(),
    amount0: stringType(),
    amount1: stringType()
})
const customLogType2 = AvroObject({
    logType: literalType("add").or(literalType("remove")),
    blockNumber: doubleType(),
    blockTimestamp: doubleType(),
    txnHash: stringType(),
    maker: stringType().optional(),
    makerScreener: makerScreenerType.optional(),
    logIndex: doubleType(),
    amount0: stringType(),
    amount1: stringType()
})
const customLogType = customLogType1.or(customLogType2)
const logsSchema = AvroObject({
    schemaVersion: stringType(),
    baseTokenSymbol: stringType().optional(),
    quoteTokenSymbol: stringType().optional(),
    logs: ArrayType(customLogType).nullable()
})

const searchSchema = AvroObject({
    schemaVersion: literalType("4.0"),
    pairs: ArrayType(pr)
})


// ======================================

const customBarObject = AvroObject({
    timestamp: doubleType(),
    open: stringType(),
    openUsd: stringType().nullable(),
    high: stringType(),
    highUsd: stringType().nullable(),
    low: stringType(),
    lowUsd: stringType().nullable(),
    close: stringType(),
    closeUsd: stringType().nullable(),
    volumeUsd: stringType().nullable(),
    minBlockNumber: doubleType(),
    maxBlockNumber: doubleType()
});
const barsSchema = AvroObject({
    schemaVersion: stringType(),
    bars: ArrayType(customBarObject).nullable()
})

const helper = {
    logsSchema,
    searchSchema,
    barsSchema
}

// async function fetchWay(url) {
//     const res = await fetch(url);

//     if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status} | ${res.statusText}`);
//     }

//     const data = await res.arrayBuffer();
// }

module.exports = helper