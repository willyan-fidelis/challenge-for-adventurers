const doTheMagic = require("./do-the-magic");
const axios = require('axios')
const id = '5d65c92389fcd300148c5cbd'

async function main() {
    let list = doTheMagic.do();
    let resp = null;
    try {
        resp = await axios.post(`https://challenge-for-adventurers.herokuapp.com/check?id=${id}`, list)
        console.log(resp.data)
    } catch (error) {
        console.log(error)
        console.log(resp.data)
    }

}

//5d65c92389fcd300148c5cbd

//https://challenge-for-adventurers.herokuapp.com/start/willyan.sergio.fidelis@gmail.com

main()