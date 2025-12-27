import * as fs from 'fs';
import * as path from 'path';

const getInvalidIDsUntil = (maxNumber: number) => {
    const invalidIds: string[] = [];

    let invalidId = '0';
    let index = 1;
    while (Number(invalidId) < maxNumber) {
        invalidId = `${index}${index}`;
        invalidIds.push(invalidId);
        index += 1;
    }

    return invalidIds;
};

const findNumbersBetweenRange = ({
    range,
    numbers,
}: {
    range: number[];
    numbers: number[];
}) => {
    return numbers.filter((numb) => numb >= range[0] && numb <= range[1]);
};

const INPUT_FILE_PATH = path.join('.', 'input.txt');

const main = async () => {
    const content = fs.readFileSync(INPUT_FILE_PATH, {
        encoding: 'utf8',
    });

    const ranges = content.split(',');

    let rangeMaxNumber: number = 0;

    ranges.forEach((range) => {
        const [, rangeToString] = range.split('-');

        const rangeTo = Number(rangeToString);

        if (rangeTo > rangeMaxNumber) {
            rangeMaxNumber = rangeTo;
        }
    });

    const someInvalidIds = getInvalidIDsUntil(rangeMaxNumber);
    const numericInvalidIds = someInvalidIds.map(Number);

    const invalidIds: Set<number> = new Set<number>();

    ranges.forEach((range) => {
        const [rangeFromString, rangeToString] = range.split('-');

        const rangeFrom = Number(rangeFromString);
        const rangeTo = Number(rangeToString);

        const invalidIdsInRange = findNumbersBetweenRange({
            range: [rangeFrom, rangeTo],
            numbers: numericInvalidIds,
        });

        invalidIdsInRange.forEach((invalidId) => {
            invalidIds.add(invalidId);
        });
    });

    console.log('Invalid IDS: ', invalidIds);
    console.log(
        'Sum of invalid IDS: ',
        Array.from(invalidIds).reduce((acc, v) => acc + v)
    );
};

main();
