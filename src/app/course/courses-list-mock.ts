import { Course } from './models/course.model';
import { BaseCourse } from './models/base-course';

const nowDate: Date = new Date();

const coursesListMock: Course[] = [
    BaseCourse.generateCourse(
        'Video Course 1',
        `${nowDate.getMonth() + 1}.${nowDate.getDate() - 1}.${nowDate.getFullYear()}`,
        88,
        'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"'
        ),
    BaseCourse.generateCourse(
        'Video Course 2',
        '06.10.2018',
        27,
        'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
        true
        ),
    BaseCourse.generateCourse(
        'Video Course 3',
        '07.14.2019',
        70,
        'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
        true
        ),
    BaseCourse.generateCourse(
        'Video Course 4',
        '07.16.2018',
        46,
        'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"'
        ),
    BaseCourse.generateCourse(
        'Video Course 5',
        '08.21.2018',
        30,
        'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"'
        ),
]

export { coursesListMock };
