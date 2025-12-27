import * as fs from 'fs';
import * as path from 'path';
import { chunk } from 'lodash';

const isIdInvalid = (someId: string) => {
    if (someId.length === 1) {
        return false;
    }

    const length = someId.length;

    for (let i = 1; i < length + 1; i += 1) {
        if (length % i !== 0) {
            continue;
        }

        const chunkedId = chunk(someId, i).map((c) => c.join(''));

        const isInvalid =
            new Set(chunkedId).size === 1 && chunkedId[0] !== someId;

        if (isInvalid) {
            console.log('Invalid ID found: ', someId);
            return true;
        }
    }
};

const getInvalidIdsInRange = ({ range }: { range: number[] }) => {
    const rangeLength = range[1] - range[0];

    return new Array(rangeLength + 1)
        .fill(null)
        .map((_, i) => `${range[0] + i}`)
        .filter(isIdInvalid);
};

const INPUT_FILE_PATH = path.join('.', 'input.txt');

const main = async () => {
    const content = fs.readFileSync(INPUT_FILE_PATH, {
        encoding: 'utf8',
    });

    const ranges = content.split(',');

    const invalidIds: Set<number> = new Set<number>();

    ranges.forEach((range) => {
        const [rangeFromString, rangeToString] = range.split('-');

        const rangeFrom = Number(rangeFromString);
        const rangeTo = Number(rangeToString);

        const invalidIdsInRange = getInvalidIdsInRange({
            range: [rangeFrom, rangeTo],
        });

        invalidIdsInRange.forEach((invalidId) => {
            invalidIds.add(Number(invalidId));
        });
    });

    if (invalidIds.size > 0) {
        console.log('Invalid IDS: ', invalidIds);
        console.log(
            'Sum of invalid IDS: ',
            Array.from(invalidIds).reduce((acc, v) => acc + v)
        );
    }
};

main();
