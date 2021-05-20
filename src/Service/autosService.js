import axios from 'axios';

export class autosService{
    baseUrl = "http://localhost:8080"
    getAll(){
        return axios.get(this.baseUrl + "all").then(res => res.data.data);
    }
    save(persona) {
        return axios.post(this.baseUrl + "save", persona).then(res => res.data);
    }

    delete(id) {
        return axios.get(this.baseUrl + "delete/"+id).then(res => res.data);
    }
}