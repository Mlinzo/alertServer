import { EventEmitter } from 'events';
import Express from "express";
import * as http from 'http';

const app = Express();
const server = http.createServer(app);
const emitter = new EventEmitter();

const utils = {
    app,
    server,
    emitter,
    alertLocations: [
        {
            dangerLevel: 'MEDIUM',
            title: 'Odessa',
            dateFrom: '2022-05-18T07:00:00.000Z',
            dateTo: '2022-05-18T07:30:00.000Z'
        }
    ],
    sanctuaries: [
        {
            destination: 100,
            number: 50,
            address: 'просп. Маршала Жукова, 2'
        }
    ],

    addElement: (arr, element) => {
        const index = arr.push(element) - 1;
        return {errorMsg: null, index};
    },

    deleteElement: (arr, ind) => {
        if (ind >= arr.length || ind < 0) return {errorMsg: 'No such element'};
        arr.splice(ind, ind+1);
        return {errorMsg: null};	
    },
    
    tryCatch: (res, func) => {
        try { func() } 
        catch (e) { console.log(e); res.sendStatus(400) }
    }
};

export default utils;