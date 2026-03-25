import{G as s,O as a}from"./B2Rets8L.js";const o={getBanks:()=>a.get("/payments/banks"),resolveAccount:(t,e)=>s.post("/payments/resolve-account",{account_number:t,bank_code:e})};export{o as p};
