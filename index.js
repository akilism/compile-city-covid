const csv = require('fast-csv');
const args = require('yargs')
  .usage(
    'Usage: $0 -y [year] -m [month] -d [day] -i [daily file] -c [compiled file]'
  )
  .example(
    '$0 -y 2020 -m 4 -d 1 -i ./coronavirus-data/tests-by-zcta.csv -c ./compiled_test_by_zcta.csv',
    'add new city data for 4-1-2020 to existing data file.'
  )
  .alias('y', 'year')
  .alias('m', 'month')
  .alias('d', 'day')
  .alias('i', 'input')
  .alias('c', 'compiled')
  .demandOption(['y', 'm', 'd', 'i']).argv;

function loadCSV(inputFile) {
  return new Promise((resolve, reject) => {
    const data = [];
    csv
      .parseFile(inputFile, { headers: true, objectMode: true })
      .on('data', row => {
        data.push(row);
      })
      .on('error', err => {
        return reject(err);
      })
      .on('end', () => {
        return resolve(data);
      });
  });
}

async function main(year, month, day, dailyFile, compiledFile) {
  const dailyData = (await loadCSV(dailyFile)).map(r => {
    r.date = JSON.stringify(new Date(year, month, day, 0, 0, 0, 0)).replace(
      /"/gi,
      ''
    );
    return r;
  });
  const compiledData = compiledFile ? await loadCSV(compiledFile) : [];
  console.log(`adding ${dailyData.length} rows to compiled data.`);
  csv.writeToPath(
    './compiled_test_by_zcta.csv',
    compiledData.concat(dailyData),
    {
      headers: true
    }
  );
}

main(args.y, args.m - 1, args.d, args.i, args.c);
