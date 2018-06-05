import { build } from '../lib';
import fetch from 'node-fetch';

const service = build(async() => {
    const res = await fetch('https://google.com');
    const body = await res.text();
    console.log(`${Date.now()} - ${res.status}`);
    console.log(body);
});

service();