export const postRequest = async (url:string, body:Object)=>{
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })
    const data = await response.json();
    console.log(data);
    return data;
}

export const getRequest = async (url:string)=>{
    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })
    const data = await response.json();
    console.log(data);
    return data;
}