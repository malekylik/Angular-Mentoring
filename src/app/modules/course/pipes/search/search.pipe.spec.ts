import { SearchPipe } from './search.pipe';

import { Course } from '../../models/course.model';

const coursesListMock: Course[] = [
  {
    id: "1",
    name: "Video Course 1",
    date: `08.10.2018`,
    length: 88,
    description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
    isTopRated: false,
    authors: [],
  },
  {
    id: "2",
    name: "Video Course 2",
    date: "06.10.2018",
    length: 27,
    description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
    isTopRated: true,
    authors: [],
  },
];

describe('SearchPipe', () => {
  const pipe = new SearchPipe();

  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  it('should correct search', () => {
    const searchString = '2';
    const filtredCourses: Course[] = [
      {
        id: "2",
        name: "Video Course 2",
        date: "06.10.2018",
        length: 27,
        description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
        isTopRated: true,
        authors: [],
      },
    ];
  
    expect(pipe.transform(coursesListMock, searchString)).toEqual(filtredCourses);
  });
});
