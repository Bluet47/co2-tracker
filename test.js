const { calculateCO2, compareTransportCO2, calculateTreesNeeded } = require('./yourModuleFile'); // Adjust the path as necessary

describe('compareTransportCO2', () => {
    test('should correctly calculate CO2 emissions for alternative transport methods', () => {
        const distance = 100;
        const expectedOutput = {
            train: (100 * 0.03).toFixed(2),
            electricCar: (100 * 0.02).toFixed(2),
        };

        expect(compareTransportCO2(distance)).toEqual(expectedOutput);
    });
});

describe('calculateTreesNeeded', () => {
    test('should correctly calculate the number of trees needed to offset CO2 emissions', () => {
        expect(calculateTreesNeeded(44)).toBe(2); // 44/22 = 2
        expect(calculateTreesNeeded(22)).toBe(1); // 22/22 = 1
        expect(calculateTreesNeeded(23)).toBe(2); // Rounded up
    });
});

describe('calculateCO2', () => {
    let documentMock;
    
    beforeEach(() => {
        documentMock = {
            getElementById: jest.fn((id) => {
                const elements = {
                    distance: { value: '' },
                    travelClass: { value: '' },
                    co2Amount: { innerText: '' },
                    trainCO2: { innerText: '' },
                    electricCarCO2: { innerText: '' },
                    treesNeeded: { innerText: '' },
                    resultBox: { style: { display: '' } },
                    alternativesBox: { style: { display: '' } },
                };
                return elements[id];
            }),
        };
        global.document = documentMock;
        global.alert = jest.fn();
    });
    
    test('should alert if distance is invalid', () => {
        documentMock.getElementById('distance').value = '';
        calculateCO2();
        expect(global.alert).toHaveBeenCalledWith("Please enter a valid distance.");
    });
    
    test('should alert if travel class is invalid', () => {
        documentMock.getElementById('distance').value = '100';
        documentMock.getElementById('travelClass').value = 'invalidClass';
        calculateCO2();
        expect(global.alert).toHaveBeenCalledWith("Please select a valid travel class.");
    });
    
    test('should correctly update CO2 values in the document', () => {
        documentMock.getElementById('distance').value = '200';
        documentMock.getElementById('travelClass').value = 'business';
        
        calculateCO2();
        
        expect(documentMock.getElementById('co2Amount').innerText).not.toBe('');
        expect(documentMock.getElementById('trainCO2').innerText).not.toBe('');
        expect(documentMock.getElementById('electricCarCO2').innerText).not.toBe('');
        expect(documentMock.getElementById('treesNeeded').innerText).not.toBe('');
    });
    
    test('should correctly set result and alternatives boxes to be visible', () => {
        documentMock.getElementById('distance').value = '300';
        documentMock.getElementById('travelClass').value = 'economy';
        
        calculateCO2();
        
        expect(documentMock.getElementById('resultBox').style.display).toBe('block');
        expect(documentMock.getElementById('alternativesBox').style.display).toBe('block');
    });
});
