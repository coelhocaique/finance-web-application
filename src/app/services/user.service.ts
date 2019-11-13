import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return null
    }

    getById(id: number) {
        return null
    }

    register(user) {
        return null
    }

    update(user) {
        return null
    }

    delete(id: number) {
        return null
    }
}