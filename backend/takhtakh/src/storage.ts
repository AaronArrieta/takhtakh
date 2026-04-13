export { saveData, loadData }

import { promises as fsPromises, existsSync } from 'fs';

const dataDirectory: string = './backend/takhtakh/data/';

async function saveData(data: any, location: string): Promise<void> {
    return fsPromises.writeFile(`${dataDirectory}${location}`, JSON.stringify(data), 'utf8')
}

async function loadData(location: string): Promise<unknown> {
    fsPromises.mkdir('./data', { recursive: true })
    if (!existsSync(`${dataDirectory}${location}`)) {
        await fsPromises.writeFile(`${dataDirectory}${location}`, '[]', 'utf8')
    }
    return fsPromises.readFile(`${dataDirectory}${location}`, 'utf8').then(JSON.parse)
}