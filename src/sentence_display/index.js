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

    componentDidMount() {
        subscriber.subscribe((value) => {
            console.log(value);
        });
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
                            correct,
                            error,
                            score: (correct * 10) - (error * 5)
                        }
                    }
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
        const { isTestStart, sourceTextArray, stats, time, testTextDisable, testText, testTextArray } = this.state;
        return (
            <>
                <div className="app min-h-screen min-v-screen p-8 bg-gray-100 font-sans">
                    <div className="row sm:flex my-4">
                        <div className="col">
                            <div className="flex flex-col">
                                <div className="row sm:flex">
                                    <div className="col">
                                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg w-64">
                                            <div className="flex-auto p-4">
                                                <div className="flex flex-wrap">
                                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                        <h5 className="text-gray-500 uppercase font-bold text-xs">
                                                            Total no. of words
                                                    </h5>
                                                        <span className="font-semibold text-xl text-gray-800">
                                                            {stats.total}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col ml-4">
                                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg w-64">
                                            <div className="flex-auto p-4">
                                                <div className="flex flex-wrap">
                                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                        <h5 className="text-gray-500 uppercase font-bold text-green-400 text-xs">
                                                            Correct words
                                                    </h5>
                                                        <span className="font-semibold text-xl text-gray-800">
                                                            {stats.correct} <span className="font-semibold text-md text-gray-400">/ {testTextArray.length}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col ml-4">
                                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg w-64">
                                            <div className="flex-auto p-4">
                                                <div className="flex flex-wrap">
                                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                        <h5 className="text-gray-500 uppercase text-red-400 font-bold text-xs">
                                                            Wrong words
                                                    </h5>
                                                        <span className="font-semibold text-xl text-gray-800">
                                                            {stats.error} <span className="font-semibold text-md text-gray-400">/ {testTextArray.length}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col ml-4">
                                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg w-64">
                                            <div className="flex-auto p-4">
                                                <div className="flex flex-wrap">
                                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                        <h5 className="text-gray-500 uppercase font-bold text-xs">
                                                            Score
                                                    </h5>
                                                        <span className="font-semibold text-xl text-gray-800">
                                                            {stats.score}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                </div>
            </>
        )
    }
}