import { timeOutSeconds } from "./config";


const timeout = function (s) {
  return new Promise( (_, reject) => {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


export const getJson = async(url) => {
   try {
    // race between two promises
     const response = await Promise.race([fetch(url) , timeout(timeOutSeconds)])
     const data = await response.json()
     if(!response.ok) throw new Error(`${data.message} (${response.status})`)
      //data is the result of the promise
     return data
   } catch (error) {
       throw error;
   }
}

export const sendJson = async(url, uploadData) => {
  try {
    const fetchData = fetch(url, {
       method: 'post',
       headers:{
        'Content-Type' : 'application/json'
       },
       body : JSON.stringify(uploadData)
    })

    const response = await Promise.race([ fetchData , timeout(timeOutSeconds)])
    const data = await response.json()

    if(!response.ok) throw new Error(`${data.message} (${response.status})`)
     //data is the result of the promise
    return data
  } catch (error) {
      throw error;
  }
}


