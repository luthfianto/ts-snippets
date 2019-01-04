import csv = require("fast-csv");

export async function* csvGenerator(filename: string) {
    const csvStream = csv.fromPath(filename)
    for await(const row of csvStream) {
        yield row;
    }
}
