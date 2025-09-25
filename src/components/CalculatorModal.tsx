import { useState, useEffect } from 'react';
import { X, Delete, Equal } from 'lucide-react';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAmountChange: (amount: number) => void;
  currentAmount: number;
}

export default function CalculatorModal({ 
  isOpen, 
  onClose, 
  onAmountChange, 
  currentAmount 
}: CalculatorModalProps) {
  const [display, setDisplay] = useState(currentAmount.toString());
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setDisplay(currentAmount.toString());
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(false);
    }
  }, [isOpen, currentAmount]);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearAll = () => {
    clear();
    setHistory([]);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      // Add to history
      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [...prev.slice(-4), historyEntry]); // Keep last 5 entries

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : firstValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      
      // Add to history
      const historyEntry = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [...prev.slice(-4), historyEntry]);

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleConfirm = () => {
    const amount = parseFloat(display);
    if (!isNaN(amount)) {
      onAmountChange(amount);
      onClose();
    }
  };

  const buttons = [
    // Row 1
    { label: 'AC', action: clearAll, className: 'bg-red-500 hover:bg-red-600 text-white col-span-2', type: 'function' },
    { label: '⌫', action: backspace, className: 'bg-gray-500 hover:bg-gray-600 text-white', type: 'function' },
    { label: '÷', action: () => performOperation('÷'), className: 'bg-blue-500 hover:bg-blue-600 text-white', type: 'operator' },
    
    // Row 2
    { label: '7', action: () => inputNumber('7'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-900', type: 'number' },
    { label: '8', action: () => inputNumber('8'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-900', type: 'number' },
    { label: '9', action: () => inputNumber('9'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-900', type: 'number' },
    { label: '×', action: () => performOperation('×'), className: 'bg-blue-500 hover:bg-blue-600 text-white', type: 'operator' },
    
    // Row 3
    { label: '4', action: () => inputNumber('4'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-900', type: 'number' },
    { label: '5', action: () => inputNumber('5'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-900', type: 'number' },
    { label: '6', action: () => inputNumber('6'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-900', type: 'number' },
    { label: '-', action: () => performOperation('-'), className: 'bg-blue-500 hover:bg-blue-600 text-white', type: 'operator' },
    
    // Row 4
    { label: '1', action: () => inputNumber('1'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-900', type: 'number' },
    { label: '2', action: () => inputNumber('2'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-900', type: 'number' },
    { label: '3', action: () => inputNumber('3'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-900', type: 'number' },
    { label: '+', action: () => performOperation('+'), className: 'bg-blue-500 hover:bg-blue-600 text-white row-span-2', type: 'operator' },
    
    // Row 5
    { label: '0', action: () => inputNumber('0'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-900 col-span-2', type: 'number' },
    { label: '.', action: inputDecimal, className: 'bg-gray-200 hover:bg-gray-300 text-gray-900', type: 'number' },
    // Plus button spans 2 rows, so no button here
    
    // Row 6
    { label: '=', action: handleEquals, className: 'bg-green-500 hover:bg-green-600 text-white col-span-4', type: 'equals' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Calculator</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 max-h-full overflow-y-auto">
          {/* History */}
          {history.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 max-h-20 sm:max-h-24 overflow-y-auto">
              <div className="text-xs text-gray-500 mb-1">History</div>
              {history.map((entry, index) => (
                <div key={index} className="text-xs text-gray-600 font-mono truncate">
                  {entry}
                </div>
              ))}
            </div>
          )}

          {/* Display */}
          <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
            <div className="text-right">
              {operation && previousValue !== null && (
                <div className="text-xs sm:text-sm text-gray-500 font-mono">
                  {previousValue} {operation}
                </div>
              )}
              <div className="text-xl sm:text-2xl lg:text-3xl font-mono text-gray-900 break-all">
                {display}
              </div>
            </div>
          </div>
          
          {/* Calculator Grid */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {/* Row 1 */}
            <button
              onClick={clearAll}
              className="bg-red-500 hover:bg-red-600 text-white p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors col-span-2"
            >
              AC
            </button>
            <button
              onClick={backspace}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              ⌫
            </button>
            <button
              onClick={() => performOperation('÷')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => inputNumber('7')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              7
            </button>
            <button
              onClick={() => inputNumber('8')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              8
            </button>
            <button
              onClick={() => inputNumber('9')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              9
            </button>
            <button
              onClick={() => performOperation('×')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => inputNumber('4')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              4
            </button>
            <button
              onClick={() => inputNumber('5')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              5
            </button>
            <button
              onClick={() => inputNumber('6')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              6
            </button>
            <button
              onClick={() => performOperation('-')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              -
            </button>

            {/* Row 4 */}
            <button
              onClick={() => inputNumber('1')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              1
            </button>
            <button
              onClick={() => inputNumber('2')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              2
            </button>
            <button
              onClick={() => inputNumber('3')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              3
            </button>
            <button
              onClick={() => performOperation('+')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors row-span-2"
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => inputNumber('0')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors col-span-2"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors"
            >
              .
            </button>

            {/* Row 6 */}
            <button
              onClick={handleEquals}
              className="bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 rounded text-sm sm:text-base font-medium transition-colors col-span-3"
            >
              =
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t">
          <div className="flex space-x-2 sm:space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium"
            >
              Use Amount
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}