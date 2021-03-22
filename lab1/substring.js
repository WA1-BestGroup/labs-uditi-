'use string';

let seasons =['Spring', 'Summer','Winter', 'Autumn'];

const acrynoms=[];

for (let s of seasons)
{
    const season=s.split(' ');
    //console.log(season);

    let substring='';

    for(let sub of season)
    {
        substring += sub[0].toLowerCase() + sub[1].toLowerCase() + (sub.substring(sub.length -2))
    }
    acrynoms.push(substring);
}
console.log(acrynoms);