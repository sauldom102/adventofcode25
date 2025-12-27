import * as fs from 'fs';
import * as path from 'path';

class Dial {
    private position: number = 50;
    private minValue: number = 0;
    private maxValue: number = 99;

    // number of times the dial is equal to 0
    private password: number = 0;

    constructor() {}

    private rotate(value: number) {
        const length = this.maxValue - this.minValue + 1;

        let spins = Math.floor(Math.abs(value) / length);
        if (value < 0) {
            spins = spins * -1;
        }

        let effectiveValue = spins !== 0 ? Math.abs(value) % length : value;
        if (spins < 0) {
            effectiveValue *= -1;
        }

        let newPosition = this.position + effectiveValue;

        if (newPosition > this.maxValue) {
            newPosition = this.minValue + (newPosition - this.maxValue) - 1;
        } else if (newPosition < this.minValue) {
            newPosition += this.maxValue + 1;
        }

        this.position = newPosition;

        if (newPosition === 0) {
            this.password += 1;
        }
    }

    displayPassword() {
        console.log(`The password is ${this.password}`);
    }

    runCommand(command: string) {
        const direction = command?.[0];

        if (!['L', 'R'].includes(direction)) {
            throw new Error('Invalid command');
        }

        const value = (direction === 'L' ? -1 : 1) * Number(command.slice(1));

        this.rotate(value);
    }
}

const INPUT_FILE_PATH = path.join('.', 'input.txt');

const main = async () => {
    const content = fs.readFileSync(INPUT_FILE_PATH, {
        encoding: 'utf8',
    });

    const commands = content.split('\n');

    const dial = new Dial();

    commands.forEach((command) => {
        dial.runCommand(command);
    });

    dial.displayPassword();
};

main();
