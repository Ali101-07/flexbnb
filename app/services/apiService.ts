const apiService ={
    get: async function(url:string): Promise<any>{
       console.log('get',url);
    }
}
export default apiService;