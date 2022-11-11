const refactor = require('./refactoring_function')

describe('Determine partition key', () => {
    let data = {
        partitionKey: 34
    };
    let result = false;
    test('Create hash from candidate data', () => {
        expect(refactor.deterministicPartitionKey(data)).toStrictEqual(result);
    });
});