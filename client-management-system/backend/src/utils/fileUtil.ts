import fs from 'fs';

export async function readFileLines(filePath: string): Promise<string[]> {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return data.split('\n').map(line => line.trim()).filter(line => line);
}
  
export async function readFile(filePath: string): Promise<string> {
    return await fs.promises.readFile(filePath, 'utf8');
}