# compile-city-covid

compile nyc's daily zcta testing file into 1 timestamped csv.

`Usage: node index -y [year] -m [month] -d [day] -i [daily file] -c [compiled file]`

add new city data for 4-1-2020 to existing data file.
`node index -y 2020 -m 4 -d 1 -i ./coronavirus-data/tests-by-zcta.csv -c ./compiled_test_by_zcta.csv`
