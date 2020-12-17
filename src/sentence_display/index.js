import React from 'react';
import { subscriber } from '../store';
import '../tailwind.output.css';

export default class SentenceDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sourceText: '',
            sourceTextArray: [],
            testText: '',
            testTextArray: [],
            testTextDisable: false,
            isTestStart: false,
            stats: {
                total: 0,
                correct: 0,
                error: 0,
                score: 0
            },
            time: 30,
        }
        this.timer = 0;
    }

    _countDown = () => {
        let time = this.state.time - 1;
        this.setState(prevState => {
            return {
                ...prevState,
                time
            }
        });

        if (time === 0) {
            this._stopTimer();
        }
    }

    _handleSourceChange = event => {
        this.setState(prevState => {
            return {
                ...prevState,
                sourceText: event.target.value,
            }
        });
    }

    _handleStartTest = event => {
        event.preventDefault();
        const _sourceTextArray = this.state.sourceText.split(' ').reduce((acc, cv) => {
            acc.push({
                value: cv,
                _success: 'none'
            });
            return acc;
        }, []);
        this.setState(prevState => {
            return {
                ...prevState,
                sourceTextArray: _sourceTextArray,
                isTestStart: true,
                stats: {
                    ...prevState.stats,
                    total: _sourceTextArray.length
                }
            }
        });
        this._startTimer();
    }

    _testAreaChange = event => {
        let eventValue = event.target.value
        this.setState(prevState => {
            return {
                ...prevState,
                testText: eventValue
            }
        });
        if (event && eventValue) {
            const _testTextArray = eventValue.split(' ').reduce((acc, cv) => {
                if (cv !== '') {
                    acc.push({
                        value: cv
                    });
                }
                return acc;
            }, []);
            if (_testTextArray && _testTextArray.length > 0) {
                const _sourceTextArray = [...this.state.sourceTextArray];
                let correct = 0;
                let error = 0;

                _testTextArray.forEach((element, index) => {
                    if (element.value.toLowerCase() === _sourceTextArray[index].value.toLowerCase()) {
                        _sourceTextArray[index]._success = 'success';
                        correct++;
                    } else if (element.value.toLowerCase() !== _sourceTextArray[index].value.toLowerCase()) {
                        _sourceTextArray[index]._success = 'failure';
                        error++;
                    }
                });
                this.setState(prevState => {
                    return {
                        ...prevState,
                        sourceTextArray: _sourceTextArray,
                        testTextArray: _testTextArray,
                        stats: {
                            ...prevState.stats,
                        }
                    }
                });
                subscriber.next({
                    total: this.state.sourceTextArray.length,
                    correct,
                    error,
                    score: (correct * 10) - (error * 5)
                });
            }
        }
    }

    _handleResetTest = event => {
        event.preventDefault();
        const resetState = {
            sourceText: '',
            sourceTextArray: [],
            isTestStart: false,
            testTextArray: [],
            testText: '',
            testTextDisable: false,
            stats: {
                total: 0,
                correct: 0,
                error: 0,
                score: 0
            },
            time: 30
        }
        this.setState(prevState => {
            return {
                ...prevState,
                ...resetState
            }
        });
    }

    _startTimer = () => {
        if (this.timer === 0 && this.state.time > 0) {
            this.timer = setInterval(this._countDown, 1000);
        }
    }

    _stopTimer = () => {
        clearInterval(this.timer)
        this.setState(prevState => {
            return {
                ...prevState,
                testTextDisable: true
            }
        })
    }

    _resetTimer = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                time: 0
            }
        })
    }


    render() {
        const { isTestStart, sourceTextArray, time, testTextDisable, testText } = this.state;
        return (
            <>

                <div className="row sm:flex">
                    <div className="col sm:w-1/2">
                        <div className="box border rounded flex flex-col shadow bg-white">
                            <div className="box__title bg-gray-200 px-3 py-2 border-b rounded rounded-b-none"><h3 className="text-sm text-grey-darker font-medium">Enter source content</h3></div>
                            {
                                !isTestStart && (
                                    <textarea className="text-grey-darkest flex-1 p-2 m-1 bg-transparent" rows="12" onChange={e => this._handleSourceChange(e)}></textarea>
                                )
                            }
                            {
                                isTestStart && (
                                    <div className="flex flex-row flex-wrap p-3">
                                        {sourceTextArray.map(item => {
                                            return (
                                                <span className={"px-0.5 " + (item._success.toLowerCase() === 'success' && item._success.toLowerCase() !== 'none' ? 'text-green-400 font-bold' : item._success.toLowerCase() === 'failure' && item._success.toLowerCase() !== 'none' ? 'text-red-400' : null)}>
                                                    {item.value}
                                                </span>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className="col mt-8 sm:ml-8 sm:mt-0 sm:w-1/2">
                        <div className="box border rounded flex flex-col shadow bg-white">
                            <div className="box__title bg-gray-200 px-3 py-2 border-b rounded rounded-b-none"><h3 className="text-sm text-grey-darker font-medium">Type here for testing your skill within {time} seconds</h3></div>
                            <textarea className="text-grey-darkest flex-1 p-2 m-1 bg-transparent" rows="12" value={testText} onChange={e => this._testAreaChange(e)} disabled={testTextDisable}></textarea>
                        </div>
                    </div>
                </div>
                <div className="row sm:flex">
                    <div className="col">
                        <button type="button" className="md:w-32 bg-indigo-600 shadow-md hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-md mt-3 hover:bg-indigo-500 transition ease-in-out duration-300" onClick={e => this._handleStartTest(e)}>
                            Start
                            </button>
                    </div>
                    <div className="col ml-2">
                        <button type="button" className="md:w-32 bg-pink-600 shadow-md hover:bg-pink-dark text-white font-bold py-2 px-4 rounded-md mt-3 hover:bg-pink-500 transition ease-in-out duration-300" onClick={e => this._handleResetTest(e)}>
                            Reset
                            </button>
                    </div>
                </div>

            </>
        )
    }
}