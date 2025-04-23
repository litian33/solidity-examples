module.exports = {
    juSolo: {
        url: "http://192.168.8.18:8545",
        accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
        gasPrice: 1100000000
    },
    juLocal: {
        url: "http://192.168.8.14:8545",
        accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
        gasPrice: 1100000000,
        gas: "auto"
    },
    juDev: {
        url: "http://47.236.98.58:8545",
        accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
        gasPrice: 1100000000
    },
    juTest: {
        url: "https://testnet-rpc.juchain.org",
        accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
        gasPrice: 1100000000
    },
};